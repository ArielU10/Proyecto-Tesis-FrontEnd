import React from "react";

const AccionesProfesor = ({ onShowInasistencias, onShowIncidentes,   onShowAtrasos, }) => (
  <div className="acciones-profesor">
    <button className="accion-btn qr " onClick={() => alert("QR")}>
      Novedades
    </button>
    <button className="accion-btn inasistencias" onClick={onShowInasistencias}>
      Inasistencias
    </button>
    <button className="accion-btn atrasos" onClick={onShowAtrasos}>
      Atrasos
    </button>
    <button className="accion-btn incidentes" onClick={onShowIncidentes}>
      Incidentes
    </button>
  </div>
);

export default AccionesProfesor;
