import React from "react";

const ListaEstudiantesHistorial = ({ students, onStudentClick }) => (
  students.length > 0 && (
    <div className="mb-3">
      <h6>Estudiantes:</h6>
      <ul className="list-group">
        {students.map(student => (
          <li
            key={student.id_student}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            onClick={() => onStudentClick(student)}
          >
            {student.lastName} {student.firstName}
          </li>
        ))}
      </ul>
    </div>
  )
);

export default ListaEstudiantesHistorial;
