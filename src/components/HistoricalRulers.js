import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { historicalRulers } from '../data/historicalRulers';
import { ChevronDown, ChevronUp, Crown } from 'lucide-react';

function HistoricalRulers() {
  const [expandedDynasty, setExpandedDynasty] = useState(null);

  return (
    <motion.div
      className="historical-rulers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rulers-container">
        <h2 className="section-title">
          <Crown className="icon" />
          Historical Rulers
        </h2>
        
        <div className="dynasties-grid">
          {historicalRulers.map((dynasty) => (
            <motion.div
              key={dynasty.id}
              className="dynasty-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <div className="dynasty-header">
                <img src={dynasty.image} alt={dynasty.title} className="dynasty-image" />
                <div className="dynasty-info">
                  <h3>{dynasty.title}</h3>
                  <p className="period">{dynasty.period}</p>
                  <p className="location">{dynasty.location}</p>
                </div>
                <button
                  className="expand-button"
                  onClick={() => setExpandedDynasty(expandedDynasty === dynasty.id ? null : dynasty.id)}
                >
                  {expandedDynasty === dynasty.id ? (
                    <ChevronUp className="icon" />
                  ) : (
                    <ChevronDown className="icon" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {expandedDynasty === dynasty.id && (
                  <motion.div
                    className="rulers-list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="description">{dynasty.description}</p>
                    <div className="rulers">
                      {dynasty.rulers.map((ruler, index) => (
                        <motion.div
                          key={index}
                          className="ruler-card"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h4>{ruler.name}</h4>
                          <p className="reign">{ruler.reign}</p>
                          <p className="achievements">{ruler.achievements}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .historical-rulers {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          margin: 2rem 0;
        }

        .rulers-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 2rem;
          color: #483D8B;
          margin-bottom: 2rem;
        }

        .icon {
          width: 2rem;
          height: 2rem;
        }

        .dynasties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .dynasty-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .dynasty-header {
          position: relative;
          height: 200px;
        }

        .dynasty-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dynasty-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
        }

        .dynasty-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .period, .location {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .expand-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .expand-button:hover {
          background: white;
          transform: scale(1.1);
        }

        .rulers-list {
          padding: 1.5rem;
          background: #f8f9fa;
        }

        .description {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .rulers {
          display: grid;
          gap: 1rem;
        }

        .ruler-card {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .ruler-card h4 {
          color: #8B4513;
          margin-bottom: 0.5rem;
        }

        .reign {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .achievements {
          font-size: 0.9rem;
          color: #483D8B;
        }

        @media (max-width: 768px) {
          .dynasties-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default HistoricalRulers; 