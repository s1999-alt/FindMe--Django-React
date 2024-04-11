// auth.js

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { UserAxios } from '../axios_instance/Axios_instance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await UserAxios.post('api/v1/admin/login/', { email, password });
      setAuthenticated(true);
      // You can store the token in localStorage or a cookie if needed
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await UserAxios.post('api/v1/admin/logout/');
      setAuthenticated(false);
      // Clear the token from localStorage or a cookie if needed
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = {
    authenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const checkAuthentication = async () => {
  try {
    const response = await UserAxios.get('api/v1/admin/check-authentication/');
    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
