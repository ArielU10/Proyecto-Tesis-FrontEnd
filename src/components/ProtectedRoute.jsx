import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  console.log('Usuario en ProtectedRoute:', user);


  if (!user) return <Navigate to="/" />;
  
  if (!user || !allowedRoles?.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;