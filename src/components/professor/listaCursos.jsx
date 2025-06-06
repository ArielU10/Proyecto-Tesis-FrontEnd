import React from "react";

const ListaCursos = ({ courses, selectedCourse, onSelectCourse }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5 className="fw-bold">Cursos</h5>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course.id_course} 
            className={`curso-item ${selectedCourse === course.id_course ? "fw-bold text-primary" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCourse(course.id_course)} 
          >
            {course.courseName}
          </div>
        ))
      ) : (
        <p className="text-muted">No hay cursos disponibles</p>
      )}
    </div>
  );
};

export default ListaCursos;
