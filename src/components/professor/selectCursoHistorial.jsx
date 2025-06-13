import React from "react";
import { Form } from "react-bootstrap";

const SelectCursoHistorial = ({ courses, selectedCourse, onCourseChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Seleccione un curso:</Form.Label>
    <Form.Select value={selectedCourse} onChange={(e) => onCourseChange(e.target.value)}>
      <option value="">Seleccione...</option>
      {courses.map(course => (
        <option key={course.id_course} value={course.id_course}>
          {course.courseName}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

export default SelectCursoHistorial;
