import React, { useEffect, useState } from "react";

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
        .catch(err => {
          console.error("Error al obtener profesor:", err);
          setProfessorName("Profesor/a");
        });
    }
  }, []);

  return (
    <div className="bienvenida bg-warning rounded p-4 d-flex justify-content-between align-items-center shadow-sm">
      <div>
        <h4 className="fw-bold mb-2">¡Bienvenido/a, profe {professorName}!</h4>
        <p className="mb-3">A tu panel de gestión académica.</p>
        <ul className="mb-0">
          <li><strong>Visualiza tus cursos asignados</strong> fácilmente</li>
          <li><strong>Envía eventos escolares</strong> y notifícalos a los representantes</li>
          <li><strong>Registra la asistencia</strong> de tus clases en tiempo real</li>
          <li><strong>Registra incidentes</strong> asociados a estudiantes con seguimiento</li>
          <li><strong>Realiza seguimiento</strong> a estudiantes con historial de novedades</li>
        </ul>
      </div>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Perfil" width="100" />
      </div>
    </div>
  );
};

export default BienvenidaCard;
