import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from 'protected-route-react';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import SideBarMenu from './Components/SideBarMenu';
import Blogs from './Components/Blogs';
import Finances from './Components/Finances';
import Pitches from './Components/Pitches';
import { useSelector } from 'react-redux';

const App = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {isAuthenticated && (
          <SideBarMenu onCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
        )}
        <div style={{
          flexGrow: 1,
          transition: 'margin-left 0.3s ease',
        }}>
          <Routes>
            <Route path="/login" element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/blogs">
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/blogs" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Blogs />
              </ProtectedRoute>
            } />
            <Route path="/finances" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Finances />
              </ProtectedRoute>
            } />
            <Route path="/pitches" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Pitches />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;