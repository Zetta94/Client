import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

const ProtectedRoute: React.FC = () => {
  const auth = useSelector(selectAuth);
  const isAuthenticated = !!auth.userProfile;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
