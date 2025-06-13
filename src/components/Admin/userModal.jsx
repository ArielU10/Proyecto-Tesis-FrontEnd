// src/components/Admin/userModal.jsx
import React, { useState } from 'react';
import '../../styles/components/userModal.css';

import AdministrativeForm from './AdministrativeForm';
import ProfessorForm from './ProfessorForm';
import StudentForm from './StudentForm';

import axios from 'axios';

const UserWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');

  const [formData, setFormData] = useState({
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
  });

  if (!isOpen) return null;

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
    try {
      if (selectedType === 'administrative') {
        await axios.post('http://localhost:3000/api/administratives', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        });
        alert('✅ Administrativo creado correctamente');
      }

      if (selectedType === 'professor') {
        await axios.post('http://localhost:3000/api/professors', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          identification: formData.identification,
          email: formData.email,
          phone: formData.phone
        });
        alert('✅ Profesor creado correctamente');
      }

      if (selectedType === 'student') {
        console.log('📥 Registrando representante legal...');
      
        const repResponse = await axios.post('http://localhost:3000/api/legal-representatives', {
          firstName: formData.rep_firstName,
          lastName: formData.rep_lastName,
          identification: formData.rep_identification,
          phone: '+593' + formData.rep_phone,
          email: formData.rep_email,
          address: formData.rep_address
        });
      
        if (!repResponse.data || !repResponse.data.id_representative) {
          throw new Error('La respuesta del backend no contiene id_representative');
        }
      
        const repId = repResponse.data.id_representative;
        console.log('Representante creado →', repResponse.data);

        if (isNaN(repId)) {
          throw new Error('id_representative no es un número válido');
        }
      
        console.log('🧾 ID del representante creado:', repId);
      
        await axios.post('http://localhost:3000/api/students',
         {
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          identityCard: formData.identityCard,
          status: formData.status,
          id_course: formData.id_course,
          id_legal_representative: repId
        });
      
        alert('✅ Estudiante y representante creados correctamente');
      }
      
    } catch (err) {
      const serverMessage = err.response?.data?.error || err.message;
      console.error('❌ Error durante creación de estudiante o representante:', serverMessage);
      alert(`Error al guardar estudiante o representante:\n${serverMessage}`);
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
            <button className="close-btn" onClick={onClose}>Cancelar</button>
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
