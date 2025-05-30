import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import AdminScreen from './pages/adminScreen';
import PadreScreen from './pages/padreScreen';
import ProfessorPage from './pages/professor/professorPage';
import ModalIncidente from "./components/professor/modalIncidente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/professor/incident/:studentId/:courseId" element={<ModalIncidente />} />
        <Route path="/padre" element={<PadreScreen />} />
      </Routes>

      {/* ToastContainer SIEMPRE debe ir fuera del Routes */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
