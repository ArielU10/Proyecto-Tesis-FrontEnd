import React from "react";

const ListaEstudiantes = ({ students }) => (
  <div className="bg-white p-3 rounded shadow-sm">
    <h5 className="fw-bold">Estudiantes</h5>
    {students.length > 0 ? (
      students.map((student) => (
        <p key={student.id}>
          {student.first_name} {student.last_name}
        </p>
      ))
    ) : (
      <p className="text-muted">Selecciona un curso</p>
    )}
  </div>
);

export default ListaEstudiantes;