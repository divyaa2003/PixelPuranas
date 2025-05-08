import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        <h1>About Historical Events Explorer</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Historical Events Explorer is dedicated to making history accessible, engaging, and educational
            for everyone. We believe that understanding our past is crucial for navigating our present and
            shaping our future.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>📚 Comprehensive Timeline</h3>
              <p>
                Explore historical events through an interactive timeline that spans from ancient
                civilizations to modern times.
              </p>
            </div>
            <div className="feature">
              <h3>🔍 Categorized Content</h3>
              <p>
                Browse events by categories such as politics, culture, science, and more to find
                exactly what interests you.
              </p>
            </div>
            <div className="feature">
              <h3>🎨 Rich Media</h3>
              <p>
                Experience history through high-quality images, detailed descriptions, and engaging
                narratives.
              </p>
            </div>
            <div className="feature">
              <h3>📱 Mobile Friendly</h3>
              <p>
                Access our content seamlessly across all devices, whether you're on a desktop,
                tablet, or mobile phone.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Commitment</h2>
          <p>
            We are committed to providing accurate, well-researched historical information while
            maintaining an engaging and user-friendly platform. Our content is regularly reviewed
            and updated to ensure the highest standards of historical accuracy.
          </p>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .about-content {
          background: white;
          padding: 3rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 3rem;
        }

        .about-section {
          margin-bottom: 3rem;
        }

        h2 {
          color: #2c3e50;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }

        p {
          color: #666;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .feature {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
        }

        .feature h3 {
          color: #e67e22;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .feature p {
          font-size: 1rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .about-page {
            padding: 1rem;
          }

          .about-content {
            padding: 2rem;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AboutPage; 