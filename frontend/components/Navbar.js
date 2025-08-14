import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      setIsAuthenticated(!!token);
      setRole(storedRole);
    }
  }, [router.asPath]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setIsAuthenticated(false);
      setRole(null);
      router.push('/');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brandName}>FeedbackHub</span>
      </div>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/about" className={styles.link}>About</Link>
      
      {isAuthenticated && (
        <Link href="/feedback" className={styles.link}>Give Feedback</Link>
      )}
      {isAuthenticated && role === 'admin' && (
        <Link href="/view-feedback" className={styles.link}>All Feedback</Link>
      )}
      {isAuthenticated && (
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      )}
    </nav>
  );
}