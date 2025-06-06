import React from "react";

const ListaCursos = ({ courses, selectedCourse, onSelectCourse }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="fw-bold">Cursos</h5>
      {courses.length > 0 ? (
        courses.map((course) => (
          <p
            key={course.id} // ✅ clave única
            className={`curso-item ${selectedCourse === course.id ? "fw-bold text-primary" : ""}`}
            style={{ cursor: "pointer", marginBottom: "0.5rem" }}
            onClick={() => onSelectCourse(course.id)} // ✅ pasa el ID al padre
          >
            {course.name}
          </p>
        ))
      ) : (
        <p className="text-muted">No hay cursos disponibles</p>
      )}
    </div>
  );
};

export default ListaCursos;

