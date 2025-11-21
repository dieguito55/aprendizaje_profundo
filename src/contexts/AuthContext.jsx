import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Credenciales hardcodeadas
  const VALID_EMAIL = 'diego@gmail.com';
  const VALID_PASSWORD = '12345678';

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const savedAuth = localStorage.getItem('dermapp_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setUser(authData.user);
    }
  }, []);

  const login = (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const userData = {
        name: 'Diego',
        email: VALID_EMAIL,
        role: 'Dermatólogo'
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Guardar en localStorage
      localStorage.setItem('dermapp_auth', JSON.stringify({
        isAuthenticated: true,
        user: userData
      }));
      
      return { success: true };
    }
    
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('dermapp_auth');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
