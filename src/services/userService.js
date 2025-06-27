import axios from 'axios';

/**
 * Crea automáticamente un usuario para una entidad específica (representante, profesor, administrativo).
 *
 * @param {Object} data - Datos para la creación del usuario.
 * @param {string} data.role - Nombre del rol ('legalRepresentative', 'professor', 'administrative')
 * @param {string} data.email - Correo electrónico (usado para user_name)
 * @param {string} data.identification - Cédula (usada como contraseña)
 * @param {number} data.foreignId - ID de la entidad asociada (id_representative, id_professor, etc.)
 */
export const createUserByRole = async ({ role, email, identification, foreignId }) => {
  try {
    const user_name = email.split('@')[0];
    const password = identification;

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const body = {
      user_name,
      password,
      role_name: role // 👈 Enviamos el nombre del rol en vez del id
    };

    // Asociación correcta según el rol
    switch (role) {
      case 'legalRepresentative':
        body.id_representative = foreignId;
        break;
      case 'professor':
        body.id_professor = foreignId;
        break;
      case 'administrative':
        body.id_administrative = foreignId;
        break;
      default:
        throw new Error('Rol no reconocido');
    }

    await axios.post('http://localhost:3000/api/auth/register', body, config);
    console.log(`✅ Usuario creado automáticamente para ${role}`);
  } catch (error) {
    console.error(`❌ Error creando usuario para ${role}:`, error);
    throw error;
  }
};
