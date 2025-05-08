import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { historicalEvents } from '../data/historicalEvents';
import { indianHistoricalEvents } from '../data/indianHistoricalEvents';
import { sixteenthCenturyEvents } from '../data/sixteenthCenturyEvents';
import { seventeenthEighteenthCenturyEvents } from '../data/seventeenthEighteenthCenturyEvents';
import { twentiethTwentyFirstCenturyEvents } from '../data/twentiethTwentyFirstCenturyEvents';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, MapPin, BookOpen, Globe, Video } from 'lucide-react';
import PdfDownloadButton from './PdfDownloadButton';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const contentRef = useRef(null);

  // Combine all event sources
  const allEvents = {
    ...historicalEvents,
    ...indianHistoricalEvents,
    ...sixteenthCenturyEvents.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {}),
    ...seventeenthEighteenthCenturyEvents.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {}),
    ...twentiethTwentyFirstCenturyEvents.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {})
  };

  const event = allEvents[id];

  if (!event) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Event Not Found</h1>
          <motion.button
            onClick={() => navigate('/gallery')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Gallery
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const handleNextImage = () => {
    if (event.images && event.images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % event.images.length);
    }
  };

  const handlePreviousImage = () => {
    if (event.images && event.images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
    }
  };

  return (
    <motion.div 
      className="details-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <Link to="/gallery" className="back-link">
          <ArrowLeft className="icon" />
          Back to Gallery
        </Link>

        <div className="content-grid">
          <motion.div
            className="image-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="image-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={event.images?.[activeImageIndex]?.url || event.image}
                  alt={event.title}
                  className="event-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              <div className="image-overlay">
                <h1 className="title">{event.title}</h1>
                <div className="meta-info">
                  <div className="meta-item">
                    <Clock className="icon" />
                    <span>{event.date || event.year}</span>
                  </div>
                  {event.location && (
                    <div className="meta-item">
                      <MapPin className="icon" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {event.images && event.images.length > 1 && (
                <div className="image-controls">
                  <button
                    onClick={handlePreviousImage}
                    className="control-button"
                  >
                    <ChevronLeft className="icon" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="control-button"
                  >
                    <ChevronRight className="icon" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="details-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            ref={contentRef}
          >
            <div className="details-card">
              <div className="section">
                <h2 className="section-title">Event Description</h2>
                <p className="description">{event.description}</p>
              </div>

              {event.details && (
                <div className="section">
                  <h2 className="section-title">
                    <BookOpen className="icon" />
                    Key Details
                  </h2>
                  <ul className="details-list">
                    {event.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="detail-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <span className="bullet">•</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {event.significance && (
                <div className="section">
                  <h2 className="section-title">Historical Significance</h2>
                  <p className="description">{event.significance}</p>
                </div>
              )}

              {event.videoLinks && event.videoLinks.length > 0 && (
                <div className="section">
                  <h2 className="section-title">
                    <Video className="icon" />
                    Related Videos
                  </h2>
                  <div className="video-links">
                    {event.videoLinks.map((video, index) => (
                      <motion.a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-source">Watch on YouTube</p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {event.impact && (
                <div className="section">
                  <h2 className="section-title">
                    <Globe className="icon" />
                    Historical Impact
                  </h2>
                  <p className="description">{event.impact}</p>
                </div>
              )}
            </div>
            <div className="pdf-download-section">
              <PdfDownloadButton 
                contentRef={contentRef}
                filename={`${event.title.replace(/\s+/g, '_')}_details.pdf`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .details-page {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          margin-bottom: 2rem;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #483D8B;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .image-section {
          position: relative;
        }

        .image-container {
          position: relative;
          height: 400px;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .meta-info {
          display: flex;
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .image-controls {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .control-button {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          padding: 0.5rem;
          transition: background-color 0.3s;
        }

        .control-button:hover {
          background: white;
        }

        .details-section {
          position: relative;
        }

        .details-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          color: #483D8B;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .description {
          color: #666;
          line-height: 1.6;
        }

        .details-list {
          list-style: none;
          padding: 0;
        }

        .detail-item {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #666;
        }

        .bullet {
          color: #8B4513;
        }

        .video-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .video-link {
          padding: 1rem;
          background: rgba(245, 245, 220, 0.5);
          border-radius: 0.5rem;
          transition: background-color 0.3s;
        }

        .video-link:hover {
          background: rgba(245, 245, 220, 0.8);
        }

        .video-title {
          font-weight: 500;
          color: #483D8B;
          margin-bottom: 0.25rem;
        }

        .video-source {
          font-size: 0.875rem;
          color: #666;
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

export default DetailsPage; 