// ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth, checkAuthentication } from './auth';

const ProtectedRoute = ({ element, ...rest }) => {
  const auth = useAuth();

  const isAuthenticated = checkAuthentication();

  if (isAuthenticated || auth.authenticated) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default ProtectedRoute;
