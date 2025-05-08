import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, MapPin, Info, Youtube, Image, BookOpen, ArrowLeft, Calendar, Award, Globe, Bookmark, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { historicalEvents } from '../data/historicalEvents';
import PdfDownloadButton from './PdfDownloadButton';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import '../styles/indianHeritage.css';

function HistoricalEventsApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFullscreenImage, setShowFullscreenImage] = useState(null);
  const [animateSearch, setAnimateSearch] = useState(false);
  const eventContentRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Use the historicalEvents data which already contains all events
  const allEvents = historicalEvents;
  
  // Define event categories
  const categories = [
    { id: 'all', name: 'All Events', icon: <Globe size={18} /> },
    { id: 'indian', name: 'Indian History', icon: <Award size={18} /> },
    { id: 'world', name: 'World History', icon: <Globe size={18} /> },
    { id: 'ancient', name: 'Ancient Era', icon: <BookOpen size={18} /> },
    { id: 'medieval', name: 'Medieval Era', icon: <Award size={18} /> },
    { id: 'modern', name: 'Modern Era', icon: <Calendar size={18} /> }
  ];
  
  // Categorize events
  const categorizeEvent = (eventKey, eventData) => {
    // Indian history events
    if (eventKey.includes('indus') || eventKey.includes('maurya') || 
        eventKey.includes('gupta') || eventKey.includes('mughal') || 
        eventKey.includes('indian') || eventKey.includes('krishnadevaraya') || 
        eventKey.includes('akbar') || eventKey.includes('humayun') || 
        eventKey.includes('babur') || eventKey.includes('fatehpur') || 
        eventKey.includes('portuguese-goa')) {
      return 'indian';
    }
    
    // Ancient era events (before 500 CE)
    const yearMatch = eventData.date?.match(/(\d+)\s*BCE/) || eventData.date?.match(/^(\d+)/);
    if (yearMatch || eventData.date?.includes('BCE') || 
        eventKey.includes('indus') || eventKey.includes('maurya')) {
      return 'ancient';
    }
    
    // Medieval era events (500-1500 CE)
    if (eventKey.includes('gupta') || eventKey.includes('mughal') || 
        eventKey.includes('medieval') || eventKey.includes('renaissance') || 
        eventKey.includes('crusades')) {
      return 'medieval';
    }
    
    // Modern era events (after 1500 CE)
    if (eventKey.includes('revolution') || eventKey.includes('war') || 
        eventKey.includes('moon') || eventKey.includes('berlin') || 
        eventKey.includes('civil') || eventKey.includes('cold') || 
        eventKey.includes('digital')) {
      return 'modern';
    }
    
    // Default to world history for anything else
    return 'world';
  };
  
  // Generate suggested events on component mount
  useEffect(() => {
    const eventKeys = Object.keys(allEvents);
    const randomEvents = [];
    const usedIndices = new Set();
    const indianEvents = [];
    
    // First collect Indian history events
    eventKeys.forEach(key => {
      if (categorizeEvent(key, allEvents[key]) === 'indian') {
        indianEvents.push({
          key,
          title: allEvents[key].title,
          date: allEvents[key].date || allEvents[key].year,
          image: allEvents[key].images?.[0]?.url || allEvents[key].image,
          category: 'indian'
        });
      }
    });
    
    // Prioritize Indian events for suggestions
    while (randomEvents.length < Math.min(2, indianEvents.length)) {
      const randomIndex = Math.floor(Math.random() * indianEvents.length);
      if (!usedIndices.has('indian-' + randomIndex)) {
        usedIndices.add('indian-' + randomIndex);
        randomEvents.push(indianEvents[randomIndex]);
      }
    }
    
    // Then add other random events
    while (randomEvents.length < Math.min(6, eventKeys.length)) {
      const randomIndex = Math.floor(Math.random() * eventKeys.length);
      const key = eventKeys[randomIndex];
      
      if (!usedIndices.has(key)) {
        usedIndices.add(key);
        const category = categorizeEvent(key, allEvents[key]);
        
        randomEvents.push({
          key,
          title: allEvents[key].title,
          date: allEvents[key].date || allEvents[key].year,
          image: allEvents[key].images?.[0]?.url || allEvents[key].image,
          category
        });
      }
    }
    
    setSuggestedEvents(randomEvents);
    
    // Add floating diyas as decorative elements
    const addFloatingDiyas = () => {
      const container = document.querySelector('.historical-events-app');
      if (container) {
        for (let i = 0; i < 5; i++) {
          const diya = document.createElement('div');
          diya.className = 'floating-diya';
          diya.style.left = `${Math.random() * 90 + 5}%`;
          diya.style.top = `${Math.random() * 80 + 10}%`;
          diya.style.animationDelay = `${Math.random() * 3}s`;
          container.appendChild(diya);
        }
      }
    };
    
    // Add mandalas as decorative elements
    const addMandalas = () => {
      const container = document.querySelector('.historical-events-app');
      if (container) {
        for (let i = 0; i < 3; i++) {
          const mandala = document.createElement('div');
          mandala.className = 'mandala';
          mandala.style.position = 'absolute';
          mandala.style.left = `${Math.random() * 90 + 5}%`;
          mandala.style.top = `${Math.random() * 80 + 10}%`;
          mandala.style.opacity = '0.15';
          mandala.style.zIndex = '0';
          container.appendChild(mandala);
        }
      }
    };
    
    // Add decorative elements after a short delay
    setTimeout(() => {
      addFloatingDiyas();
      addMandalas();
    }, 1000);
    
  }, []);

  // Add event to view history with category information
  const addToViewHistory = (eventData) => {
    if (!viewHistory.some(item => item.title === eventData.title)) {
      const category = eventData.category || categorizeEvent(eventData.key, allEvents[eventData.key]);
      setViewHistory(prev => [{ ...eventData, category }, ...prev].slice(0, 5));
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Add subtle animation to search bar when changing categories
    setAnimateSearch(true);
    setTimeout(() => setAnimateSearch(false), 500);
    
    // Focus search input when changing categories
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Handle fullscreen image view
  const handleImageClick = (image) => {
    setShowFullscreenImage(image);
  };
  
  // Close fullscreen image view
  const closeFullscreenImage = () => {
    setShowFullscreenImage(null);
  };

  // Enhanced search functionality
  const handleSearch = () => {
    setLoading(true);
    setError('');
    
    // Add search animation
    setAnimateSearch(true);
    setTimeout(() => setAnimateSearch(false), 500);
    
    // Simulate API call with enhanced search
    setTimeout(() => {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      
      // Find event by keyword with category filtering
      let foundEvent = null;
      let foundKey = '';
      
      // Search through all events or filter by category
      for (const key in allEvents) {
        const eventCategory = categorizeEvent(key, allEvents[key]);
        
        // Skip if filtering by category and this event doesn't match
        if (activeCategory !== 'all' && eventCategory !== activeCategory) {
          continue;
        }
        
        if (normalizedSearch.includes(key) || key.includes(normalizedSearch) || 
            allEvents[key].title.toLowerCase().includes(normalizedSearch) ||
            (allEvents[key].description && allEvents[key].description.toLowerCase().includes(normalizedSearch))) {
          foundEvent = allEvents[key];
          foundKey = key;
          break;
        }
      }
      
      if (foundEvent) {
        setEvent(foundEvent);
        addToViewHistory({
          key: foundKey,
          title: foundEvent.title,
          date: foundEvent.date || foundEvent.year,
          image: foundEvent.images?.[0]?.url || foundEvent.image,
          category: categorizeEvent(foundKey, foundEvent)
        });
        
        // Scroll to event content
        setTimeout(() => {
          if (eventContentRef.current) {
            eventContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        let suggestedSearchTerms = '';
        
        if (activeCategory === 'indian' || activeCategory === 'all') {
          suggestedSearchTerms = '"indus valley", "maurya empire", "gupta empire", "mughal empire", "indian independence"';
        } else if (activeCategory === 'modern') {
          suggestedSearchTerms = '"moon landing", "berlin wall fall", "world war 2", "civil rights movement", "cold war", "digital revolution"';
        } else if (activeCategory === 'ancient') {
          suggestedSearchTerms = '"indus valley", "maurya empire"';
        } else {
          suggestedSearchTerms = '"moon landing", "berlin wall fall", "world war 2", "french revolution", "american revolution", "industrial revolution", "civil rights movement", "cold war", "digital revolution"';
        }
        
        setError(`No historical event found in the ${categories.find(c => c.id === activeCategory)?.name || 'selected'} category. Try searching for ${suggestedSearchTerms}.`);
      }
      
      setLoading(false);
    }, 800);
  };
  
  // Handle suggested event click with enhanced animations
  const handleSuggestedEventClick = (eventKey) => {
    setSearchTerm(eventKey);
    setLoading(true);
    setError('');
    
    // Add search animation
    setAnimateSearch(true);
    setTimeout(() => setAnimateSearch(false), 500);
    
    setTimeout(() => {
      const selectedEvent = allEvents[eventKey];
      setEvent(selectedEvent);
      addToViewHistory({
        key: eventKey,
        title: selectedEvent.title,
        date: selectedEvent.date || selectedEvent.year,
        image: selectedEvent.images?.[0]?.url || selectedEvent.image,
        category: categorizeEvent(eventKey, selectedEvent)
      });
      
      // Scroll to event content
      setTimeout(() => {
        if (eventContentRef.current) {
          eventContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      setLoading(false);
    }, 400);
  };

  return (
    <div className="historical-events-app">
      <div className="navigation">
        <Link to="/" className="back-link">
          <ArrowLeft className="icon" />
          Back to Home
        </Link>
      </div>

      <div className="container">
        <motion.header 
          className="text-center mb-12 scroll-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-3 font-sanskrit">पिक्सेल पुराणा</h1>
          <h2 className="text-2xl font-bold text-maroon mb-2">Historical Events Explorer</h2>
          <p className="text-gray-700">Discover the rich tapestry of world history with a special focus on India's cultural heritage</p>
        </motion.header>
        
        {/* Category Navigation */}
        <motion.div 
          className="category-nav mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="icon">{category.icon}</span>
                <span className="name">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      
        <motion.div 
          className={`search-container mb-8 ${animateSearch ? 'animate-pulse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="ornate-border search-box">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder={`Search for ${activeCategory === 'indian' ? 'Indian' : activeCategory === 'all' ? '' : activeCategory} historical events...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="search-button"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>
        </motion.div>
      
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="error-icon">!</div>
            <p>{error}</p>
          </motion.div>
        )}
      
      {event && (
        <motion.div 
          className="event-display ornate-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="event-header">
            <div className="event-title-section">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date"><Clock size={18} className="icon" /> {event.date}</p>
              <div className="event-category-tag">
                {categorizeEvent(searchTerm, event) === 'indian' ? (
                  <span><Award size={14} className="mr-1" /> Indian History</span>
                ) : categorizeEvent(searchTerm, event) === 'ancient' ? (
                  <span><BookOpen size={14} className="mr-1" /> Ancient Era</span>
                ) : categorizeEvent(searchTerm, event) === 'medieval' ? (
                  <span><Award size={14} className="mr-1" /> Medieval Era</span>
                ) : (
                  <span><Calendar size={14} className="mr-1" /> Modern Era</span>
                )}
              </div>
            </div>
            <div className="event-actions">
              <PdfDownloadButton contentRef={eventContentRef} fileName={`${event.title.replace(/\s+/g, '-').toLowerCase()}.pdf`} />
              <button 
                onClick={() => setEvent(null)} 
                className="back-button"
              >
                <ArrowLeft size={18} className="mr-1" /> Back to Search
              </button>
            </div>
          </div>
          
          <div ref={eventContentRef} className="event-content">
            <motion.div 
              className="overview-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="section-title"><Info size={22} className="icon" /> Overview</h3>
              <p className="section-content">{event.description}</p>
            </motion.div>
          
            <motion.div 
              className="key-facts-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="section-title"><BookOpen size={22} className="icon" /> Key Facts</h3>
              <ul className="key-facts-list">
                {event.details.map((detail, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          
            <motion.div 
              className="images-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="section-title"><Image size={22} className="icon" /> Images</h3>
              <PhotoProvider>
                <div className="images-grid">
                  {event.images.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className="photo-gallery-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(139, 69, 19, 0.4)' }}
                    >
                      <PhotoView src={image.url}>
                        <img 
                          src={image.url} 
                          alt={image.caption} 
                          className="gallery-image"
                        />
                      </PhotoView>
                      <div className="caption">
                        <p>{image.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </PhotoProvider>
            </motion.div>
          
            {event.videoLinks && event.videoLinks.length > 0 && (
              <motion.div 
                className="videos-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="section-title"><Youtube size={22} className="icon" /> Videos</h3>
                <div className="videos-grid">
                  {event.videoLinks.map((video, index) => (
                    <motion.div 
                      key={index} 
                      className="video-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(139, 69, 19, 0.4)' }}
                    >
                      <h4 className="video-title">{video.title}</h4>
                      <a 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="video-link"
                      >
                        <div className="youtube-icon">
                          <Youtube size={24} />
                        </div>
                        <span>Watch on YouTube</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          
            <motion.div 
              className="impact-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="section-title"><MapPin size={22} className="icon" /> Historical Impact</h3>
              <p className="section-content">{event.impact}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {!event && !loading && !error && (
        <>
          <motion.div 
            className="welcome-banner scroll-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mandala" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.2 }}></div>
            <h2 className="welcome-title">Welcome to <span className="sanskrit-text">पिक्सेल पुराणा</span></h2>
            <p className="welcome-text">Embark on a journey through time to discover the rich tapestry of human history, with special focus on India's cultural heritage.</p>
            <div className="welcome-suggestions">
              <p>Popular searches:</p>
              <div className="suggestion-tags">
                <button onClick={() => { setSearchTerm('indus valley'); handleSearch(); }} className="suggestion-tag indian">Indus Valley</button>
                <button onClick={() => { setSearchTerm('maurya empire'); handleSearch(); }} className="suggestion-tag indian">Maurya Empire</button>
                <button onClick={() => { setSearchTerm('mughal empire'); handleSearch(); }} className="suggestion-tag indian">Mughal Empire</button>
                <button onClick={() => { setSearchTerm('moon landing'); handleSearch(); }} className="suggestion-tag world">Moon Landing</button>
                <button onClick={() => { setSearchTerm('world war 2'); handleSearch(); }} className="suggestion-tag world">World War II</button>
              </div>
            </div>
          </motion.div>
          
          {/* Suggested Events Section */}
          <motion.div 
            className="suggested-events-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="section-heading">
              <span className="heading-icon">🏛️</span> 
              Suggested Historical Events
              <span className="heading-decoration"></span>
            </h2>
            <div className="suggested-events-grid">
              {suggestedEvents.map((suggestedEvent, index) => (
                <motion.div 
                  key={index} 
                  className={`suggested-event-card ${suggestedEvent.category === 'indian' ? 'indian-event' : ''}`}
                  onClick={() => handleSuggestedEventClick(suggestedEvent.key)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(139, 69, 19, 0.4)' }}
                >
                  <div className="event-image-container">
                    <img 
                      src={suggestedEvent.image} 
                      alt={suggestedEvent.title} 
                      className="event-image"
                    />
                    <div className="event-category-badge">
                      {suggestedEvent.category === 'indian' ? (
                        <span><Award size={12} /> Indian</span>
                      ) : suggestedEvent.category === 'ancient' ? (
                        <span><BookOpen size={12} /> Ancient</span>
                      ) : suggestedEvent.category === 'medieval' ? (
                        <span><Award size={12} /> Medieval</span>
                      ) : (
                        <span><Calendar size={12} /> Modern</span>
                      )}
                    </div>
                  </div>
                  <div className="event-info">
                    <h3 className="event-card-title">{suggestedEvent.title}</h3>
                    <p className="event-card-date">
                      <Clock size={14} className="icon" /> {suggestedEvent.date}
                    </p>
                    <button className="view-details-button">
                      <BookOpen size={14} className="icon" /> View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Recently Viewed Section */}
          {viewHistory.length > 0 && (
            <motion.div 
              className="recently-viewed-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="section-heading">
                <span className="heading-icon">🕰️</span> 
                Recently Viewed
                <span className="heading-decoration"></span>
              </h2>
              <div className="recently-viewed-carousel">
                {viewHistory.map((historyItem, index) => (
                  <motion.div 
                    key={index} 
                    className={`history-card ${historyItem.category === 'indian' ? 'indian-event' : ''}`}
                    onClick={() => handleSuggestedEventClick(historyItem.key)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(139, 69, 19, 0.4)' }}
                  >
                    <div className="history-image-container">
                      <img 
                        src={historyItem.image} 
                        alt={historyItem.title} 
                        className="history-image"
                      />
                      <div className="history-category-badge">
                        {historyItem.category === 'indian' ? (
                          <span><Award size={12} /></span>
                        ) : historyItem.category === 'ancient' ? (
                          <span><BookOpen size={12} /></span>
                        ) : historyItem.category === 'medieval' ? (
                          <span><Award size={12} /></span>
                        ) : (
                          <span><Calendar size={12} /></span>
                        )}
                      </div>
                    </div>
                    <div className="history-info">
                      <h3 className="history-title">{historyItem.title}</h3>
                      <p className="history-date">
                        <Clock size={12} className="icon" /> {historyItem.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-decoration"></div>
          <p>© 2025 <span className="sanskrit-text">पिक्सेल पुराणा</span> | All information provided for educational purposes</p>
        </div>
      </footer>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {showFullscreenImage && (
          <motion.div 
            className="fullscreen-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreenImage}
          >
            <motion.img 
              src={showFullscreenImage.url} 
              alt={showFullscreenImage.caption}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="caption"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {showFullscreenImage.caption}
            </motion.div>
            <button className="close-button" onClick={closeFullscreenImage}>×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .historical-events-app {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--cream) 0%, var(--light-brown) 50%, var(--light-brown) 100%);
          padding: 2rem;
          position: relative;
          overflow-x: hidden;
        }

        .navigation {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--dark-brown);
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          border: 1px solid var(--gold);
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.5);
          color: var(--maroon);
          transform: translateY(-2px);
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        /* Header and Welcome Section */
        .font-sanskrit {
          font-family: 'Noto Serif', serif;
          color: var(--maroon);
        }
        
        .sanskrit-text {
          color: var(--deep-saffron);
          font-weight: bold;
        }
        
        .welcome-banner {
          text-align: center;
          padding: 2.5rem;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .welcome-title {
          font-size: 2.2rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 1rem;
        }
        
        .welcome-text {
          font-size: 1.1rem;
          color: var(--dark-brown);
          margin-bottom: 1.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .welcome-suggestions {
          margin-top: 1.5rem;
        }
        
        .suggestion-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 0.5rem;
        }
        
        .suggestion-tag {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .suggestion-tag.indian {
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
        }
        
        .suggestion-tag.world {
          background: linear-gradient(135deg, var(--maroon) 0%, var(--deep-saffron) 100%);
          color: white;
        }
        
        .suggestion-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        /* Category Navigation */
        .category-nav {
          margin-bottom: 2rem;
        }
        
        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .category-tab {
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid var(--gold);
          color: var(--dark-brown);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .category-tab.active {
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        .category-tab:hover:not(.active) {
          background: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }
        
        /* Search Box */
        .search-container {
          margin-bottom: 2rem;
        }
        
        .search-box {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          background: var(--off-white);
        }
        
        .search-input {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          font-size: 1.1rem;
          color: var(--dark-brown);
          outline: none;
        }
        
        .search-button {
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
          border: none;
          padding: 0 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .search-button:hover {
          background: linear-gradient(135deg, var(--gold) 0%, var(--deep-saffron) 100%);
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: rgba(220, 53, 69, 0.1);
          border-left: 4px solid #dc3545;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        
        .error-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #dc3545;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        /* Section Headings */
        .section-heading {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--gold);
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .heading-icon {
          font-size: 1.5rem;
        }
        
        .heading-decoration {
          flex-grow: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin-left: 1rem;
        }
        
        /* Suggested Events */
        .suggested-events-section {
          margin-bottom: 3rem;
        }
        
        .suggested-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .suggested-event-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
          background: var(--off-white);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(218, 165, 32, 0.3);
        }
        
        .suggested-event-card.indian-event {
          border-color: var(--deep-saffron);
        }
        
        .event-image-container {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .suggested-event-card:hover .event-image {
          transform: scale(1.05);
        }
        
        .event-category-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .event-info {
          padding: 1.2rem;
        }
        
        .event-card-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 0.5rem;
        }
        
        .event-card-date {
          font-size: 0.9rem;
          color: var(--dark-brown);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0.8rem;
        }
        
        .view-details-button {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.8rem;
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .view-details-button:hover {
          background: linear-gradient(135deg, var(--gold) 0%, var(--deep-saffron) 100%);
        }
        
        /* Recently Viewed */
        .recently-viewed-section {
          margin-bottom: 3rem;
        }
        
        .recently-viewed-carousel {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: var(--dark-brown) var(--cream);
        }
        
        .recently-viewed-carousel::-webkit-scrollbar {
          height: 8px;
        }
        
        .recently-viewed-carousel::-webkit-scrollbar-track {
          background: var(--cream);
          border-radius: 4px;
        }
        
        .recently-viewed-carousel::-webkit-scrollbar-thumb {
          background-color: var(--dark-brown);
          border-radius: 4px;
        }
        
        .history-card {
          flex: 0 0 200px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
          background: var(--off-white);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(218, 165, 32, 0.3);
        }
        
        .history-card.indian-event {
          border-color: var(--deep-saffron);
        }
        
        .history-image-container {
          position: relative;
          height: 120px;
          overflow: hidden;
        }
        
        .history-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .history-card:hover .history-image {
          transform: scale(1.05);
        }
        
        .history-category-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .history-info {
          padding: 0.8rem;
        }
        
        .history-title {
          font-size: 0.9rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 0.3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .history-date {
          font-size: 0.8rem;
          color: var(--dark-brown);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        /* Event Display */
        .event-display {
          background: var(--off-white);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        
        .event-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          background: linear-gradient(135deg, var(--cream) 0%, var(--off-white) 100%);
          border-bottom: 2px solid var(--gold);
        }
        
        .event-title-section {
          flex: 1;
        }
        
        .event-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 0.5rem;
          font-family: 'Noto Serif', serif;
        }
        
        .event-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--dark-brown);
          margin-bottom: 0.5rem;
        }
        
        .event-category-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.8rem;
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        
        .event-actions {
          display: flex;
          gap: 0.8rem;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.6rem 1rem;
          background: var(--cream);
          color: var(--dark-brown);
          border: 1px solid var(--dark-brown);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .back-button:hover {
          background: var(--light-brown);
          color: white;
        }
        
        .event-content {
          padding: 1.5rem;
        }
        
        .section-title {
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-title .icon {
          color: var(--deep-saffron);
        }
        
        .section-content {
          color: var(--dark-brown);
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }
        
        .overview-section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          border-left: 4px solid var(--deep-saffron);
        }
        
        .key-facts-section {
          margin-bottom: 2rem;
        }
        
        .key-facts-list {
          list-style-type: none;
          padding-left: 1.5rem;
        }
        
        .key-facts-list li {
          position: relative;
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          color: var(--dark-brown);
        }
        
        .key-facts-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.9rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--deep-saffron);
        }
        
        .images-section {
          margin-bottom: 2rem;
        }
        
        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .gallery-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          cursor: pointer;
        }
        
        .videos-section {
          margin-bottom: 2rem;
        }
        
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .video-card {
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          border: 1px solid var(--gold);
        }
        
        .video-title {
          font-weight: bold;
          color: var(--maroon);
          margin-bottom: 0.8rem;
        }
        
        .video-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--deep-saffron);
          text-decoration: none;
          font-weight: bold;
        }
        
        .youtube-icon {
          width: 36px;
          height: 36px;
          background: #FF0000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .impact-section {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          border-left: 4px solid var(--indigo);
        }
        
        /* Footer */
        .footer {
          margin-top: 3rem;
          text-align: center;
          padding: 1.5rem 0;
          position: relative;
        }
        
        .footer-content {
          position: relative;
          padding-top: 1.5rem;
        }
        
        .footer-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"><path fill="%23DAA520" d="M0,0 L5,5 L10,0 L15,5 L20,0 L25,5 L30,0 L35,5 L40,0 L45,5 L50,0 L55,5 L60,0 L65,5 L70,0 L75,5 L80,0 L85,5 L90,0 L95,5 L100,0 L100,10 L0,10 Z"/></svg>');
          background-size: 100px 10px;
          background-repeat: repeat-x;
        }
        
        /* Fullscreen Image Viewer */
        .fullscreen-viewer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .fullscreen-viewer img {
          max-width: 90%;
          max-height: 80vh;
          box-shadow: 0 0 30px rgba(218, 165, 32, 0.6);
        }
        
        .fullscreen-viewer .caption {
          color: white;
          margin-top: 1rem;
          font-size: 1.2rem;
          text-align: center;
          max-width: 80%;
        }
        
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .historical-events-app {
            padding: 1rem;
          }
          
          .event-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .event-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .images-grid, .videos-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
          
          .suggested-events-grid {
            grid-template-columns: 1fr;
          }
          
          .category-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .category-tab {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}

export default HistoricalEventsApp;