import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Info, Youtube, Image, BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { historicalEvents } from '../data/historicalEvents';
import PdfDownloadButton from './PdfDownloadButton';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const eventContentRef = React.useRef(null);

  useEffect(() => {
    setLoading(true);
    
    // Find the event by ID
    const foundEvent = historicalEvents[id];
    
    if (foundEvent) {
      setEvent(foundEvent);
      setError('');
    } else {
      setError('Event not found. Please check the URL or return to the home page.');
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="event-details-page">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="back-link mb-6 inline-flex items-center text-orange-700 hover:text-orange-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-orange-800 mb-2 font-sanskrit">{event.title}</h1>
                <p className="text-gray-600 flex items-center">
                  <Clock size={18} className="mr-2 text-orange-600" /> 
                  {event.date}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <PdfDownloadButton 
                  contentRef={eventContentRef} 
                  fileName={`${event.title.replace(/\s+/g, '-').toLowerCase()}.pdf`} 
                />
              </div>
            </div>
            
            <div ref={eventContentRef}>
              <div className="mb-8 bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                <h2 className="text-xl font-semibold mb-3 flex items-center text-orange-800">
                  <Info size={22} className="mr-2 text-orange-600" /> 
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
              
              {event.details && event.details.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 flex items-center text-orange-800">
                    <BookOpen size={22} className="mr-2 text-orange-600" /> 
                    Key Facts
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {event.details.map((detail, index) => (
                      <li key={index} className="text-gray-700">{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {event.images && event.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-800">
                    <Image size={22} className="mr-2 text-orange-600" /> 
                    Images
                  </h2>
                  <PhotoProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.images.map((image, index) => (
                        <div key={index} className="image-card">
                          <PhotoView src={image.url}>
                            <img 
                              src={image.url} 
                              alt={image.caption} 
                              className="w-full h-48 object-cover cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            />
                          </PhotoView>
                          <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
                        </div>
                      ))}
                    </div>
                  </PhotoProvider>
                </div>
              )}
              
              {event.videoLinks && event.videoLinks.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-800">
                    <Youtube size={22} className="mr-2 text-red-600" /> 
                    Related Videos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.videoLinks.map((video, index) => (
                      <a 
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="video-link flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 mr-3">
                          <div className="bg-red-600 text-white p-2 rounded-full">
                            <Youtube size={24} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">{video.title}</h3>
                          <p className="text-sm text-blue-600">Watch on YouTube</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {event.impact && (
                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h2 className="text-xl font-semibold mb-3 flex items-center text-indigo-800">
                    <MapPin size={22} className="mr-2 text-indigo-600" /> 
                    Historical Impact
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{event.impact}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .event-details-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #F5F5DC 0%, #DEB887 50%, #D2B48C 100%);
          padding-bottom: 2rem;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }
        
        .back-link:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        .image-card {
          transition: transform 0.3s ease;
        }
        
        .image-card:hover {
          transform: translateY(-5px);
        }
        
        .font-sanskrit {
          font-family: 'Noto Serif', serif;
        }
        
        .video-link {
          transition: transform 0.3s ease;
        }
        
        .video-link:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}

export default EventDetailsPage;
