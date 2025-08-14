import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Feedback.module.css';

export default function Feedback() {
  // State for each form field. We generate a custom ID when the component mounts.
  const [customId, setCustomId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [toolsServices, setToolsServices] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Generate a unique ID when the component first mounts
  useEffect(() => {
    const generateId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    };
    setCustomId(generateId());
  }, []);

  // Redirect users based on authentication and role
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) {
        router.push('/login');
      }
    }
  }, [router]);

  // Submit the feedback to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Basic validation: ensure required fields are populated
    if (!name.trim() || !email.trim() || !content.trim()) {
      setError('Name, email and feedback are required');
      return;
    }
    if (!customId.trim()) {
      setError('Feedback ID is missing');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        customId,
        name,
        email,
        subject,
        toolsServices,
        content,
        rating,
        category
      };
      await axios.post('http://localhost:5000/api/feedback', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Feedback submitted successfully');
      // Clear fields except ID (generate a new one)
      setName('');
      setEmail('');
      setSubject('');
      setToolsServices('');
      setContent('');
      setRating('');
      setCategory('');
      setCustomId(Date.now().toString(36) + Math.random().toString(36).substr(2, 5));
    } catch (err) {
      const msg = err.response?.data?.message || 'An error occurred';
      setError(msg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2>Submit Feedback</h2>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit}>
          {/* Hidden field showing the generated custom ID */}
          <div className={styles.field}>
            <label className={styles.label}>Feedback ID</label>
            <input
              type="text"
              value={customId}
              readOnly
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your name"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.input}
              placeholder="Subject (optional)"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="toolsServices" className={styles.label}>Tools &amp; Services</label>
            <input
              type="text"
              id="toolsServices"
              value={toolsServices}
              onChange={(e) => setToolsServices(e.target.value)}
              className={styles.input}
              placeholder="List tools/services used"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="rating" className={styles.label}>Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={styles.select}
            >
              <option value="">Select rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="category" className={styles.label}>Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="">Select category</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature Request</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="content" className={styles.label}>Feedback</label>
            <textarea
              id="content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              placeholder="Enter your feedback here..."
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}