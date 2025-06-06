import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminScreen from './pages/adminScreen';
import PadreScreen from './pages/padreScreen';
import ProfessorPage from './pages/professor/professorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/padre" element={<PadreScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
