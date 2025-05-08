import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowLeft, ArrowRight, Clock, Crown } from 'lucide-react';
import { historicalEvents } from '../data/historicalEvents';
import { indianHistoricalEvents } from '../data/indianHistoricalEvents';
import { sixteenthCenturyEvents } from '../data/sixteenthCenturyEvents';
import { historicalRulers } from '../data/historicalRulers';
import { nineteenthTwentiethCenturyEvents } from '../data/nineteenthTwentiethCenturyEvents';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';

function SlokaGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showIndianEvents, setShowIndianEvents] = useState(false);
  const [show16thCentury, setShow16thCentury] = useState(false);
  const [showModernEra, setShowModernEra] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDynasty, setExpandedDynasty] = useState(null);
  const eventsPerPage = 6;

  // Convert the historicalEvents object to an array and add IDs
  const eventsArray = Object.entries(historicalEvents).map(([key, event]) => ({
    id: key,
    ...event
  }));

  // Convert the indianHistoricalEvents object to an array and add IDs
  const indianEventsArray = Object.entries(indianHistoricalEvents).map(([key, event]) => ({
    id: key,
    ...event,
    country: 'India'
  }));

  // Add 16th century events with proper formatting
  const formatted16thCenturyEvents = sixteenthCenturyEvents.map(event => ({
    ...event,
    country: 'India',
    century: '16th'
  }));

  // Format historical rulers as events with additional styling
  const rulersAsEvents = historicalRulers.map(ruler => ({
    id: `ruler-${ruler.id}`,
    title: ruler.name,
    date: ruler.reign,
    description: ruler.description,
    image: ruler.image,
    location: ruler.location,
    isRuler: true,
    achievements: ruler.achievements,
    significance: ruler.significance,
    legacy: ruler.legacy,
    title: ruler.title
  }));

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to first page when searching
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Combine events based on filters
  const allEvents = show16thCentury 
    ? formatted16thCenturyEvents 
    : showModernEra
      ? nineteenthTwentiethCenturyEvents
      : showIndianEvents 
        ? [...indianEventsArray, ...rulersAsEvents]
        : [...eventsArray, ...rulersAsEvents];

  const filteredEvents = allEvents
    .filter(event => {
      if (!searchQuery.trim()) return true;
      
      const searchTerms = searchQuery.toLowerCase().trim().split(' ');
      
      // Create a searchable text that includes all relevant fields
      const searchableText = [
        event.title,
        event.description,
        event.location,
        event.date || event.year,
        event.isRuler ? event.achievements?.join(' ') : '',
        event.isRuler ? event.significance : '',
        event.isRuler ? event.legacy : ''
      ].join(' ').toLowerCase();

      // Check if all search terms are present in the searchable text
      return searchTerms.every(term => searchableText.includes(term));
    });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <motion.div 
      className="sloka-gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="header">
          <motion.div
            className="title-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="back-link">
              <ArrowLeft className="icon" />
            </Link>
            <h1>
              {show16thCentury 
                ? '16th Century Indian Events' 
                : showModernEra
                  ? '19th & 20th Century Events'
                  : showIndianEvents 
                    ? 'Indian Historical Events' 
                    : 'Historical Events'}
            </h1>
          </motion.div>

          <div className="controls">
            <motion.div
              className="search-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, location, year, or achievements..."
                defaultValue={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
                autoFocus
              />
              {searchQuery && (
                <motion.button
                  className="clear-search"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              )}
            </motion.div>

            <div className="filter-buttons">
              <motion.button
                onClick={() => {
                  setShow16thCentury(false);
                  setShowModernEra(false);
                  setShowIndianEvents(!showIndianEvents);
                }}
                className={`filter-button ${showIndianEvents && !show16thCentury && !showModernEra ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Filter className="icon" />
                {showIndianEvents && !show16thCentury && !showModernEra ? 'Show All Events' : 'Show Indian Events'}
              </motion.button>

              <motion.button
                onClick={() => {
                  setShowIndianEvents(false);
                  setShowModernEra(false);
                  setShow16thCentury(!show16thCentury);
                }}
                className={`filter-button ${show16thCentury ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Clock className="icon" />
                {show16thCentury ? 'Show All Events' : 'Show 16th Century'}
              </motion.button>

              <motion.button
                onClick={() => {
                  setShowIndianEvents(false);
                  setShow16thCentury(false);
                  setShowModernEra(!showModernEra);
                }}
                className={`filter-button ${showModernEra ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Clock className="icon" />
                {showModernEra ? 'Show All Events' : 'Show Modern Era'}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${searchQuery}`}
            className="events-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <Link 
                  to={`/details/${event.id}`} 
                  key={event.id}
                  className="event-link"
                >
                  <motion.div
                    className={`event-card ${event.isRuler ? 'ruler-card' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}
                  >
                    <div className="image-container">
                      <img
                        src={event.images?.[0]?.url || event.image}
                        alt={event.title}
                        className="event-image"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <h2>
                          {event.isRuler ? <Crown className="icon" /> : null}
                          {event.title}
                        </h2>
                        <p>{event.date || event.year}</p>
                        {event.location && <p className="location">{event.location}</p>}
                      </div>
                    </div>
                    <div className="card-content">
                      <p>{event.description}</p>
                      {event.isRuler ? (
                        <Link
                          to={`/details/${event.id}`}
                          className="learn-more"
                        >
                          Learn More
                          <ArrowRight className="icon" />
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p>No results found for "{searchQuery}"</p>
                <p className="suggestion">Try different keywords or check your spelling</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <motion.div
            className="pagination"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="page-button"
            >
              <ArrowLeft className="icon" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="page-button"
            >
              <ArrowRight className="icon" />
            </button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .sloka-gallery {
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-link {
          color: #8B4513;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #483D8B;
        }

        h1 {
          font-size: 1.875rem;
          font-weight: bold;
          color: #483D8B;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        @media (min-width: 768px) {
          .controls {
            flex-direction: row;
            width: auto;
          }
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .search-container {
          position: relative;
          width: 100%;
        }

        @media (min-width: 768px) {
          .search-container {
            width: 24rem;
          }
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #8B4513;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(139, 69, 19, 0.2);
          color: #483D8B;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #8B4513;
          box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
          background: rgba(255, 255, 255, 0.95);
        }

        .clear-search {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #8B4513;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
        }

        .clear-search:hover {
          background: rgba(139, 69, 19, 0.1);
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          background: rgba(139, 69, 19, 0.1);
          color: #8B4513;
          border: 1px solid rgba(139, 69, 19, 0.2);
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-button.active {
          background: rgba(139, 69, 19, 0.2);
          border-color: #8B4513;
        }

        .filter-button:hover {
          background: rgba(139, 69, 19, 0.2);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .event-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .event-card:hover .event-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
        }

        .image-overlay h2 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .image-overlay p {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-content p {
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .learn-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .learn-more:hover {
          color: #483D8B;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .page-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          background: rgba(139, 69, 19, 0.1);
          color: #8B4513;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .page-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-button:hover:not(:disabled) {
          background: rgba(139, 69, 19, 0.2);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .ruler-timeline-item {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 220, 0.95) 100%);
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .timeline-content {
          padding: 2rem;
        }

        .ruler-header {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .ruler-image {
          flex: 0 0 200px;
          height: 200px;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .ruler-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ruler-title {
          flex: 1;
        }

        .ruler-title h2 {
          font-size: 2rem;
          color: #8B4513;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ruler-title h3 {
          font-size: 1.25rem;
          color: #483D8B;
          margin-bottom: 0.5rem;
        }

        .reign-period {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .location {
          font-size: 1rem;
          color: #8B4513;
        }

        .ruler-details {
          display: grid;
          gap: 2rem;
        }

        .description {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }

        .achievements {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }

        .achievements ul {
          list-style: none;
          padding: 0;
          margin: 0;
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
          gap: 1.5rem;
        }

        .significance, .legacy {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }

        h4 {
          color: #8B4513;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        p {
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .ruler-header {
            flex-direction: column;
            gap: 1rem;
          }

          .ruler-image {
            flex: 0 0 150px;
            height: 150px;
          }

          .historical-impact {
            grid-template-columns: 1fr;
          }
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .no-results p {
          color: #666;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .suggestion {
          color: #8B4513;
          font-size: 1rem;
          opacity: 0.8;
        }

        .event-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .event-card {
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </motion.div>
  );
}

export default SlokaGallery; 