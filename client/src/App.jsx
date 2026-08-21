import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StockDetails from './pages/StockDetails';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';

function App() {
  // Simple mock authentication state
  const isAuthenticated = true;

  return (
    <Router>
      <div className="page-layout">
        {isAuthenticated && <Navbar />}
        
        <main className="main-content container animate-fade-in">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes (mocked) */}
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/stock/:symbol" 
              element={isAuthenticated ? <StockDetails /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/watchlist" 
              element={isAuthenticated ? <Watchlist /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
            />
            
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
