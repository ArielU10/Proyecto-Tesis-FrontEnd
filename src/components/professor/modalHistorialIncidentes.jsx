import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SelectCursoHistorial from "./selectCursoHistorial";
import ListaEstudiantesHistorial from "./listaEstudiantesHistorial";
import ListaIncidentesHistorial from "./listaIncidentesHistorial";
import { getCoursesByProfessor } from "../../services/courseApi";
import { getStudentsByCourse } from "../../services/studentApi";
import { getIncidentsByStudentId } from "../../services/incidentApi";

const ModalHistorialIncidentes = ({ show, onHide, professorId }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (show) {
      getCoursesByProfessor(professorId).then(setCourses);
    }
  }, [show, professorId]);

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedStudent(null);
    setIncidents([]);
    if (courseId) {
      getStudentsByCourse(courseId).then(setStudents);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    getIncidentsByStudentId(student.id_student).then(setIncidents);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Historial de Incidentes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SelectCursoHistorial courses={courses} selectedCourse={selectedCourse} onCourseChange={handleCourseChange} />
        <ListaEstudiantesHistorial students={students} onStudentClick={handleStudentClick} />
        <ListaIncidentesHistorial student={selectedStudent} incidents={incidents} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalHistorialIncidentes;
