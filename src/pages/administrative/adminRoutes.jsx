import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminDashboardLayout from '../../components/Admin/adminLayout';

import AdminScreen from './pages/adminScreen';
import CourseScreen from './pages/CourseScreen';
import UserScreen from './pages/userScreen';
import AsistenciasScreen from './pages/AsistenciasScreen';
import IncidentScreen from './pages/IndicentScreen';

const AdministrativeRoutes = (
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={['administrative']}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    }
  >
    {/* Ruta Home: /admin */}
    <Route index element={<AdminScreen />} />

    {/* Ruta Cursos: /admin/courses */}
    <Route path="courses" element={<CourseScreen />} />

    {/* Ruta Usuarios: /admin/users */}
    <Route path="users" element={<UserScreen />} />

    {/* Nueva Ruta Asistencias: /admin/asistencias */}
    <Route path="asistencias" element={<AsistenciasScreen />} />

    {/* Nueva Ruta incidentes: /admin/incidents */}
    <Route path="incidents" element={<IncidentScreen />} />
  </Route>
);

export default AdministrativeRoutes;
