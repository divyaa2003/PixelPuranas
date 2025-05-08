import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Book, Sparkles, ChevronDown } from 'lucide-react';

const GalleryPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="gallery-container">
      <motion.div
        className="header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/" className="back-link">
          <ArrowLeft className="icon" />
          Back to Home
        </Link>
        <motion.h1 
          className="title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="sparkle-icon" />
          Sloka Gallery
          <Sparkles className="sparkle-icon" />
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover ancient Sanskrit verses and their profound meanings
        </motion.p>
      </motion.div>

      <motion.div 
        className="gallery-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="gallery-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <Link to="/slokas" className="gallery-link">
            <div className="image-container">
              <img src="/images/slokas.jpg" alt="Sloka Gallery" />
              <div className="overlay">
                <span>View Gallery</span>
              </div>
              <div className="floating-elements">
                <motion.div 
                  className="floating-element"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Book className="floating-icon" />
                </motion.div>
              </div>
            </div>
            <div className="event-info">
              <h2>Sloka Gallery</h2>
              <p>Discover ancient Sanskrit verses and their profound meanings</p>
              <div className="meta">
                <div className="meta-item">
                  <Clock className="icon" />
                  <span>Vedic Period</span>
                </div>
              </div>
              <motion.button 
                className="expand-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronDown className={`expand-icon ${isExpanded ? 'expanded' : ''}`} />
                Learn More
              </motion.button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    className="expanded-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Explore the rich collection of Sanskrit verses that have shaped Indian philosophy and culture for millennia. Each sloka carries profound wisdom and spiritual significance.</p>
                    <ul>
                      <li>Ancient Wisdom</li>
                      <li>Spiritual Insights</li>
                      <li>Cultural Heritage</li>
                      <li>Philosophical Teachings</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .gallery-container {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
          position: relative;
          overflow: hidden;
        }

        .gallery-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/pattern.png');
          opacity: 0.1;
          pointer-events: none;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .back-link:hover {
          color: #483D8B;
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-5px);
        }

        .title {
          font-size: 2.5rem;
          color: #483D8B;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .sparkle-icon {
          color: #FFD700;
          animation: sparkle 1.5s infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .subtitle {
          color: #666;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .gallery-item {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .gallery-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover .image-container img {
          transform: scale(1.1);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .gallery-item:hover .overlay {
          opacity: 1;
        }

        .overlay span {
          color: white;
          padding: 1rem 2rem;
          border: 2px solid white;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .gallery-item:hover .overlay span {
          background: white;
          color: #8B4513;
          transform: scale(1.1);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          color: white;
          opacity: 0.8;
        }

        .floating-icon {
          width: 2rem;
          height: 2rem;
        }

        .event-info {
          padding: 1.5rem;
          background: white;
        }

        h2 {
          font-size: 1.5rem;
          color: #483D8B;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 50px;
          height: 3px;
          background: #8B4513;
          transition: width 0.3s ease;
        }

        .gallery-item:hover h2::after {
          width: 100%;
        }

        p {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          background: rgba(139, 69, 19, 0.1);
          border-radius: 2rem;
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .expand-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #483D8B;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
        }

        .expand-button:hover {
          background: #8B4513;
        }

        .expand-icon {
          transition: transform 0.3s ease;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .expanded-content {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(139, 69, 19, 0.05);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .expanded-content p {
          margin-bottom: 1rem;
        }

        .expanded-content ul {
          list-style: none;
          padding: 0;
        }

        .expanded-content li {
          padding: 0.5rem 0;
          color: #666;
          position: relative;
          padding-left: 1.5rem;
        }

        .expanded-content li::before {
          content: '•';
          color: #8B4513;
          position: absolute;
          left: 0;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .image-container {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage; 