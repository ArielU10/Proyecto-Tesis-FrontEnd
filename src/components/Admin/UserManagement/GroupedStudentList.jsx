import React, { useState } from "react";
import { Eye, Pencil, Trash2, ClipboardList, UserRound } from "lucide-react";
import "../../../styles/components/userManagement/groupedStudentList.css";

const GroupedStudentList = ({ course, students, onEdit, onDelete, onView }) => {
  const [showStudents, setShowStudents] = useState(false);

  return (
    <div className="grouped-student-list fade-in">
      <div className="course-header" onClick={() => setShowStudents(!showStudents)}>
        <ClipboardList size={18} />
        <h4 className="course-title">{course.courseName} - {course.description}</h4>
      </div>

      {showStudents && (
        <div className="student-grid">
          {(!students || students.length === 0) ? (
            <p className="no-students">No hay estudiantes registrados en este curso.</p>
          ) : (
            students.map((student) => (
              <div key={student.id_student} className="student-item">
                <span className="student-name">
                  <UserRound size={14} style={{ marginRight: "8px" }} />
                  {student.lastName} {student.firstName}
                </span>
                <div className="student-actions">
                  <button
                    className="icon-btn"
                    title="Ver representante"
                    onClick={() => onView(student)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Editar"
                    onClick={() => onEdit(student)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Eliminar"
                    onClick={() => onDelete(student)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GroupedStudentList;
