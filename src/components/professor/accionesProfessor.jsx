import React from "react";

const AccionesProfesor = ({ onShowInasistencias, onShowIncidentes }) => (
  <div className="acciones row g-2 mb-4">
    <div className="col-6">
      <button className="btn btn-primary w-100 boton_accion">Códigos QR</button>
    </div>
    <div className="col-6">
      <button className="btn btn-warning w-100 boton_accion" onClick={onShowInasistencias}>Inasistencias</button>
    </div>
    <div className="col-6">
      <button className="btn btn-primary w-100 boton_accion">Atrasos</button>
    </div>
    <div className="col-6">
      <button className="btn btn-danger w-100 boton_accion" onClick={onShowIncidentes}>Incidentes</button>
    </div>
  </div>
);

export default AccionesProfesor;
