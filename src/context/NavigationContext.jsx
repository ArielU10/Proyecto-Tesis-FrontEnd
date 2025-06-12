import { createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = ({ module = '', page = '' }) => {
    if (module === 'login') {
      navigate('/login');
      return;
    }

    const path = page ? `/${module}/${page}` : `/${module}`;
    navigate(path);
  };

  // Página actual
  const getCurrentPage = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    const module = segments[0] || '';
    const page = segments[1] || 'home';
    return { module, page };
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage: getCurrentPage(),
        navigate: handleNavigate
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
