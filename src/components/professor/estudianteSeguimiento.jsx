import React, { useEffect, useState } from "react";
import { getStudentsInFollowUp } from "../../services/studentFollowApi";

const EstudiantesSeguimiento = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudentsInFollowUp()
      .then((data) => {
        console.log("Seguimiento cargado:", data);
        setStudents(data);
      })
      .catch((err) => {
        console.error("Error al cargar estudiantes en seguimiento:", err);
      });
  }, []);

  return (
    <div className="seguimiento">
      <h6 className="fw-bold">Estudiantes en seguimiento</h6>
      <div className="list-group mt-2">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.id_student} className="list-group-item">
              {student.lastName} {student.firstName}
            </div>
          ))
        ) : (
          <p className="text-muted">No hay estudiantes en seguimiento</p>
        )}
      </div>
    </div>
  );
};

export default EstudiantesSeguimiento;
