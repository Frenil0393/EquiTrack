import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <p style={styles.text}>© 2026 EquiTrack Prototype. Developed by Frenil Vaghasia.</p>
        <p style={styles.subtext}>For educational purposes only. Not financial advice.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'var(--bg-card)',
    borderTop: '1px solid var(--border)',
    padding: '2rem 0',
    marginTop: 'auto',
  },
  container: {
    textAlign: 'center',
  },
  text: {
    color: 'var(--text-muted)',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  subtext: {
    color: 'var(--border)',
    fontSize: '0.875rem',
  }
};

export default Footer;
