import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthProvider = () => {

    const { isAuthenticated } = useSelector((state) => state.user);

  return (
    isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
  )
}

export default AuthProvider