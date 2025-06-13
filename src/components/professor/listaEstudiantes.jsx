import React from "react";

const ListaEstudiantes = ({selectedCourse }) => {
    return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="fw-bold">Estudiantes</h5>

      {!selectedCourse ? (
        <p className="text-muted">Selecciona un curso</p>
      ) : sortedStudents.length > 0 ? (
        <ul className="list-group">
          {sortedStudents.map((student) => (
            <li key={student.id_student} className="list-group-item fw-bold">
              {student.lastName} {student.firstName}
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
