import React, { useState, useEffect } from "react";
import "../../styles/professor/modalPerfil.css";
import { getProfessorById, updateProfessorPhone } from "../../services/professorApiPhone";

const EditarPerfilProfesor = ({ show, onHide }) => {
  const [professor, setProfessor] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.roleId) {
        getProfessorById(user.roleId).then((data) => {
          setProfessor(data);
          setPhone(data.phone || "");
          setError("");
        });
      }
    }
  }, [show]);

  const handleSave = async () => {
    if (phone.length !== 10) {
      setError("El número de teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    try {
      await updateProfessorPhone(professor.id_professor, { phone });
      onHide();
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Ocurrió un error al guardar. Intenta nuevamente.");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
      if (error) setError("");
    }
  };

  if (!show || !professor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onHide}>×</button>
        <h2 className="modal-title">Perfil del Profesor</h2>

        <p><strong>Nombre:</strong> {professor.firstName} {professor.lastName}</p>
        <p><strong>Identificación:</strong> {professor.identification}</p>
        <p><strong>Email:</strong> {professor.email}</p>

        <div className="form-group">
          <label>Editar Teléfono</label>
          <input
            type="text"
            inputMode="numeric"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Ingrese número de teléfono"
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn cancel" onClick={onHide}>Cancelar</button>
          <button className="btn save" onClick={handleSave}>Guardar cambios</button>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilProfesor;
