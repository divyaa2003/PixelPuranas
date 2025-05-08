import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "The Renaissance Period",
      description: "A period of European cultural, artistic, political and economic rebirth following the Middle Ages.",
      image: "https://source.unsplash.com/random/800x600/?renaissance",
      year: "1300-1600"
    },
    {
      id: 2,
      title: "The Industrial Revolution",
      description: "The transition to new manufacturing processes in Europe and the United States.",
      image: "https://source.unsplash.com/random/800x600/?industrial",
      year: "1760-1840"
    },
    {
      id: 3,
      title: "World War II",
      description: "The deadliest and most destructive global conflict in human history.",
      image: "https://source.unsplash.com/random/800x600/?worldwar2",
      year: "1939-1945"
    }
  ];

  const categories = [
    { id: 1, name: "Ancient Civilizations", icon: "🏛️" },
    { id: 2, name: "Medieval Period", icon: "⚔️" },
    { id: 3, name: "Modern History", icon: "🌍" },
    { id: 4, name: "Scientific Discoveries", icon: "🔬" },
    { id: 5, name: "Cultural Movements", icon: "🎨" },
    { id: 6, name: "Political Events", icon: "🏛️" }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <div className="mandala" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.5 }}></div>
          <div className="mandala" style={{ position: 'absolute', bottom: '20px', left: '20px', opacity: 0.5 }}></div>
          
          <h1 className="hero-title">Explore the Tapestry of <span className="highlight">Indian History</span></h1>
          <p>Discover significant events, people, and movements that shaped our cultural heritage</p>
          
          <div className="cta-buttons">
            <Link to="/timeline" className="indian-button">
              View Timeline
            </Link>
            <Link to="/events" className="indian-button secondary">
              Explore Historical Events
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="events-grid">
          {featuredEvents.map((event) => (
            <motion.div
              key={event.id}
              className="event-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={event.image} alt={event.title} />
              <div className="event-content">
                <span className="year">{event.year}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <Link to={`/event/${event.id}`} className="read-more">
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Explore by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .home-page {
          padding-top: 80px;
        }

        .hero {
          height: 80vh;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1200px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg') center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 800px;
          padding: 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          font-family: 'Noto Serif', serif;
          position: relative;
          display: inline-block;
        }
        
        .hero-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 25%;
          right: 25%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        
        .highlight {
          color: var(--deep-saffron);
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .indian-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--gold) 100%);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        .indian-button:hover {
          background: linear-gradient(135deg, var(--gold) 0%, var(--deep-saffron) 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(139, 69, 19, 0.4);
        }
        
        .indian-button.secondary {
          background: linear-gradient(135deg, var(--maroon) 0%, var(--deep-saffron) 100%);
        }
        
        .indian-button.secondary:hover {
          background: linear-gradient(135deg, var(--deep-saffron) 0%, var(--maroon) 100%);
        }

        .featured-events,
        .categories {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          color: #2c3e50;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .event-card {
          background: var(--off-white);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
          border: 1px solid var(--gold);
          position: relative;
        }
        
        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--deep-saffron), var(--gold), var(--deep-saffron));
        }

        .event-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .event-content {
          padding: 1.5rem;
        }

        .year {
          color: #e67e22;
          font-weight: bold;
        }

        .event-content h3 {
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

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .category-card {
          background: var(--off-white);
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
          cursor: pointer;
          border: 1px solid var(--gold);
          position: relative;
          overflow: hidden;
        }
        
        .category-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23DAA520" opacity="0.2" d="M0,0 C50,20 80,50 100,100 L0,100 Z"/></svg>');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: bottom right;
          opacity: 0.3;
        }

        .category-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .category-card h3 {
          color: #2c3e50;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          .featured-events,
          .categories {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage; 