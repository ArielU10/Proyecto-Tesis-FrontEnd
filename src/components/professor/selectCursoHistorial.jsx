import React, { useEffect } from "react";
import "../../styles/professor/modalHistorial.css";

const SelectCursoHistorial = ({ courses, selectedCourse, onCourseChange }) => {
  useEffect(() => {
    console.log("Cursos recibidos:", courses);
  }, [courses]);

  return (
    <div className="select-curso-container">
      <label>Seleccione un curso:</label>
      <select
        value={selectedCourse}
        onChange={(e) => onCourseChange(e.target.value)}
      >
        <option value="">Seleccione...</option>
        {courses.map((item, index) => (
          <option
            key={item.course?.id_course || index}
            value={item.course?.id_course}
          >
            {item.course?.courseName || `Curso sin nombre (${index + 1})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCursoHistorial;
