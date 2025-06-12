import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { getStudentsInFollowUp } from "../../services/incidentApi";
import ModalSeguimiento from "./modalSeguimiento";

const EstudiantesSeguimiento = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarSeguimiento();
  }, []);

  const cargarSeguimiento = () => {
    setLoading(true);
    getStudentsInFollowUp()
      .then((data) => {
        console.log("Seguimiento cargado:", data);
        setStudents(data);
      })
      .finally(() => setLoading(false));
  };

  const abrirModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    cargarSeguimiento();
  };

  return (
    <div>
      <h6 className="fw-bold mb-3">Estudiantes en seguimiento</h6>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : students.length === 0 ? (
        <p className="text-muted">No hay estudiantes en seguimiento.</p>
      ) : (
        <ListGroup>
          {students.map((student) => (
            <ListGroup.Item
              key={student.id_student}
              action
              className="text-primary fw-bold"
              onClick={() => abrirModal(student)}
            >
              {student.lastName} {student.firstName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {selectedStudent && (
        <ModalSeguimiento
          show={showModal}
          onHide={cerrarModal}
          student={selectedStudent}
          onFollowUpUpdated={cargarSeguimiento}
        />
      )}
    </div>
  );
};

export default EstudiantesSeguimiento;
