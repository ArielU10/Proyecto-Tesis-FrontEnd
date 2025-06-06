import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/professor/professorPage.css";

import { getCourses } from "../../services/courseApi";
import { getStudentsByCourse } from "../../services/studentApi";

// Componentes
import HeaderProfesor from "../../components/professor/headerProfessor";
import BienvenidaCard from "../../components/professor/bienvenidaProfessor";
import ListaCursos from "../../components/professor/listaCursos";
import AccionesProfesor from "../../components/professor/accionesProfessor";
import EstudiantesSeguimiento from "../../components/professor/estudianteSeguimiento";
import ModalEstudiantes from "../../components/professor/modalStudents";

const ProfessorPage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCourses()
      .then((data) => {
        console.log("Cursos obtenidos:", data);
        setCourses(data);
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    getStudentsByCourse(courseId)
      .then((data) => {
        console.log("Estudiantes recibidos:", data);
        setStudents(data);
        setShowModal(true);
      })
      .catch(console.error);
  };

  return (
    <div className="parent">
      {/* Encabezado */}
      <HeaderProfesor onLogout={handleLogout} />

      {/* Panel izquierdo */}
      <div className="div2 p-4">
        <BienvenidaCard />
        <div className="row mt-4 g-3">
          <div className="col-md-12">
            <ListaCursos
              courses={courses}
              onSelectCourse={handleCourseClick}
            />
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="div3 p-4 bg-light d-flex flex-column justify-content-between">
        <AccionesProfesor />
        <EstudiantesSeguimiento />
      </div>

      {/* Modal con estudiantes */}
      <ModalEstudiantes
        show={showModal}
        onHide={() => setShowModal(false)}
        students={students}
        courseId={selectedCourse}
      />
    </div>
  );
};

export default ProfessorPage;
