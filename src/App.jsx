import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminScreen from './pages/adminScreen';
import ProfesorScreen from './pages/profesorScreen';
import PadreScreen from './pages/padreScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/profesor" element={<ProfesorScreen />} />
        <Route path="/padre" element={<PadreScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
