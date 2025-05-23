import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const tokenData = localStorage.getItem('authToken');
  if (!tokenData) return <Navigate to="/" replace />;

  try {
    const { exp } = JSON.parse(tokenData);
    if (Date.now() > exp) {
      localStorage.removeItem('authToken');
      return <Navigate to="/" replace />;
    }
  } catch {
    localStorage.removeItem('authToken');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
