import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import Loader from '../Loader/Loader.jsx'; // Assuming Loader component exists

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the intended path to redirect back after login
    // const currentPath = window.location.pathname + window.location.search;
    // return <Navigate to="/login" state={{ from: currentPath }} replace />;
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && user.role !== requiredRole) {
    // User is authenticated but does not have the required role
    // Redirect to an unauthorized page or home
    return <Navigate to="/unauthorized" replace />; // Or <Navigate to="/" replace />;
  }

  // If authenticated and authorized (or no specific role required), render the child routes/component
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
