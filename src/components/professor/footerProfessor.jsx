import React from "react";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa6";

const FooterProfesor = () => {
  return (
    <footer className="footer-profesor">
      <div className="footer-content">
        <p className="mb-0">
          © {new Date().getFullYear()} JN Institución Educativa. Todos los derechos reservados.
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
          <a href="https://wa.me/593000000000" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="mailto:info@institucionjn.edu.ec">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterProfesor;
