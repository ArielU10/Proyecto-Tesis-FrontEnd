import { Route, Routes } from 'react-router-dom';
import { NavigationProvider } from '../../context/NavigationContext';
import LegalRepresentativeLayout from '../../components/legalRepresentative/LegalRepresentativeLayout';
import LegalRepresentativeHomepage from './pages/legalRepresentantiveHome';
import GenerateQRPage from './pages/GenerateQr';
import StudentAssistancePage from './pages/StudentAssistance';
import StudentIncidentsPage from './pages/StudentIncidents';

const LegalRepresentativeRoutes = () => (
  <Route
    path="/legal-representantive/*"
    element={
      <NavigationProvider>
        <LegalRepresentativeLayout>
          <Routes>
            <Route path="" element={<LegalRepresentativeHomepage />} />
            <Route path="generate-qr" element={<GenerateQRPage />} />
            <Route path="student/:student_id/assistance" element={<StudentAssistancePage />} />
            <Route path="student/:student_id/incidents" element={<StudentIncidentsPage />} />
          </Routes>
        </LegalRepresentativeLayout>
      </NavigationProvider>
    }
  />
);

export default LegalRepresentativeRoutes;