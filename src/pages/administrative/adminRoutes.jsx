// src/pages/administrative/routes.jsx
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminDashboardLayout from '../../components/Admin/adminLayout';

import AdminScreen from './pages/adminScreen';
import CourseScreen from './pages/CourseScreen';

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
  </Route>
);

export default AdministrativeRoutes;
