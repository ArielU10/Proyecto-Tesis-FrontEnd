import React, { useState } from "react";
import {
  Eye, Pencil, Trash2, ClipboardList, UserRound,
  Search, ChevronDown, ChevronRight, SortAsc, SortDesc,
  Loader2, AlertTriangle
} from "lucide-react";
import "../../../styles/components/userManagement/groupedStudentList.css";

const GroupedStudentList = ({ course, students, onEdit, onDelete, onView }) => {
  const [showStudents, setShowStudents] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredStudents = students?.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.identityCard?.toString().includes(searchTerm)
  ) || [];

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aValue = a[sortBy], bValue = b[sortBy];
    if (sortBy === "age" && a.birthDate && b.birthDate) {
      aValue = new Date().getFullYear() - new Date(a.birthDate).getFullYear();
      bValue = new Date().getFullYear() - new Date(b.birthDate).getFullYear();
    }
    if (typeof aValue === "string") { aValue = aValue.toLowerCase(); bValue = bValue.toLowerCase(); }
    return sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const today = new Date(); const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  const handleDeleteClick = (student) => setShowDeleteConfirm(student.id_student);
  const confirmDelete = async (student) => {
    setLoadingDelete(student.id_student);
    try { await onDelete(student); setShowDeleteConfirm(null); }
    catch (e) { console.error(e); }
    finally { setLoadingDelete(null); }
  };
  const cancelDelete = () => setShowDeleteConfirm(null);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortOrder("asc"); }
  };

  return (
    <div className="gsl-root fade-in">
      {/* NIVEL 0: Header del curso */}
      <div className="gsl-header" onClick={() => setShowStudents(!showStudents)}>
        <div className="gsl-header-info">
          {showStudents ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <ClipboardList size={18} />
          <h4 className="gsl-title">{course.courseName} - {course.description}</h4>
        </div>
        <div className="gsl-header-stats">
          <span className="gsl-count">
            {students?.length || 0} estudiante{students?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className={`gsl-content ${showStudents ? "expanded" : "collapsed"}`}>
        {showStudents && (
          <>
            {/* NIVEL 1: Controles de búsqueda (con sangría) */}
            {students && students.length > 0 && (
              <div className="gsl-controls gsl-level-2">
                <div className="gsl-search">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o cédula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="gsl-search-input"
                  />
                </div>

                <div className="gsl-sort">
                  <button
                    className={`gsl-sort-btn ${sortBy === "lastName" ? "active" : ""}`}
                    onClick={() => handleSort("lastName")}
                  >
                    Apellido {sortBy === "lastName" && (sortOrder === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </button>
                  <button
                    className={`gsl-sort-btn ${sortBy === "firstName" ? "active" : ""}`}
                    onClick={() => handleSort("firstName")}
                  >
                    Nombre {sortBy === "firstName" && (sortOrder === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </button>
                  <button
                    className={`gsl-sort-btn ${sortBy === "age" ? "active" : ""}`}
                    onClick={() => handleSort("age")}
                  >
                    Edad {sortBy === "age" && (sortOrder === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </button>
                </div>
              </div>
            )}

            {/* NIVEL 2: Lista de estudiantes (con más sangría) */}
            <div className="gsl-grid gsl-level-2">
              {(!students || students.length === 0) ? (
                <div className="gsl-empty">
                  <UserRound size={48} />
                  <p>No hay estudiantes registrados en este curso.</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="gsl-empty">
                  <Search size={48} />
                  <p>No se encontraron estudiantes que coincidan con "{searchTerm}"</p>
                </div>
              ) : (
                sortedStudents.map((student) => (
                  <div key={student.id_student} className="gsl-item">
                    {showDeleteConfirm === student.id_student && (
                      <div className="gsl-delete-overlay">
                        <div className="gsl-delete-card">
                          <AlertTriangle size={20} />
                          <p>¿Eliminar a {student.firstName} {student.lastName}?</p>
                          <div className="gsl-delete-actions">
                            <button
                              className="gsl-btn-danger"
                              onClick={() => confirmDelete(student)}
                              disabled={loadingDelete === student.id_student}
                            >
                              {loadingDelete === student.id_student ? <Loader2 size={14} className="spinning" /> : "Eliminar"}
                            </button>
                            <button className="gsl-btn-muted" onClick={cancelDelete}>Cancelar</button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="gsl-avatar"><UserRound size={20} /></div>

                    <div className="gsl-info">
                      <span className="gsl-name">{student.lastName}, {student.firstName}</span>
                      <div className="gsl-badges">
                        <span className="gsl-badge-age">{calculateAge(student.birthDate)} años</span>
                        <span className="gsl-badge-id">C.I: {student.identityCard || "N/A"}</span>
                      </div>
                    </div>

                    <div className="gsl-actions">
                      <button 
                        className="gsl-btn-view1" 
                        title="Ver representante" 
                        onClick={() => onView(student)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="gsl-btn-edit1" 
                        title="Editar estudiante" 
                        onClick={() => onEdit(student)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        className="gsl-btn-delete1" 
                        title="Eliminar estudiante" 
                        onClick={() => handleDeleteClick(student)} 
                        disabled={loadingDelete === student.id_student}
                      >
                        {loadingDelete === student.id_student ? 
                          <Loader2 size={16} className="spinning" /> : 
                          <Trash2 size={16} />
                        }
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* NIVEL 2: Resumen (con sangría igual a la lista) */}
            {students && students.length > 0 && (
              <div className="gsl-summary gsl-level-2">
                <span>Mostrando {filteredStudents.length} de {students.length} estudiantes{searchTerm && ` para "${searchTerm}"`}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupedStudentList;