import React from "react";

const AccionesProfesor = ({ onShowInasistencias, onShowIncidentes }) => (
  <div className="acciones-profesor">
    <button className="accion-btn qr " onClick={() => alert("QR")}>
      Novedades
    </button>
    <button className="accion-btn inasistencias" onClick={onShowInasistencias}>
      Inasistencias
    </button>
    <button className="accion-btn atrasos" onClick={() => alert("Atrasos")}>
      Atrasos
    </button>
    <button className="accion-btn incidentes" onClick={onShowIncidentes}>
      Incidentes
    </button>
  </div>
);

export default AccionesProfesor;
