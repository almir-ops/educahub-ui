import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import PostList from './components/PostList';
import Toolbar from './components/Toolbar';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Modal from 'react-modal';

function App() {
  useEffect(() => {
    Modal.setAppElement('#root'); 
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toolbar />
        <Routes>
          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile} />} 
          />
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<PostList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
