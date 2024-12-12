// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Inicialmente, o usuário não está logado

  const login = (token) => {
    setAuth(token); // Armazena o token ao logar
    localStorage.setItem('authToken', token); // Salva no localStorage
  };

  const logout = () => {
    setAuth(null); // Remove o token
    localStorage.removeItem('authToken'); // Remove do localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
