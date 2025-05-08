import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function WelcomePage() {
  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="content">
        <motion.div
          className="header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>PIXELPURANAS</h1>
          <p className="subtitle">Discover the rich tapestry of Indian history through interactive timelines and detailed narratives</p>
        </motion.div>

        <motion.div
          className="features"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="feature-card">
            <h3>Advanced references</h3>
            <p>Journey through centuries of Indian history with our interactive information</p>
          </div>
          <div className="feature-card">
            <h3>Detailed Narratives</h3>
            <p>Immerse yourself in comprehensive stories of significant events</p>
          </div>
          <div className="feature-card">
            <h3>Visual Gallery</h3>
            <p>Explore historical artifacts and monuments through our curated gallery</p>
          </div>
        </motion.div>

        <motion.div
          className="cta-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/slokas" className="cta-button">
            EXPLORE NOW
            <ArrowRight className="icon" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .welcome-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
        }

        .content {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .header {
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 4rem;
          font-weight: bold;
          color: #483D8B;
          margin-bottom: 1rem;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          letter-spacing: 2px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-card h3 {
          color: #8B4513;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        .cta-section {
          margin-top: 2rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: white;
          border-radius: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 3rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default WelcomePage; 