import React from "react";
import { FaUser } from "react-icons/fa";

const EstudiantesSeguimiento = () => (
  <div className="seguimiento">
    <h6 className="fw-bold">Estudiantes en seguimiento</h6>
    <div className="d-flex gap-2 mt-2">
      <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
        <FaUser />
      </div>
      <div className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
        <FaUser />
      </div>
      <div className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
        <FaUser />
      </div>
      <button className="btn btn-outline-secondary rounded-circle p-1" style={{ width: 40, height: 40 }}>
        +
      </button>
    </div>
  </div>
);

export default EstudiantesSeguimiento;