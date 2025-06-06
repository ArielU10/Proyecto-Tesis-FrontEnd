import React from "react";
import "../../styles/professor/listaCursos.css"; // Asegúrate de tener este CSS

const ListaCursos = ({ courses, onSelectCourse }) => {
  return (
    <div className="lista-cursos">
      <h5 className="titulo-seccion">Cursos</h5>
      <div className="cursos-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id_course}
              className="curso-card"
              onClick={() => onSelectCourse(course.id_course)}
            >
              <h6 className="curso-nombre">{course.courseName}</h6>
              <p className="curso-nivel">Nivel: {course.level}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListaCursos;
