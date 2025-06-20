// src/pages/administrative/routes.jsx
import { Route } from 'react-router-dom';
import AdminScreen from './pages/adminScreen';
import CourseScreen from './pages/CourseScreen';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdministrativeRoutes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={['administrative']}>
        <AdminScreen />
      </ProtectedRoute>
    }
  />,
  <Route
    key="courses"
    path="/admin/courses"
    element={
      <ProtectedRoute allowedRoles={['administrative']}>
        <CourseScreen />
      </ProtectedRoute>
    }
  />
];

export default AdministrativeRoutes;
