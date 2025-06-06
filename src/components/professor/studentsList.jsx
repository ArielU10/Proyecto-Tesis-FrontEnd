import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getEstudiantes, postAsistencias } from '../../services/professorApi';

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencia, setAsistencia] = useState({});

  useEffect(() => {
    axios.get('/api/estudiantes')
      .then(response => {
        setEstudiantes(response.data);
        const inicial = {};
        response.data.forEach(e => (inicial[e.id_student] = true));
        setAsistencia(inicial);
      })
      .catch(error => {
        console.error('Error al cargar estudiantes:', error);
      });
  }, []);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const guardarAsistencia = () => {
    const registros = estudiantes.map(est => ({
      id_student: est.id_student,
      presente: asistencia[est.id_student]
    }));

    axios.post('/api/asistencias', registros)
      .then(() => alert('✅ Asistencia guardada'))
      .catch(() => alert('❌ Error al guardar asistencia'));
  };

  useEffect(() => {
  getEstudiantes()
    .then(response => {
      setEstudiantes(response.data);
      // ...
    })
    .catch(err => console.error(err));
});
  return (
    <div>
      <h2>Registro de Asistencia</h2>
      <table>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Presente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est.id_student}>
              <td>{est.firstName} {est.lastName}</td>
              <td>
                <input
                  type="checkbox"
                  checked={asistencia[est.id_student]}
                  onChange={() => toggleAsistencia(est.id_student)}
                />
              </td>
              <td>
                <button onClick={() => alert('Justificación')}>Justificar</button>
                <button onClick={() => alert('Registrar falta')}>Falta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={guardarAsistencia}>Guardar Asistencia</button>
    </div>
  );
};

export default ListaEstudiantes;
