import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Welcome to FeedbackHub</h1>
          <p>Your trusted platform for gathering and managing feedback.</p>
          <div className={styles.actions}>
            <Link href="/login" className={styles.button}>Login</Link>
            <Link href="/signup" className={styles.button}>Sign Up</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
