import { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      onLogin();
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>🔐 Admin Login</h2>
            <p>Muscle Universe Gym</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="admin@muscleuniverse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Demo Credentials:</p>
            <p>Email: gymadmin@gmail.com</p>
            <p>Password: gymadmin321#</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
