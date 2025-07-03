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

import "../../../styles/components/userManagement/userList.css";
import { toast } from "react-toastify";

const levelOrder = [
    "Inicial",
    "Basica Elemental",
    "Basica Media",
    "Colegio Basica",
    "Bachillerato"
];

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

        // Agrupar por nivel
        const grouped = {};
        for (const course of courseList) {
          if (!grouped[course.level]) {
            grouped[course.level] = [];
          }
          grouped[course.level].push(course);
        }

        // Ordenar cursos por courseName dentro de cada nivel
        for (const level in grouped) {
          grouped[level].sort((a, b) => a.courseName.localeCompare(b.courseName));
        }

        // Convertir a array ordenado por la jerarquía deseada
        const finalGrouped = levelOrder
          .filter((level) => grouped[level]) // solo los niveles que existan
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
      toast.error("❌ Error al cargar usuarios");
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
        }

        toast.success("✅ Usuario eliminado");
        fetchData();
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      toast.error("Error al eliminar usuario");
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
      }

      toast.success("✅ Usuario actualizado");
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      toast.error("Error al actualizar usuario");
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
                students={[]}
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
