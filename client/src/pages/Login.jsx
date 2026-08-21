import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login action
    navigate('/dashboard');
  };

  return (
    <div className="flex-center" style={{ minHeight: '80vh' }}>
      <div className="card" style={styles.loginCard}>
        <div style={styles.header}>
          <h2>Welcome Back</h2>
          <p className="text-muted">Log in to your EquiTrack account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Enter your email" 
              defaultValue="test@example.com"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter your password" 
              defaultValue="password123"
              required 
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            <LogIn size={18} />
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '2.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
  }
};

export default Login;
