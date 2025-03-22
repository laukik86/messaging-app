// File: src/App.jsx
import React from 'react';
import HomePage from './components/HomePage';
import Login from './AuthForm';
import { Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><Login /></div>} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

/* Additional custom styles can go here */
