import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);

    setLoading(false);

    if (res.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.error || 'Login failed. Please try again.');
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={styles.errorBox}>{error}</div>
          )}

          <button
            type="submit"
            className="btn"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            <LogIn size={18} />
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-color)' }}>
            Register here
          </Link>
        </p>

        <p style={styles.hint}>
          Demo: any email + password (min 6 chars)
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
  },
  hint: {
    textAlign: 'center',
    marginTop: '0.75rem',
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    opacity: 0.7,
  },
  errorBox: {
    background: 'var(--danger-bg)',
    color: 'var(--danger)',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    fontSize: '0.875rem',
  },
};

export default Login;