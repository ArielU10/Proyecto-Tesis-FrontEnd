// 📁 components/UserModal/userFormUtils.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const initialFormData = {
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
  identification: '',
  courseIds: []
};

export const handleSubmitByType = async (type, formData, setIsSubmitting, onClose, resetFormState) => {
  setIsSubmitting(true);
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;
    if (!token) {
      toast.error('❌ Token no encontrado. Por favor, inicia sesión nuevamente.', {
        className: 'toast-error'
      });
      
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (type === 'administrative') {
      await axios.post('http://localhost:3000/api/administratives', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: formData.identification,
        email: formData.email,
        phone: formData.phone
      }, config);
      toast.success('✅ Administrativo creado correctamente', {
        className: 'toast-success'
      });
      
    }

    if (type === 'professor') {
      await axios.post('http://localhost:3000/api/professors', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: formData.identification,
        email: formData.email,
        phone: formData.phone,
        courseIds: formData.courseIds || []
      }, config);
      toast.success('✅ Profesor creado correctamente', {
        className: 'toast-success'
      });
      
    }

    if (type === 'student') {
      const repRes = await axios.post('http://localhost:3000/api/legal-representatives', {
        firstName: formData.rep_firstName,
        lastName: formData.rep_lastName,
        identification: formData.rep_identification,
        phone: '+593' + formData.rep_phone,
        email: formData.rep_email,
        address: formData.rep_address
      }, config);

      const repId = repRes.data?.id_legal_representative;
      if (!repId) throw new Error('Error al obtener ID del representante');

      await axios.post('http://localhost:3000/api/students', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        identityCard: formData.identityCard,
        status: formData.status,
        id_course: formData.id_course,
        id_legal_representative: repId
      }, config);
      toast.success('✅ Estudiante y representante creados correctamente', {
        className: 'toast-success'
      });
      
    }

    if (type === 'guard') {
      await axios.post('http://localhost:3000/api/guards', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: formData.identification,
        email: formData.email,
        phone: formData.phone
      }, config);
      toast.success('✅ Guardia creado correctamente', {
        className: 'toast-success'
      });
      
    }

    onClose();
    resetFormState();

  } catch (err) {
    console.error('❌ Error al crear usuario:', err);
    const msg = err.response?.data?.error || err.message;
    toast.error(`❌ Error: ${msg}`, {
      className: 'toast-error'
    });
    
  } finally {
    setIsSubmitting(false);
  }
};
