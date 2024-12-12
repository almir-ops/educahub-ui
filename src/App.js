import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import PostList from './components/PostList';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toolbar /> {/* Toolbar sempre renderizada */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PostList />} />
          {/* Outras rotas podem ser adicionadas */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
