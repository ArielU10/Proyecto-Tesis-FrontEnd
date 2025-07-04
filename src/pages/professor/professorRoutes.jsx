import { Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import ProfessorPage from "./professorPage";

const ProfessorRoutes = [
  <Route
    key="professor"
    path="/professor"
    element={
      <ProtectedRoute allowedRoles={["professor"]}>
        <ProfessorPage />
      </ProtectedRoute>
    }
  />
];

export default ProfessorRoutes;
