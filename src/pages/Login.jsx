import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

import '../styles/login.css';
import logo from '../assets/logoJN.png';
import img1 from '../assets/sliderLogin/img1.jpg';
import img2 from '../assets/sliderLogin/img2.jpg';
import img3 from '../assets/sliderLogin/img3.jpg';
import img4 from '../assets/sliderLogin/img4.jpg';
import img5 from '../assets/sliderLogin/img5.jpg';

const images = [img1, img2, img3, img4, img5];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        user_name: email,
        password
      });

      const { user, token } = response.data;
      console.log('📦 response.data:', response.data);
      console.log('🧠 Usuario recibido del backend:', user);

      // Guarda directamente el usuario completo, ya incluye nombre y apellido
      login(user, token);

      // Redirección según rol
      switch (user.role) {
        case 'administrative':
          navigate('/admin');
          break;
        case 'professor':
          navigate('/professor');
          break;
        case 'legal_representative':
          navigate('/legal-representantive/');
          break;
        default:
          alert('Rol no reconocido');
      }

    } catch (err) {
      const backendMessage = err.response?.data?.message || 'Error desconocido';
      alert(backendMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={logo} alt="Logo Institución" className="login-logo" />
        <h1>Bienvenido</h1>
        <p className="subtitle">al Portal de Seguridad y Comunicación Escolar</p>
        <ul className="features">
          <li>✅ Retiro seguro con códigos QR</li>
          <li>✅ Notificaciones inmediatas</li>
          <li>✅ Gestión de permisos y autorizaciones</li>
        </ul>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="login-right">
        <img src={images[currentImage]} alt="Slide" className="slider-image" />
      </div>
    </div>
  );
};

export default Login;
