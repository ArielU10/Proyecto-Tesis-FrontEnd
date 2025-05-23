import React, { useState, useEffect } from 'react';
import '../styles/pages/login.css';
import logo from '../assets/logoJN.png';

import img1 from '../assets/sliderLogin/img1.jpg';
import img2 from '../assets/sliderLogin/img2.jpg';
import img3 from '../assets/sliderLogin/img3.jpg';
import img4 from '../assets/sliderLogin/img4.jpg';
import img5 from '../assets/sliderLogin/img5.jpg';
import img6 from '../assets/sliderLogin/img6.jpg';
import img7 from '../assets/sliderLogin/img7.jpg';
import img8 from '../assets/sliderLogin/img8.jpg';


const images = [img1, img2, img3, img4, img5];

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
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
            type="email"
            placeholder="Correo electrónico"
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
