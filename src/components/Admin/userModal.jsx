import React, { useState } from 'react';
import '../../styles/components/userModal.css';
import AdministrativeForm from './AdministrativeForm';
import ProfessorForm from './ProfessorForm';
import StudentForm from './StudentForm';

import axios from 'axios';
import { toast } from 'react-toastify';

const UserWizardModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    identityCard: '',
    status: '',
    id_course: '',
    rep_firstName: '',
    rep_lastName: '',
    rep_identification: '',
    rep_phone: '',
    rep_email: '',
    rep_address: '',
    email: '',
    phone: '',
    identification: ''
  };

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  if (!isOpen) return null;

  const resetFormState = () => {
    setFormData(initialFormData);
    setStep(1);
    setSelectedType('');
  };

  const handleClose = () => {
    toast.info('Formulario cancelado');
    onClose();
    resetFormState();
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;

    if (!token) {
      toast.error('❌ Token no encontrado. Por favor, inicia sesión nuevamente.');
      return;
    }


    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      if (selectedType === 'administrative') {
        await axios.post(
          'http://localhost:3000/api/administratives',
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            identification: formData.identification,
            email: formData.email,
            phone: formData.phone
          },
          config
        );

        toast.success('✅ Administrativo creado correctamente');
      }

      if (selectedType === 'professor') {
        await axios.post(
          'http://localhost:3000/api/professors',
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            identification: formData.identification,
            email: formData.email,
            phone: formData.phone,
            courseIds: formData.courseIds || []
          },
          config
        );        

        toast.success('✅ Profesor creado correctamente');
      }

      if (selectedType === 'student') {
        const repResponse = await axios.post(
          'http://localhost:3000/api/legal-representatives',
          {
            firstName: formData.rep_firstName,
            lastName: formData.rep_lastName,
            identification: formData.rep_identification,
            phone: '+593' + formData.rep_phone,
            email: formData.rep_email,
            address: formData.rep_address
          },
          config
        );

        const repId = repResponse.data?.id_legal_representative;


        if (!repId) {
          throw new Error('La respuesta del backend no contiene representative.id');
        }

        await axios.post(
          'http://localhost:3000/api/students',
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            identityCard: formData.identityCard,
            status: formData.status,
            id_course: formData.id_course,
            id_legal_representative: repId
          },
          config
        );

        toast.success('✅ Estudiante y representante creados correctamente');
      }

      onClose();
      resetFormState();

    } catch (err) {
      const serverMessage = err.response?.data?.error || err.message;
      console.error('❌ Error durante creación:', serverMessage);
      toast.error(`❌ Error al guardar:\n${serverMessage}`);
    }
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        {step === 1 && (
          <>
            <h2>¿Qué tipo de usuario deseas crear?</h2>
            <div className="user-type-options">
              <button onClick={() => handleSelectType('administrative')}>Administrativo</button>
              <button onClick={() => handleSelectType('professor')}>Profesor</button>
              <button onClick={() => handleSelectType('student')}>Estudiante</button>
            </div>
            <button className="close-btn" onClick={handleClose}>Cancelar</button>
          </>
        )}

        {step === 2 && selectedType === 'administrative' && (
          <AdministrativeForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
          />
        )}

        {step === 2 && selectedType === 'professor' && (
          <ProfessorForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
          />
        )}

        {step === 2 && selectedType === 'student' && (
          <StudentForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default UserWizardModal;
