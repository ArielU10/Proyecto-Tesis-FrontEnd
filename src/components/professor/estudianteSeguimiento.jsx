import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getStudentsInFollowUp } from "../../services/incidentApi";
import ModalSeguimiento from "./modalSeguimiento";

const EstudiantesSeguimiento = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const cargarSeguimiento = () => {
    getStudentsInFollowUp().then(setStudents);
  };

  useEffect(() => {
    cargarSeguimiento();
  }, []);

  const handleVerSeguimiento = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleFollowUpUpdated = () => {
    cargarSeguimiento();
  };

  return (
    <div>
      <h5 className="fw-bold">Estudiantes en seguimiento</h5>
      <ListGroup>
        {students.map((student) => (
          <ListGroup.Item
            key={student.id_student}
            action
            onClick={() => handleVerSeguimiento(student)}
            className="text-primary fw-bold"
          >
            {student.lastName} {student.firstName}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedStudent && (
        <ModalSeguimiento
          show={showModal}
          onHide={() => setShowModal(false)}
          student={selectedStudent}
          onFollowUpUpdated={handleFollowUpUpdated}
        />
      )}
    </div>
  );
};

export default EstudiantesSeguimiento;
