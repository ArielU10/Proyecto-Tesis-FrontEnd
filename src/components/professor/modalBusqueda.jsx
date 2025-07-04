import React, { useState, useRef, useEffect } from "react";
import "../../styles/professor/modalBusqueda.css";

const ModalBusqueda = ({ show, onHide, students }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const itemRefs = useRef([]);

  const toggleInfo = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    if (expandedIndex !== null && itemRefs.current[expandedIndex]) {
      itemRefs.current[expandedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [expandedIndex]);

  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2 className="modal-title">Resultados de Búsqueda</h2>
          <button className="custom-close-button" onClick={onHide}>×</button>
        </div>

        <div className="custom-modal-body">
          {students.length === 0 ? (
            <p>No se encontraron estudiantes.</p>
          ) : (
            <ul className="student-list">
              {students.map((student, index) => (
                <li
                  key={student.id_student}
                  className={`student-item ${expandedIndex === index ? "selected" : ""}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                >
                  <div
                    className="student-name"
                    onClick={() => toggleInfo(index)}
                  >
                    {student.lastName} {student.firstName}
                  </div>
                  {expandedIndex === index && (
                    <div className="student-info">
                      {/* <div><strong>Cédula:</strong> {student.identityCard}</div> */}
                      <div><strong>Curso:</strong> {student.Course?.courseName || "No asignado"}</div>
                      <div className="representative">
                        <strong>Representante Legal:</strong>
                        {student.LegalRepresentative ? (
                          <div className="representative-info">
                            <div><strong>Nombre:</strong> {student.LegalRepresentative.firstName} {student.LegalRepresentative.lastName}</div>
                            <div><strong>Teléfono:</strong> {student.LegalRepresentative.phone}</div>
                            <div><strong>Email:</strong> {student.LegalRepresentative.email}</div>
                          </div>
                        ) : (
                          <div className="representative-info">No asignado</div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="custom-modal-footer">
          <button className="custom-button" onClick={onHide}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBusqueda;
