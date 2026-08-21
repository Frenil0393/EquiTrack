import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock register action
    navigate('/login');
  };

  return (
    <div className="flex-center" style={{ minHeight: '80vh' }}>
      <div className="card" style={styles.registerCard}>
        <div style={styles.header}>
          <h2>Create Account</h2>
          <p className="text-muted">Join EquiTrack to track your portfolio</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="john@example.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Create a password" 
              required 
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            <UserPlus size={18} />
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  registerCard: {
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

export default Register;
