import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminScreen from './pages/adminScreen';
import LegalRepresentativeRoutes from './pages/legalRepresentantive/routes';
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
        {LegalRepresentativeRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
