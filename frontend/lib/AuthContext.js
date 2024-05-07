'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from '@/actions/userActions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const session = await getSession();
      setIsLoggedIn(session.isLoggedIn);
    };

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
