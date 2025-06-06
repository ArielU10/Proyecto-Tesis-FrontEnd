import React from "react";
import { Card, Button } from "react-bootstrap";

const CourseCard = ({ course, onClick }) => {
  return (
    <Card style={{ width: "14rem", cursor: "pointer" }} onClick={() => onClick(course.id)}>
      <Card.Body>
        <Card.Title>{course.courseName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Nivel: {course.level}</Card.Subtitle>
        <Button variant="primary" className="mt-2 w-100">
          Ver Estudiantes
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
