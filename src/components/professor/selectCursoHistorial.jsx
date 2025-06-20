import React from "react";
import "../../styles/professor/modalHistorial.css";


const SelectCursoHistorial = ({ courses, selectedCourse, onCourseChange }) => (
  <div className="select-curso-container">
    <label>Seleccione un curso:</label>
    <select value={selectedCourse} onChange={(e) => onCourseChange(e.target.value)}>
      <option value="">Seleccione...</option>
      {courses.map(course => (
        <option key={course.id_course} value={course.id_course}>
          {course.courseName}
        </option>
      ))}
    </select>
  </div>
);

export default SelectCursoHistorial;
