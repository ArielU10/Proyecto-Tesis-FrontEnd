import React, { useState } from "react";
import { getTodayAsistancesByCourse } from "../../../services/asistanceApi";
import AsistanceTable from "./AsistanceTable";

const CourseAsistanceCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleExpand = async () => {
    if (!expanded) {
      setLoading(true);
      const data = await getTodayAsistancesByCourse(course.id_course);
      setAsistencias(data);
      setLoading(false);
    }
    setExpanded(!expanded);
  };

  return (
    <div className="course-card">
      <div className="course-info">
        <p><strong>Curso:</strong> {course.courseName}</p>
        <p><strong>Paralelo:</strong> {course.description}</p>
        <button className="add-btn" onClick={toggleExpand}>
          {expanded ? "Ocultar" : "Ver Asistencias"}
        </button>
      </div>

      {expanded && (
        <div className="asistencias-container">
          {loading ? (
            <p className="loading-text">Cargando asistencias...</p>
          ) : asistencias.length === 0 ? (
            <p className="no-courses-message">✅ Todos asistieron puntualmente.</p>
          ) : (
            <AsistanceTable asistencias={asistencias} />
          )}
        </div>
      )}
    </div>
  );
};

export default CourseAsistanceCard;
