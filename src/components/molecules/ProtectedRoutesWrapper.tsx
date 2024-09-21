import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutesWrapper: React.FC = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesWrapper;
