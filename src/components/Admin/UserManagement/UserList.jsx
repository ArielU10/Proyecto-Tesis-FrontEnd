import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserDetailModal from "./UserDetailModal";
import GroupedStudentList from "./GroupedStudentList";

import {
  getAllAdministratives,
  updateAdministrative,
  deleteAdministrative,
} from "../../../services/administrativeApi";
import {
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
} from "../../../services/professorApi";
import {
  getAllGuards,
  updateGuard,
  deleteGuard,
} from "../../../services/guardApi";
import { getAllCourses } from "../../../services/courseApi";
import { getStudentsByCourse } from "../../../services/studentApi";

import "../../../styles/components/userManagement/userList.css";
import { toast } from "react-toastify";

const levelOrder = [
  "Inicial",
  "Basica Elemental",
  "Basica Media",
  "Colegio Basica",
  "Bachillerato",
];

// 👉 función para ordenar por paralelo A-Z, si están en mismo grado
const extractCourseData = (name, parallel) => {
  const numberMatch = name.match(/\d+/);
  const number = numberMatch ? parseInt(numberMatch[0]) : 0;
  return {
    number,
    letter: parallel || "",
  };
};

const UserList = ({ activeTab }) => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      if (activeTab === "administrative") {
        const result = await getAllAdministratives();
        setData(result);
        setCourses([]);
      } else if (activeTab === "professor") {
        const result = await getAllProfessors();
        setData(result);
        setCourses([]);
      } else if (activeTab === "guard") {
        const result = await getAllGuards();
        setData(result);
        setCourses([]);
      } else if (activeTab === "student") {
        const courseList = await getAllCourses();
        const grouped = {};

        for (const course of courseList) {
          if (!grouped[course.level]) grouped[course.level] = [];

          try {
            const students = await getStudentsByCourse(course.id_course);
            grouped[course.level].push({ ...course, students });
          } catch (err) {
            if (err.response?.status === 404) {
              grouped[course.level].push({ ...course, students: [] });
            } else {
              console.error(`❌ Error trayendo estudiantes del curso ${course.id_course}:`, err.message);
            }
          }
        }

        // Ordenar los cursos por número y paralelo
        for (const level in grouped) {
          grouped[level].sort((a, b) => {
            const aData = extractCourseData(a.courseName, a.description);
            const bData = extractCourseData(b.courseName, b.description);

            if (aData.number !== bData.number) {
              return aData.number - bData.number;
            }
            return aData.letter.localeCompare(bData.letter);
          });
        }

        const finalGrouped = levelOrder
          .filter((level) => grouped[level])
          .map((level) => ({
            level,
            courses: grouped[level],
          }));

        setCourses(finalGrouped);
        setData([]);
      } else {
        setData([]);
        setCourses([]);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      toast.error("❌ Error al cargar usuarios", { className: "toast-error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
        if (activeTab === "administrative") {
          await deleteAdministrative(user.id_administrative);
        } else if (activeTab === "professor") {
          await deleteProfessor(user.id_professor);
        } else if (activeTab === "guard") {
          await deleteGuard(user.id_guard);
        } else if (activeTab === "student") {
          await deleteStudent(user.id_student);
        }

        toast.success("✅ Usuario eliminado", { className: "toast-delete" });
        fetchData();
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      toast.error("Error al eliminar usuario", { className: "toast-error" });
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      if (activeTab === "administrative") {
        await updateAdministrative(updatedData.id_administrative, updatedData);
      } else if (activeTab === "professor") {
        await updateProfessor(updatedData.id_professor, updatedData);
      } else if (activeTab === "guard") {
        await updateGuard(updatedData.id_guard, updatedData);
      } else if (activeTab === "student") {
        await updateStudent(updatedData.id_student, updatedData);
      }

      toast.success("✅ Usuario actualizado", { className: "toast-update" });
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      toast.error("Error al actualizar usuario", { className: "toast-error" });
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  return (
    <>
      <UserDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        user={selectedUser}
        onSave={handleUpdate}
        role={activeTab}
      />

      {activeTab === "student" ? (
        <div className="user-list-section">
          {courses.map((group) => (
            <div key={group.level} className="grouped-level-block">
              <h3>{group.level}</h3>
              <div className="courses-grid">
                {group.courses.map((course) => (
                  <GroupedStudentList
                    key={course.id_course}
                    course={course}
                    students={course.students}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="user-card-grid">
          {data.map((user) => (
            <UserCard
              key={user.id_user || user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
