import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { seventeenthEighteenthCenturyEvents } from '../data/seventeenthEighteenthCenturyEvents';
import PdfDownloadButton from './PdfDownloadButton';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';

function SeventeenthEighteenthCenturyPage() {
  const contentRef = useRef(null);

  return (
    <motion.div 
      className="seventeenth-eighteenth-century-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          className="header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/gallery" className="back-link">
            <ArrowLeft className="icon" />
            Back to Gallery
          </Link>
          <h1>17th & 18th Century Events</h1>
          <p className="subtitle">Explore the pivotal events that shaped India during the transition from Mughal rule to British dominance</p>
        </motion.div>

        <div className="content" ref={contentRef}>
          <div className="events-grid">
            {seventeenthEighteenthCenturyEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="image-container">
                  <img src={event.image} alt={event.title} />
                  <div className="overlay">
                    <Link to={`/event/${event.id}`} className="view-details">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="content">
                  <h2>{event.title}</h2>
                  <div className="meta">
                    <div className="meta-item">
                      <Clock className="icon" />
                      <span>{event.year}</span>
                    </div>
                    {event.location && (
                      <div className="meta-item">
                        <MapPin className="icon" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="description">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pdf-download-section">
          <PdfDownloadButton 
            contentRef={contentRef}
            filename="17th_18th_Century_Events.pdf"
          />
        </div>
      </div>

      <style jsx>{`
        .seventeenth-eighteenth-century-page {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          margin-bottom: 1rem;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #483D8B;
        }

        h1 {
          font-size: 2.5rem;
          color: #483D8B;
          margin-bottom: 1rem;
        }

        .subtitle {
          color: #666;
          font-size: 1.1rem;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .event-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          transition: opacity 0.3s ease;
        }

        .event-card:hover .overlay {
          opacity: 1;
        }

        .view-details {
          color: white;
          padding: 0.75rem 1.5rem;
          border: 2px solid white;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .view-details:hover {
          background: white;
          color: #8B4513;
        }

        .content {
          padding: 1.5rem;
        }

        h2 {
          font-size: 1.25rem;
          color: #483D8B;
          margin-bottom: 1rem;
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
        }

        .description {
          color: #666;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .pdf-download-section {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .pdf-download-section button {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pdf-download-section button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
        }

        .pdf-download-section button:active {
          transform: translateY(0);
        }
      `}</style>
    </motion.div>
  );
}

export default SeventeenthEighteenthCenturyPage; 