import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, MapPin, Calendar, Info } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { historicalEvents } from '../data/historicalEvents';
import { indianHistoricalEvents } from '../data/indianHistoricalEvents';
import { sixteenthCenturyEvents } from '../data/sixteenthCenturyEvents';
import { historicalRulers } from '../data/historicalRulers';
import { nineteenthTwentiethCenturyEvents } from '../data/nineteenthTwentiethCenturyEvents';

function EventDetails() {
  const { id } = useParams();

  // Combine all events and rulers
  const allEvents = [
    ...Object.entries(historicalEvents).map(([key, event]) => ({
      id: key,
      ...event
    })),
    ...Object.entries(indianHistoricalEvents).map(([key, event]) => ({
      id: key,
      ...event,
      country: 'India'
    })),
    ...sixteenthCenturyEvents.map(event => ({
      ...event,
      country: 'India',
      century: '16th'
    })),
    ...nineteenthTwentiethCenturyEvents,
    ...historicalRulers.map(ruler => ({
      id: `ruler-${ruler.id}`,
      ...ruler,
      isRuler: true
    }))
  ];

  const event = allEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="event-details">
        <div className="container">
          <div className="not-found">
            <h2>Event not found</h2>
            <p>The event you're looking for doesn't exist.</p>
            <Link to="/" className="back-button">
              <ArrowLeft className="icon" />
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="event-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft className="icon" />
          Back to Gallery
        </Link>

        <div className="content">
          <div className="header">
            <div className="image-container">
              <img 
                src={event.images?.[0]?.url || event.image} 
                alt={event.title} 
                className="main-image"
              />
            </div>
            <div className="title-section">
              <h1>
                {event.isRuler && <Crown className="icon" />}
                {event.title}
              </h1>
              {event.isRuler && <h2>{event.title}</h2>}
              <div className="meta-info">
                <div className="meta-item">
                  <Calendar className="icon" />
                  <span>{event.date || event.year || event.reign}</span>
                </div>
                {event.location && (
                  <div className="meta-item">
                    <MapPin className="icon" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="details-content">
            <div className="description">
              <h3>
                <Info className="icon" />
                Overview
              </h3>
              <p>{event.description}</p>
            </div>

            {event.isRuler ? (
              <>
                <div className="achievements">
                  <h3>Key Achievements</h3>
                  <ul>
                    {event.achievements.map((achievement, idx) => (
                      <li key={idx}>
                        <span className="bullet">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="historical-impact">
                  <div className="significance">
                    <h3>Historical Significance</h3>
                    <p>{event.significance}</p>
                  </div>
                  <div className="legacy">
                    <h3>Legacy</h3>
                    <p>{event.legacy}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="additional-info">
                {event.significance && (
                  <div className="significance">
                    <h3>Significance</h3>
                    <p>{event.significance}</p>
                  </div>
                )}
                {event.impact && (
                  <div className="impact">
                    <h3>Impact</h3>
                    <p>{event.impact}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-details {
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
          text-decoration: none;
          margin-bottom: 2rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #483D8B;
        }

        .content {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .header {
          position: relative;
        }

        .image-container {
          width: 100%;
          height: 400px;
          overflow: hidden;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .title-section {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        h2 {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .meta-info {
          display: flex;
          gap: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
        }

        .details-content {
          padding: 2rem;
        }

        .description, .achievements, .historical-impact, .additional-info {
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.5rem;
          color: #8B4513;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        p {
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .achievements ul {
          list-style: none;
          padding: 0;
        }

        .achievements li {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #483D8B;
          line-height: 1.5;
        }

        .bullet {
          color: #8B4513;
          font-size: 1.2rem;
        }

        .historical-impact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .not-found {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .not-found h2 {
          color: #8B4513;
          margin-bottom: 1rem;
        }

        .not-found p {
          color: #666;
          margin-bottom: 2rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #8B4513;
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: background 0.3s;
        }

        .back-button:hover {
          background: #483D8B;
        }

        @media (max-width: 768px) {
          .image-container {
            height: 300px;
          }

          h1 {
            font-size: 2rem;
          }

          .historical-impact {
            grid-template-columns: 1fr;
          }

          .meta-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default EventDetails; 