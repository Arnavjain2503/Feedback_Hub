export default function Footer() {
  return (
    <footer style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #ddd', textAlign: 'center', color: '#6b7280', backgroundColor: '#f8fafc' }}>
      <p>&copy; {new Date().getFullYear()} FeedbackHub</p>
    </footer>
  );
}