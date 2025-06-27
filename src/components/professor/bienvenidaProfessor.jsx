import React, { useEffect, useState } from "react";
import logoJN from "../../assets/logoJN_rojo.svg";

const BienvenidaCard = () => {
  const [professorName, setProfessorName] = useState("Profesor/a");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "professor") {
      fetch(`http://localhost:3000/api/professors/${user.roleId}`)
        .then(res => res.json())
        .then(data => {
          setProfessorName(data.firstName);
        })
        .catch(() => {
          setProfessorName("Profesor/a");
        });
    }
  }, []);

  return (
    <div className="bienvenida-card">
      <div className="bienvenida-texto">
        <h4>¡Bienvenido/a, profe {professorName}!</h4>
        <p>A tu panel de gestión académica.</p>
        <ul className="bienvenida-detalle">
      <li><strong>Visualiza tus cursos asignados</strong> fácilmente</li>
      <li><strong>Envía eventos escolares</strong> y notifícalos a los representantes</li>
      <li><strong>Registra la asistencia</strong> de tus clases en tiempo real</li>
      <li><strong>Registra incidentes</strong> asociados a estudiantes con seguimiento</li>
      <li><strong>Realiza seguimiento</strong> a estudiantes con historial de novedades</li>
    </ul>
      </div>
      <div className="bienvenida-imagen">
        <img src={logoJN} alt="Perfil" />
      </div>
    </div>
  );
};

export default BienvenidaCard;
