import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TimelinePage = () => {
  const [selectedEra, setSelectedEra] = useState('all');

  const eras = [
    { id: 'all', name: 'All Eras' },
    { id: 'ancient', name: 'Ancient History' },
    { id: 'medieval', name: 'Medieval Period' },
    { id: 'modern', name: 'Modern History' }
  ];

  const timelineEvents = [
    {
      id: 1,
      title: "The First Civilizations",
      description: "The emergence of the first civilizations in Mesopotamia and Egypt.",
      year: "3000 BCE",
      era: "ancient",
      image: "https://source.unsplash.com/random/800x600/?mesopotamia"
    },
    {
      id: 2,
      title: "The Roman Empire",
      description: "The rise and fall of one of history's greatest empires.",
      year: "27 BCE - 476 CE",
      era: "ancient",
      image: "https://source.unsplash.com/random/800x600/?roman"
    },
    {
      id: 3,
      title: "The Middle Ages",
      description: "A period of European history from the fall of Rome to the Renaissance.",
      year: "476 - 1453",
      era: "medieval",
      image: "https://source.unsplash.com/random/800x600/?medieval"
    },
    {
      id: 4,
      title: "The Renaissance",
      description: "A period of cultural rebirth and artistic innovation in Europe.",
      year: "1300 - 1600",
      era: "medieval",
      image: "https://source.unsplash.com/random/800x600/?renaissance"
    },
    {
      id: 5,
      title: "The Industrial Revolution",
      description: "The transition to new manufacturing processes in Europe and the United States.",
      year: "1760 - 1840",
      era: "modern",
      image: "https://source.unsplash.com/random/800x600/?industrial"
    },
    {
      id: 6,
      title: "World War II",
      description: "The deadliest and most destructive global conflict in human history.",
      year: "1939 - 1945",
      era: "modern",
      image: "https://source.unsplash.com/random/800x600/?worldwar2"
    }
  ];

  const filteredEvents = selectedEra === 'all'
    ? timelineEvents
    : timelineEvents.filter(event => event.era === selectedEra);

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1>Historical Timeline</h1>
        <div className="era-filters">
          {eras.map(era => (
            <button
              key={era.id}
              className={`era-filter ${selectedEra === era.id ? 'active' : ''}`}
              onClick={() => setSelectedEra(era.id)}
            >
              {era.name}
            </button>
          ))}
        </div>
      </div>

      <div className="timeline">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="timeline-content">
              <div className="timeline-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="timeline-details">
                <span className="year">{event.year}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`} className="read-more">
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .timeline-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .timeline-header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .era-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .era-filter {
          padding: 0.5rem 1.5rem;
          border: 2px solid #e67e22;
          border-radius: 25px;
          background: none;
          color: #e67e22;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .era-filter:hover,
        .era-filter.active {
          background: #e67e22;
          color: white;
        }

        .timeline {
          position: relative;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: #e67e22;
        }

        .timeline-item {
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .timeline-image {
          flex: 0 0 300px;
        }

        .timeline-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 5px;
        }

        .timeline-details {
          flex: 1;
        }

        .year {
          color: #e67e22;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .timeline-details h3 {
          margin: 0.5rem 0;
          color: #2c3e50;
        }

        .read-more {
          display: inline-block;
          margin-top: 1rem;
          color: #e67e22;
          text-decoration: none;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .timeline-content {
            flex-direction: column;
          }

          .timeline-image {
            flex: 0 0 100%;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-content {
            margin-left: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default TimelinePage; 