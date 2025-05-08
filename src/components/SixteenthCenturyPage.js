import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Info } from 'lucide-react';
import { historicalEvents } from '../data/historicalEvents';
import PdfDownloadButton from './PdfDownloadButton';

function SixteenthCenturyPage() {
  const contentRef = useRef(null);
  const sixteenthCenturyEvents = Object.values(historicalEvents).filter(
    event => event.date.includes('15') || event.date.includes('16')
  );

  return (
    <motion.div 
      className="sixteenth-century-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="page-container">
        <div className="header-section">
          <Link to="/" className="back-link">
            <ArrowLeft className="icon" />
            Back to Home
          </Link>
          <div className="title-section">
            <h1>16th Century India</h1>
            <p className="subtitle">The Age of Mughal Empire and Cultural Renaissance</p>
          </div>
          <div className="download-section">
            <PdfDownloadButton contentRef={contentRef} fileName="16th-century-events.pdf" />
          </div>
        </div>

        <div ref={contentRef} className="timeline-container">
          <div className="timeline-line"></div>
          <div className="events-container">
            {sixteenthCenturyEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`event-card ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="event-content">
                  <div className="event-header">
                    <div className="event-title">
                      <h2>{event.title}</h2>
                      <div className="event-meta">
                        <span className="year">
                          <Clock className="meta-icon" />
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {event.images && event.images[0] && (
                    <div className="event-image">
                      <img src={event.images[0].url} alt={event.title} />
                    </div>
                  )}

                  <div className="event-details">
                    <p className="description">{event.description}</p>
                    <div className="key-points">
                      <h3>
                        <Info className="meta-icon" />
                        Key Points
                      </h3>
                      <ul>
                        {event.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="significance">
                      <h3>Historical Significance</h3>
                      <p>{event.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .sixteenth-century-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
            padding: 2rem;
            position: relative;
            overflow-x: hidden;
          }

          .page-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
          }

          .header-section {
            text-align: center;
            margin-bottom: 4rem;
            position: relative;
            z-index: 2;
          }

          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #8B4513;
            text-decoration: none;
            margin-bottom: 1rem;
            transition: color 0.3s;
            font-size: 1.1rem;
          }

          .back-link:hover {
            color: #483D8B;
          }

          .title-section {
            margin-top: 1rem;
          }

          .download-section {
            margin-top: 1rem;
          }

          h1 {
            font-size: 3.5rem;
            color: #483D8B;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .subtitle {
            font-size: 1.3rem;
            color: #8B4513;
            font-style: italic;
          }

          .timeline-container {
            position: relative;
            padding: 2rem 0;
          }

          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, #8B4513, #483D8B);
            transform: translateX(-50%);
            z-index: 1;
          }

          .events-container {
            position: relative;
            z-index: 2;
          }

          .event-card {
            width: 45%;
            margin-bottom: 4rem;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 69, 19, 0.1);
          }

          .event-card.left {
            margin-right: auto;
          }

          .event-card.right {
            margin-left: auto;
          }

          .event-content {
            padding: 2rem;
          }

          .event-header {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .event-title {
            flex: 1;
          }

          .event-title h2 {
            font-size: 1.8rem;
            color: #483D8B;
            margin-bottom: 0.5rem;
          }

          .event-meta {
            display: flex;
            gap: 1.5rem;
            color: #8B4513;
            font-size: 0.9rem;
          }

          .meta-icon {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
          }

          .event-image {
            width: 100%;
            height: 250px;
            border-radius: 15px;
            overflow: hidden;
            margin-bottom: 1.5rem;
          }

          .event-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }

          .event-card:hover .event-image img {
            transform: scale(1.05);
          }

          .event-details {
            color: #555;
          }

          .description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .key-points h3, .significance h3 {
            color: #483D8B;
            font-size: 1.3rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .key-points ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .key-points li {
            margin-bottom: 0.5rem;
          }

          .significance p {
            font-size: 1.1rem;
            line-height: 1.6;
          }
        `}
      </style>
    </motion.div>
  );
}

export default SixteenthCenturyPage; 