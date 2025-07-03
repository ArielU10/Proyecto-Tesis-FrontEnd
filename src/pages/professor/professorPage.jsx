import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Estilos y servicios
import "../../styles/professor/professorPage.css";
import { getCoursesByProfessor } from "../../services/courseApi";
import { getStudentsByCourse } from "../../services/studentApi";

// Componentes
import HeaderProfesor from "../../components/professor/headerProfessor";
import BienvenidaCard from "../../components/professor/bienvenidaProfessor";
import ListaCursos from "../../components/professor/listaCursos";
import AccionesProfesor from "../../components/professor/accionesProfessor";
import EstudiantesSeguimiento from "../../components/professor/estudianteSeguimiento";
import ModalEstudiantes from "../../components/professor/modalStudents";
import ModalInasistencias from "../../components/professor/modalNoAsistencias";
import ModalHistorialIncidentes from "../../components/professor/modalHistorialIncidentes";
import ModalAtrasos from "../../components/professor/modalAtrasos";
import FooterProfesor from "../../components/professor/footerProfessor";

const ProfessorPage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInasistencias, setShowInasistencias] = useState(false);
  const [showIncidentes, setShowIncidentes] = useState(false);
  const [showAtrasos, setShowAtrasos] = useState(false);
  const [professorId, setProfessorId] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "professor") {
      navigate("/unauthorized");
      return;
    }

    setIsAuthorized(true); // Usuario autorizado

    setProfessorId(user.roleId);
    getCoursesByProfessor(user.roleId)
      .then((data) => {
        const formattedCourses = data.map((item) => item.course);
        setCourses(formattedCourses);
      })
      .catch((error) => console.error("Error al obtener cursos:", error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    getStudentsByCourse(courseId)
      .then((data) => {
        setStudents(data);
        setShowModal(true);
      })
      .catch(console.error);
  };

  // 🔐 Esperar validación
  if (!isAuthorized) return null;

  return (
    <div className="parent">
      <HeaderProfesor onLogout={handleLogout} />

      <div className="div2 p-4">
        <BienvenidaCard />
        <div className="row mt-4 g-3">
          <div className="col-md-12">
            <ListaCursos courses={courses} onSelectCourse={handleCourseClick} />
          </div>
        </div>
      </div>

      <div className="div3 p-4 bg-light d-flex flex-column justify-content-between">
        <div className="mb-4">
          <AccionesProfesor
            onShowInasistencias={() => setShowInasistencias(true)}
            onShowIncidentes={() => setShowIncidentes(true)}
            onShowAtrasos={() => setShowAtrasos(true)}
          />
        </div>
        <EstudiantesSeguimiento />
      </div>

      {showModal && (
        <ModalEstudiantes
          show={showModal}
          onHide={() => setShowModal(false)}
          students={students}
          courseId={selectedCourse}
        />
      )}

      {showInasistencias && (
        <ModalInasistencias
          show={showInasistencias}
          onHide={() => setShowInasistencias(false)}
          courses={courses}
          professorId={professorId}
        />
      )}

      {showIncidentes && (
        <ModalHistorialIncidentes
          show={showIncidentes}
          onHide={() => setShowIncidentes(false)}
          professorId={professorId}
        />
      )}

      {showAtrasos && (
        <ModalAtrasos
          show={showAtrasos}
          onHide={() => setShowAtrasos(false)}
          courses={courses}
          professorId={professorId}
        />
      )}

      <FooterProfesor />
    </div>
  );
};

export default ProfessorPage;
