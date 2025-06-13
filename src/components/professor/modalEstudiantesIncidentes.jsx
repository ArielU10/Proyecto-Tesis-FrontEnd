import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getStudentsByCourse } from "../../services/studentApi";

const ModalEstudiantesIncidentes = ({ show, onHide, course, onSelectStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (show) {
      getStudentsByCourse(course.id_course).then(setStudents);
    }
  }, [show, course]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona un Estudiante</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {students.length > 0 ? (
          students.map((student) => (
            <Button key={student.id_student} className="mb-2 w-100" onClick={() => onSelectStudent(student)}>
              {student.lastName} {student.firstName}
            </Button>
          ))
        ) : (
          <p>No hay estudiantes en este curso.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalEstudiantesIncidentes;
