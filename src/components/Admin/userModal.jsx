// 📁 components/UserModal/UserWizardModal.jsx
import React, { useState } from 'react';
import '../../styles/components/userModal.css';
import UserTypeSelector from './UserTypeSelector';
import AdministrativeForm from './AdministrativeForm';
import ProfessorForm from './ProfessorForm';
import StudentForm from './StudentForm';
import GuardForm from './GuardForm';
import { handleSubmitByType, initialFormData } from './userFormUtils';

const UserWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetFormState = () => {
    setFormData(initialFormData);
    setStep(1);
    setSelectedType('');
  };

  const handleClose = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitByType(selectedType, formData, setIsSubmitting, onClose, resetFormState);
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        {step === 1 && (
          <UserTypeSelector onSelect={handleSelectType} onCancel={handleClose} />
        )}

        {step === 2 && selectedType === 'administrative' && (
          <AdministrativeForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 2 && selectedType === 'professor' && (
          <ProfessorForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 2 && selectedType === 'student' && (
          <StudentForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 2 && selectedType === 'guard' && (
          <GuardForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setStep(1)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default UserWizardModal;