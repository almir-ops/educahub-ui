// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth !== null) {
      setLoading(false); 
    }
  }, [auth]);

  if (loading) {
    
    return <div>Loading...</div>; 
  }

  return auth ? (
    <Component /> 
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
