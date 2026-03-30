import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

// A simple protected route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// A simple dashboard placeholder
function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }} className="flex-column">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="neo-box" 
        style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>
             Startup Evaluator
          </h1>
          <p style={{ fontWeight: '600' }}>Logged in as: {currentUser.email}</p>
        </div>
        <button onClick={logout} className="neo-btn" style={{ width: 'auto' }}>
          <LogOut size={20} /> Logout
        </button>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="neo-box" 
        style={{ padding: '40px', textAlign: 'center', backgroundColor: '#e6ebf5' }}
      >
        <LayoutDashboard size={48} style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Dashboard Coming Soon</h2>
        <p>The startup evaluator logic will be integrated right here.</p>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
