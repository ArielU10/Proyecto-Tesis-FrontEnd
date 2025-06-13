import { Route, Routes } from 'react-router-dom';
import { NavigationProvider } from '../../context/NavigationContext';
import LegalRepresentativeLayout from '../../components/legalRepresentative/LegalRepresentativeLayout';
import LegalRepresentativeHomepage from './pages/legalRepresentantiveHome';
import GenerateQRPage from './pages/GenerateQr';
import StudentAssistancePage from './pages/StudentAssistance';
import StudentIncidentsPage from './pages/StudentIncidents';
import ProtectedRoute from '../../components/ProtectedRoute';

const LegalRepresentativeRoutes = [
  <Route
    key="layout"
    path="/legal-representantive"
    element={
      <ProtectedRoute allowedRoles={['legalRepresentative']}>
        <NavigationProvider>
          <LegalRepresentativeLayout />
        </NavigationProvider>
      </ProtectedRoute>
    }
  >
    <Route index element={<LegalRepresentativeHomepage />} />
    <Route path="generate-qr" element={<GenerateQRPage />} />
    <Route path="student/:student_id/assistance" element={<StudentAssistancePage />} />
    <Route path="student/:student_id/incidents" element={<StudentIncidentsPage />} />
  </Route>
];

export default LegalRepresentativeRoutes;