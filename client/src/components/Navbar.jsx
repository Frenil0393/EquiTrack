import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Star, User, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <Link to="/dashboard" style={styles.brand}>
          <TrendingUp color="var(--success)" size={28} />
          <span>EquiTrack</span>
        </Link>

        <div style={styles.navLinks}>
          <NavLink to="/dashboard" icon={<LayoutDashboard size={18} />} active={isActive('/dashboard')}>
            Dashboard
          </NavLink>
          <NavLink to="/watchlist" icon={<Star size={18} />} active={isActive('/watchlist')}>
            Watchlist
          </NavLink>
          <NavLink to="/profile" icon={<User size={18} />} active={isActive('/profile')}>
            {user?.name?.split(' ')[0] || 'Profile'}
          </NavLink>

          <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, active, children }) => (
  <Link to={to} style={{ ...styles.link, color: active ? 'var(--accent-color)' : 'var(--text-muted)' }}>
    {icon}
    {children}
  </Link>
);

const styles = {
  navbar: {
    background: 'var(--bg-card)',
    borderBottom: '1px solid var(--border)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--danger)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
};

export default Navbar;