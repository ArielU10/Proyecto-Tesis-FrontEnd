import React from "react";

const BienvenidaCard = () => (
  <div className="bienvenida bg-warning rounded p-4 d-flex justify-content-between align-items-center">
    <div>
      <h4 className="fw-bold">Bienvenida, Victoria!</h4>
      <p>al Portal de Seguridad y Comunicación Escolar.</p>
      <ul>
        <li>✅ Retiro seguro con códigos QR</li>
        <li>📢 Notificaciones inmediatas</li>
        <li>🔐 Gestión de autorizaciones</li>
      </ul>
    </div>
    <img src="https://via.placeholder.com/100" alt="Avatar" className="rounded-circle" />
  </div>
);

export default BienvenidaCard;