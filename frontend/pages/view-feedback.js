import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/ViewFeedback.module.css';

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verify authentication and role
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) {
        router.push('/login');
        return;
      }
      // Determine if user is admin
      setIsAdmin(role === 'admin');
      // Only fetch feedback if admin
      if (role === 'admin') {
        const fetchFeedback = async () => {
          try {
            const res = await axios.get('http://localhost:5000/api/feedback', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(res.data);
          } catch (err) {
            const msg = err.response?.data?.message || 'Failed to fetch feedback';
            setError(msg);
          }
        };
        fetchFeedback();
      }
    }
  }, [router]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedbacks(feedbacks.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const markReviewed = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/feedback/${id}`,
        { status: 'reviewed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedbacks(
        feedbacks.map((fb) => (fb._id === id ? { ...fb, status: res.data.status } : fb))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>All Feedback</h2>
        {error && <div className={styles.error}>{error}</div>}
        {/* Display a message if the user is not an admin */}
        {!isAdmin && (
          <p>You do not have permission to view this page.</p>
        )}
        {/* Show the feedback table only for admins */}
        {isAdmin && (
          <>
            {feedbacks.length === 0 ? (
              <p>No feedback submitted yet.</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Subject</th>
                    <th className={styles.th}>Tools &amp; Services</th>
                    <th className={styles.th}>Rating</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb) => (
                    <tr key={fb._id} className={styles.tr}>
                      <td className={styles.td}>{fb.customId || fb._id}</td>
                      <td className={styles.td}>{fb.name || '-'}</td>
                      <td className={styles.td}>{fb.email || fb.user?.email || '-'}</td>
                      <td className={styles.td}>{fb.subject || '-'}</td>
                      <td className={styles.td}>{fb.toolsServices || '-'}</td>
                      <td className={styles.td}>{fb.rating || '-'}</td>
                      <td className={styles.td}>{fb.category || '-'}</td>
                      <td className={styles.td}>{new Date(fb.createdAt).toLocaleString()}</td>
                      <td className={styles.td}>
                        <span className={fb.status === 'reviewed' ? styles.statusReviewed : styles.statusNew}>
                          {fb.status}
                        </span>
                      </td>
                      <td className={`${styles.td} ${styles.actions}`}>
                        <button
                          className={styles.reviewButton}
                          onClick={() => markReviewed(fb._id)}
                          disabled={fb.status === 'reviewed'}
                        >
                          Mark Reviewed
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(fb._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}