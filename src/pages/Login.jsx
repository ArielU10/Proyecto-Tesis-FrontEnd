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
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { FaUser, FaLock } from 'react-icons/fa';


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
      login(user, token);

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
        case 'guard':
          navigate('/guard');
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
    <div className="login-full">
      <img src={images[currentImage]} alt="Fondo Login" className="login-bg" />
      <div className="login-center">
      <div className="login-box">
          <img src={logo} alt="Logo Institución" className="login-logo" />
          <h1>Bienvenido!</h1>
          <p className="subtitle">Accede al portal de seguridad escolar con funciones 
          inteligentes de comunicación, seguridad y control.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-icon">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-icon">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Iniciar sesión</button>
            <p className="forgot-password">¿Olvidaste tu contraseña?</p>
            <p className="slogan">Soy Nazareno, soy triunfador!</p>
            
          </form>
          <div className="login-social-icons">
            <a href="https://wa.me/593998000597" target="_blank" rel="noopener noreferrer" data-tooltip="Contáctanos por WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com/UnidadEducativaJesusDeNazareth" target="_blank" rel="noopener noreferrer" data-tooltip="Visítanos en Facebook">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" data-tooltip="Síguenos en X">
              <FaXTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" data-tooltip="Míranos en Instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" data-tooltip="Síguenos en TikTok">
              <FaTiktok />
            </a>
          </div>
          
        </div>
  


      </div>
    </div>
    
  );
};

export default Login;
