import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { MOCK_USER } from '../data/mockData';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email
  });
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage('Profile updated successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Account Profile</h1>

      <div className="grid grid-cols-2">
        <div className="card">
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              <User size={48} color="var(--accent-color)" />
            </div>
            <div>
              <h3>{profile.name}</h3>
              <p className="text-muted">{profile.email}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={profile.email}
                disabled
                title="Email cannot be changed"
              />
              <small className="text-muted" style={{ display: 'block', marginTop: '0.5rem' }}>
                Contact support to change your email address.
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">New Password (Optional)</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Leave blank to keep current password" 
              />
            </div>

            {message && (
              <div style={styles.successMessage}>
                {message}
              </div>
            )}

            <button type="submit" className="btn" style={{ width: '100%' }}>
              <Save size={18} />
              Save Changes
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Account Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <div>
                <p style={{ fontWeight: '500' }}>Email Notifications</p>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Receive daily market updates</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="flex-between">
              <div>
                <p style={{ fontWeight: '500' }}>Two-Factor Authentication</p>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Add an extra layer of security</p>
              </div>
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Enable</button>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem', marginTop: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--danger)' }}>
            Danger Zone
          </h3>
          <button className="btn btn-danger" style={{ width: '100%' }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid var(--border)',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(59, 130, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessage: {
    background: 'rgba(16, 185, 129, 0.1)',
    color: 'var(--success)',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  }
};

export default Profile;
