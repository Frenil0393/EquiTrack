import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Star, User, LogOut, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <Link to="/dashboard" style={styles.brand}>
          <TrendingUp color="var(--success)" size={28} />
          <span>EquiTrack</span>
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/dashboard" className={isActive('/dashboard')} style={styles.link}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/watchlist" className={isActive('/watchlist')} style={styles.link}>
            <Star size={18} />
            Watchlist
          </Link>
          <Link to="/profile" className={isActive('/profile')} style={styles.link}>
            <User size={18} />
            Profile
          </Link>
          <Link to="/login" style={{...styles.link, color: 'var(--danger)'}}>
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

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
  }
};

export default Navbar;
