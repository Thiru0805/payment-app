import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); 
  };


  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Thisa</h1>
        <p>Send, receive, and manage payments with ease.</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Fast Payments</h3>
          <p>Instant transactions with secure gateways.</p>
        </div>
        <div className="feature-card">
          <h3>Secure & Reliable</h3>
          <p>End-to-end encryption ensures your data stays safe.</p>
        </div>
        <div className="feature-card">
          <h3>Simple Integration</h3>
          <p>Developer-friendly API with clear documentation.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
