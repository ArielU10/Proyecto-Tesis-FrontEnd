import React from "react";
import CourseCard from "./courseCard";

const ListaCursos = ({ courses, onSelectCourse }) => {
  return (
    <div>
      <h5 className="fw-bold mb-3">Cursos</h5>
      <div className="d-flex flex-wrap gap-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={onSelectCourse}
            />
          ))
        ) : (
          <p className="text-muted">No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListaCursos;
