import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { NavigationProvider } from '@/context/NavigationContext';

import GuardLayout from '@/components/guard/guardLayout';
import GuardsApp from './pages/Main';
import GuardQRPage from './pages/GuardQRPage';

const GuardRoutes = [
  <Route
    key="guard-layout"
    path="/guardias"
    element={
      <ProtectedRoute allowedRoles={['guard']}>
        <NavigationProvider>
          <GuardLayout />
        </NavigationProvider>
      </ProtectedRoute>
    }
  >
    <Route index element={<GuardsApp />} />
  </Route>,

  <Route
    key="guard-qr"
    path="/guardias/validar/:token"
    element={<GuardQRPage />}
  />
];

export default GuardRoutes;
