import React from "react";

const ListaEstudiantes = ({ students, selectedCourse }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="fw-bold">Estudiantes</h5>

      {!selectedCourse ? (
        <p className="text-muted">Selecciona un curso</p>
      ) : Array.isArray(students) && students.length > 0 ? (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student.id_student} className="list-group-item">
              {student.firstName} {student.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No hay estudiantes en este curso</p>
      )}
    </div>
  );
};

export default ListaEstudiantes;
