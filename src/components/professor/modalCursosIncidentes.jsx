import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getCoursesByProfessor } from "../../services/courseApi";

const ModalCursosIncidentes = ({ show, onHide, professorId, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (show) {
      getCoursesByProfessor(professorId).then(setCourses);
    }
  }, [show, professorId]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona un Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Button key={course.id_course} className="mb-2 w-100" onClick={() => onSelectCourse(course)}>
              {course.courseName} - {course.level}
            </Button>
          ))
        ) : (
          <p>No tienes cursos asignados.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalCursosIncidentes;
