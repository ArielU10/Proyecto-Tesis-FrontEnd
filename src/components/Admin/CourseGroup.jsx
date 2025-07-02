import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../styles/administrative/courseGroup.css';

const CourseGroup = ({ courses, onEdit, onDelete, onAddClick }) => {
  const grouped = courses.reduce((acc, course) => {
    const level = course.level || 'Sin nivel';
    if (!acc[level]) acc[level] = [];
    acc[level].push(course);
    return acc;
  }, {});

  const sortCourses = (a, b) => {
    const numA = parseInt(a.courseName.match(/\d+/)) || 0;
    const numB = parseInt(b.courseName.match(/\d+/)) || 0;
    if (numA !== numB) return numA - numB;
    return a.description.localeCompare(b.description);
  };

  return (
    <div className="course-group-container">
      {Object.entries(grouped).map(([level, levelCourses]) => (
        <div key={level} className="course-level-section">
          <div className="course-level-title-container">
            <h3 className="course-level-title">{level}</h3>
            <button className="add-btn" onClick={() => onAddClick(level)}>+ Agregar Curso</button>
          </div>
          <div className="course-cards">
            {levelCourses.sort(sortCourses).map(course => (
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
