import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allHistoricalEvents } from '../data/allHistoricalEvents';
import PdfDownloadButton from './PdfDownloadButton';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';

function HistoricalTimeline() {
  const contentRef = useRef(null);

  // Sort events by year (converting BCE years to negative numbers for proper sorting)
  const sortedEvents = [...allHistoricalEvents].sort((a, b) => {
    const getYear = (yearStr) => {
      if (yearStr.includes('BCE')) {
        return -parseInt(yearStr.split(' ')[0]);
      }
      return parseInt(yearStr.split(' ')[0]);
    };
    return getYear(a.year.split('-')[0]) - getYear(b.year.split('-')[0]);
  });

  return (
    <motion.div 
      className="timeline-container"
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
          <h1>Historical Timeline</h1>
          <p className="subtitle">Explore the complete history of India from ancient times to the present day</p>
        </motion.div>

        <div className="content" ref={contentRef}>
          <div className="timeline">
            {sortedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="timeline-content">
                  <div className="image-container">
                    <img src={event.image} alt={event.title} />
                    <div className="overlay">
                      <Link to={`/event/${event.id}`} className="view-details">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="event-info">
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
                    {event.videoLinks && event.videoLinks.length > 0 && (
                      <div className="video-links">
                        {event.videoLinks.map((video, index) => (
                          <a
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-link"
                          >
                            {video.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pdf-download-section">
          <PdfDownloadButton 
            contentRef={contentRef}
            filename="Historical_Timeline.pdf"
          />
        </div>
      </div>

      <style jsx>{`
        .timeline-container {
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

        .timeline {
          position: relative;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          background: #8B4513;
          transform: translateX(-50%);
        }

        .timeline-item {
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-content {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-5px);
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

        .timeline-content:hover .overlay {
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

        .event-info {
          padding: 1.5rem;
        }

        h2 {
          font-size: 1.5rem;
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
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .video-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .video-link {
          color: #8B4513;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }

        .video-link:hover {
          color: #483D8B;
          text-decoration: underline;
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

        @media (max-width: 768px) {
          .timeline::before {
            left: 0;
          }

          .timeline-item {
            margin-left: 2rem;
          }

          h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .image-container {
            height: 200px;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default HistoricalTimeline; 