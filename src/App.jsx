// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import LegalRepresentativeRoutes from './pages/legalRepresentantive/routes';
import AdministrativeRoutes from './pages/administrative/adminRoutes';
import ProfessorPage from './pages/professor/professorPage';
import ModalIncidente from "./components/professor/modalIncidente";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/professor/incident/:studentId/:courseId" element={<ModalIncidente />} />

        {LegalRepresentativeRoutes}
        {AdministrativeRoutes}
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
