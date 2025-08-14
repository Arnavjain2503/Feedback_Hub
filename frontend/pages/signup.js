import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('feedback_giver');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
        role
      });
      const { token, user } = res.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
      }
      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/view-feedback');
      } else {
        router.push('/feedback');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'An error occurred during signup';
      setError(msg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>Sign Up</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* Role selection */}
          <div className={styles.field}>
            <label htmlFor="role" className={styles.label}>Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}
            >
              <option value="feedback_giver">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}