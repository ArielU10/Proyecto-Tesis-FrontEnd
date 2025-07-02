// src/components/Admin/CourseGroup.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../styles/administrative/courseGroup.css';

const CourseGroup = ({ courses, onEdit, onDelete }) => {
  // Agrupar cursos por nivel
  const grouped = courses.reduce((acc, course) => {
    const level = course.level || 'Sin nivel';
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  return (
    <div className="course-group-container">
      {Object.entries(grouped).map(([level, levelCourses]) => (
        <div key={level} className="course-level-section">
          <h3 className="course-level-title">{level}</h3>
          <div className="course-cards">
            {levelCourses.map(course => (
              <div key={course.id_course} className="course-card">
                <div className="course-info">
                  <p><strong>Grado:</strong> {course.courseName}</p>
                  <p><strong>Paralelo:</strong> {course.description}</p>
                </div>
                <div className="course-actions">
                  <button onClick={() => onEdit(course)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(course.id_course)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseGroup;
