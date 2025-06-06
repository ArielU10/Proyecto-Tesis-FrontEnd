// src/components/Admin/userModal.jsx
import React, { useState } from 'react';
import '../../styles/components/userModal.css';

// Formularios según el tipo de usuario
import AdministrativeForm from './AdministrativeForm';
import LegalRepresentativeForm from './LegalRepresentativeForm';
import ProfessorForm from './ProfessorForm';

import axios from 'axios';

const UserWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // Paso del wizard
  const [selectedType, setSelectedType] = useState(''); // Tipo de usuario seleccionado

  // Form data que se comparte entre formularios
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identification: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSelectType = (type) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar según el tipo de usuario
      if (selectedType === 'administrative') {
        await axios.post('http://localhost:3000/api/administratives', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        });
        alert('✅ Administrativo creado correctamente');
      }

      if (selectedType === 'representative') {
        await axios.post('http://localhost:3000/api/legal-representatives', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          identification: formData.identification,
          phone: formData.phone,
          email: formData.email,
          address: formData.address
        });
        alert('✅ Padre de Familia creado correctamente');
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

      // Resetear estado
      onClose();
      setStep(1);
      setSelectedType('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        identification: '',
        address: ''
      });
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al guardar');
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
              <button onClick={() => handleSelectType('representative')}>Padre de Familia</button>
              <button disabled>Estudiante</button>
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

        {step === 2 && selectedType === 'representative' && (
          <LegalRepresentativeForm
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
