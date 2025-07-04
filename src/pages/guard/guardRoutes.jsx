// src/pages/guard/guardRoutes.jsx
import { Route } from 'react-router-dom';
import GuardHome from './guardHome';
import ScanQRPage from './ScanQRPage';
import ProtectedRoute from '../../components/ProtectedRoute';

const GuardRoutes = [
  <Route
    key="guard-home"
    path="/guard/home"
    element={
      <ProtectedRoute allowedRoles={['guard']}>
        <GuardHome />
      </ProtectedRoute>
    }
  />,
  <Route
    key="guard-scan"
    path="/guard/scan"
    element={
      <ProtectedRoute allowedRoles={['guard']}>
        <ScanQRPage />
      </ProtectedRoute>
    }
  />
];

export default GuardRoutes;
