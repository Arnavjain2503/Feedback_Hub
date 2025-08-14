import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Page.module.css';
import aboutStyles from '../styles/AboutPage.module.css';

export default function About() {
  return (
    <div>
      <Navbar />
      {/* Hero section */}
      <div className={aboutStyles.hero}>
        <div className={aboutStyles.heroOverlay}></div>
        <div className={aboutStyles.heroContent}>
          <h1>About FeedbackHub</h1>
          <p>Empowering you to listen, learn and improve through better feedback.</p>
        </div>
      </div>
      {/* Content sections */}
      <div className={aboutStyles.section}>
        <h3>Who We Are</h3>
        <p>
          FeedbackHub is built by a team of developers passionate about enabling
          organisations to hear the voices of their users. We believe that
          honest feedback is the cornerstone of continuous improvement.
        </p>
        <p>
          Our mission is to provide a simple, secure and user‑friendly platform
          for collecting and managing feedback, so that every suggestion is
          heard and every issue is addressed.
        </p>
      </div>
      <div className={aboutStyles.section}>
        <h3>What We Do</h3>
        <p>
          The FeedbackHub platform streamlines the process of gathering insights
          from your customers or team. Users can quickly submit their
          thoughts using our intuitive form, while administrators gain a
          comprehensive overview of all submissions, complete with filtering
          tools and status management.
        </p>
        <p>
          Built on modern web technologies, FeedbackHub ensures a seamless and
          secure experience for both contributors and managers.
        </p>
      </div>
      <div className={aboutStyles.section}>
        <h3>Get in Touch</h3>
        <p>
          We’re always interested in hearing how we can make FeedbackHub better.
          If you have questions, suggestions or would like a demo, please reach
          out to us at <a href="mailto:hello@feedbackhub.com">hello@feedbackhub.com</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}