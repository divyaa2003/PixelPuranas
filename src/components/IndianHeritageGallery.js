import React, { useState, useEffect } from 'react';
import { historicalEvents } from '../data/historicalEvents';
import { indianHistoricalEvents } from '../data/indianHistoricalEvents';
import { sixteenthCenturyEvents } from '../data/sixteenthCenturyEvents';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const IndianHeritageGallery = () => {
  const [indianEvents, setIndianEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [storyMode, setStoryMode] = useState(false);
  const [diyaPositions, setDiyaPositions] = useState([]);
  const [mandalaPositions, setMandalaPositions] = useState([]);

  // Combine all Indian historical events
  useEffect(() => {
    // Get ancient Indian events from historicalEvents
    const ancientEvents = Object.keys(historicalEvents)
      .filter(key => key.includes('ancient_india'))
      .map(key => ({
        key,
        ...historicalEvents[key]
      }));

    // Convert indianHistoricalEvents to array format
    const indianEventsArray = Object.entries(indianHistoricalEvents).map(([key, event]) => ({
      key,
      ...event
    }));

    // Add 16th century events
    const formatted16thCenturyEvents = sixteenthCenturyEvents.map(event => ({
      key: event.id,
      ...event
    }));

    // Combine all events
    const allEvents = [...ancientEvents, ...indianEventsArray, ...formatted16thCenturyEvents];
    
    setIndianEvents(allEvents);
    
    // Create random positions for floating diyas
    const diyas = [];
    for (let i = 0; i < 5; i++) {
      diyas.push({
        id: i,
        left: Math.random() * 90 + 5,
        top: Math.random() * 70 + 15,
        delay: Math.random() * 5
      });
    }
    setDiyaPositions(diyas);
    
    // Create random positions for glowing mandalas
    const mandalas = [];
    for (let i = 0; i < 3; i++) {
      mandalas.push({
        id: i,
        left: Math.random() * 80 + 10,
        top: Math.random() * 60 + 20,
        size: Math.random() * 50 + 100,
        delay: Math.random() * 3
      });
    }
    setMandalaPositions(mandalas);
  }, []);

  const openFullscreenImage = (event, imageIndex) => {
    setFullscreenImage(event);
    setFullscreenIndex(imageIndex);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setStoryMode(false);
  };

  const navigateFullscreen = (direction) => {
    if (!fullscreenImage) return;
    
    const imagesLength = fullscreenImage.images.length;
    let newIndex = fullscreenIndex + direction;
    
    if (newIndex < 0) newIndex = imagesLength - 1;
    if (newIndex >= imagesLength) newIndex = 0;
    
    setFullscreenIndex(newIndex);
  };

  const toggleStoryMode = () => {
    setStoryMode(!storyMode);
  };

  return (
    <div className="indian-heritage-gallery mandala-bg">
      {/* Navigation */}
      <div className="navigation">
        <Link to="/" className="back-link">
          <ArrowLeft className="icon" />
          Back to Home
        </Link>
      </div>

      {/* Floating Diyas */}
      {diyaPositions.map(diya => (
        <div
          key={diya.id}
          className="diya"
          style={{ 
            left: `${diya.left}%`, 
            top: `${diya.top}%` 
          }}
        />
      ))}
      
      {/* Glowing Mandalas */}
      {mandalaPositions.map(mandala => (
        <div
          key={mandala.id}
          className="glowing-mandala"
          style={{ 
            left: `${mandala.left}%`, 
            top: `${mandala.top}%`,
            width: `${mandala.size}px`,
            height: `${mandala.size}px`
          }}
        />
      ))}
      
      {/* Temple-inspired Header */}
      <header className="temple-header text-center py-8">
        <h1 className="text-4xl font-bold mb-2 sanskrit-text">
          भारतीय सांस्कृतिक विरासत
        </h1>
        <h2 className="text-2xl mb-4">
          Indian Cultural Heritage
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          Explore the rich tapestry of ancient Indian civilization through its magnificent architecture, 
          classical arts, and spiritual traditions spanning thousands of years.
        </p>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction Scroll */}
        <div className="scroll-container mb-12">
          <h2 className="text-2xl font-bold mb-4 sanskrit-text text-maroon">Ancient Indian Civilization</h2>
          <p className="mb-4">
            India's rich cultural heritage spans over five millennia, making it one of the world's oldest 
            civilizations. From the ancient cities of the Indus Valley to the magnificent temples of the 
            medieval period, India's cultural landscape is a testament to its profound artistic, spiritual, 
            and intellectual achievements.
          </p>
          <p>
            The cultural heritage of India reflects a harmonious blend of diverse traditions, religions, 
            and artistic expressions that have evolved over centuries. This gallery showcases some of the 
            most significant periods and aspects of ancient Indian culture.
          </p>
        </div>
        
        {/* Temple Pillar Divider */}
        <div className="temple-pillar-divider">
          <div className="pillar"></div>
          <div className="pillar mx-2"></div>
          <div className="pillar"></div>
        </div>
        
        {/* Gallery Grid */}
        <div className="gallery-grid">
          {indianEvents.map((event) => (
            <div 
              key={event.key}
              className="indian-card"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.images[0].url} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold mb-1 sanskrit-text">{event.title}</h3>
                    <p className="text-sm opacity-90">{event.date}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">{event.description.substring(0, 150)}...</p>
                <div className="flex justify-between">
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="text-maroon hover:text-deep-saffron font-medium transition-colors"
                  >
                    Read More
                  </button>
                  <button 
                    onClick={() => openFullscreenImage(event, 0)}
                    className="text-indigo hover:text-deep-indigo font-medium transition-colors"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-ivory max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg relative ornate-border">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-deep-saffron transition-colors"
              >
                ✕
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 sanskrit-text text-maroon">{selectedEvent.title}</h2>
                <p className="text-gray-600 mb-4">{selectedEvent.date}</p>
                
                <div className="mb-6">
                  <p className="mb-4">{selectedEvent.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-3 text-peacock-blue">Key Details</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    {selectedEvent.details.map((detail, index) => (
                      <li key={index} className="text-gray-700">{detail}</li>
                    ))}
                  </ul>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedEvent.images.slice(0, 2).map((image, index) => (
                      <div 
                        key={index} 
                        className="carved-panel cursor-pointer"
                        onClick={() => openFullscreenImage(selectedEvent, index)}
                      >
                        <img 
                          src={image.url} 
                          alt={image.caption}
                          className="carved-panel-image"
                        />
                        <div className="carved-panel-overlay">
                          <h4 className="carved-panel-title">{image.caption}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-peacock-blue">Historical Impact</h3>
                  <div className="scroll-container mb-4">
                    <p>{selectedEvent.impact}</p>
                  </div>
                  
                  <div className="story-timeline">
                    <h3 className="text-xl font-semibold mb-4 text-peacock-blue">Historical Timeline</h3>
                    
                    <div className="story-point">
                      <h4 className="story-title">Origins</h4>
                      <p>The early developments and foundations of this period.</p>
                    </div>
                    
                    <div className="story-point">
                      <h4 className="story-title">Golden Era</h4>
                      <p>The peak period of cultural and artistic achievements.</p>
                    </div>
                    
                    <div className="story-point">
                      <h4 className="story-title">Legacy</h4>
                      <p>The lasting influence and heritage preserved to this day.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Fullscreen Image Viewer */}
        {fullscreenImage && (
          <div className="fullscreen-viewer active">
            <button 
              className="fullscreen-close"
              onClick={closeFullscreen}
            >
              ✕
            </button>
            
            <button 
              className="fullscreen-nav fullscreen-prev"
              onClick={() => navigateFullscreen(-1)}
            >
              ←
            </button>
            
            <button 
              className="fullscreen-nav fullscreen-next"
              onClick={() => navigateFullscreen(1)}
            >
              →
            </button>
            
            <div className="fullscreen-image-container">
              <img 
                src={fullscreenImage.images[fullscreenIndex].url}
                alt={fullscreenImage.images[fullscreenIndex].caption}
                className="fullscreen-image"
              />
              
              <div className="fullscreen-caption">
                <h3 className="text-xl mb-2">{fullscreenImage.images[fullscreenIndex].caption}</h3>
                
                {storyMode && (
                  <div className="mt-4">
                    <p className="mb-2">
                      {fullscreenImage.description.split('.')[0]}.
                    </p>
                    <p>
                      {fullscreenImage.details[fullscreenIndex % fullscreenImage.details.length]}
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={toggleStoryMode}
                  className="mt-4 flex items-center text-gold hover:text-saffron transition-colors"
                >
                  {storyMode ? 'Hide Story' : 'Show Story'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with Ornate Border */}
      <footer className="ornate-border text-center py-6 mt-12">
        <p className="text-gray-600">© 2025 Indian Cultural Heritage Explorer</p>
        <p className="text-gray-500 text-sm mt-2">
          Celebrating the timeless beauty and wisdom of ancient Indian civilization
        </p>
      </footer>

      <style jsx>{`
        .indian-heritage-gallery {
          min-height: 100vh;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
          position: relative;
          overflow: hidden;
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
          color: #8B4513;
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.4);
          color: #483D8B;
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        // ... rest of the existing styles ...
      `}</style>
    </div>
  );
};

export default IndianHeritageGallery;