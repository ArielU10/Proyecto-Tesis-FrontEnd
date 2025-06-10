import React from "react";
import avatarFemenino from "../../assets/avatar_femenino.svg";

const BienvenidaCard = () => (
  <div className="bienvenida bg-warning rounded p-4 d-flex justify-content-between align-items-center shadow-sm">
    <div>
      <h4 className="fw-bold mb-2">¡Bienvenida, Victoria!</h4>
      <p className="mb-3"><strong>Portal de Seguridad y Comunicación Escolar</strong> </p>
      <ul className="mb-0" style={{ paddingLeft: "1.2rem" }}>
        <li><strong>Retiro seguro</strong> con códigos QR</li>
        <li><strong>Notificaciones inmediatas</strong> de atrasos, faltas e incidentes</li>
        <li><strong>Gestión eficiente</strong> de autorizaciones y permisos</li>
      </ul>
    </div>

    <img
      src={avatarFemenino}
      alt="Avatar Femenino"
      className="rounded-circle"
      style={{ width: "200px", height: "200px", objectFit: "cover" }}
    />
  </div>
);

export default BienvenidaCard;
