import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Ancient Civilizations",
      icon: "🏛️",
      description: "Explore the rise and fall of early civilizations that shaped human history.",
      events: [
        {
          id: 1,
          title: "The Egyptian Pyramids",
          description: "The construction of the Great Pyramids of Giza.",
          year: "2560 BCE",
          image: "https://source.unsplash.com/random/800x600/?pyramids"
        },
        {
          id: 2,
          title: "The Roman Empire",
          description: "The rise and fall of one of history's greatest empires.",
          year: "27 BCE - 476 CE",
          image: "https://source.unsplash.com/random/800x600/?roman"
        }
      ]
    },
    {
      id: 2,
      name: "Medieval Period",
      icon: "⚔️",
      description: "Discover the events that defined the Middle Ages in Europe and beyond.",
      events: [
        {
          id: 3,
          title: "The Crusades",
          description: "A series of religious wars between Christians and Muslims.",
          year: "1095 - 1291",
          image: "https://source.unsplash.com/random/800x600/?crusades"
        },
        {
          id: 4,
          title: "The Black Death",
          description: "One of the most devastating pandemics in human history.",
          year: "1347 - 1351",
          image: "https://source.unsplash.com/random/800x600/?plague"
        }
      ]
    },
    {
      id: 3,
      name: "Modern History",
      icon: "🌍",
      description: "Explore the events that shaped our modern world.",
      events: [
        {
          id: 5,
          title: "The Industrial Revolution",
          description: "The transition to new manufacturing processes.",
          year: "1760 - 1840",
          image: "https://source.unsplash.com/random/800x600/?industrial"
        },
        {
          id: 6,
          title: "World War II",
          description: "The deadliest global conflict in human history.",
          year: "1939 - 1945",
          image: "https://source.unsplash.com/random/800x600/?worldwar2"
        }
      ]
    }
  ];

  return (
    <div className="categories-page">
      <h1>Explore by Category</h1>
      
      <div className="categories-grid">
        {categories.map(category => (
          <motion.div
            key={category.id}
            className="category-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="category-icon">{category.icon}</span>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </motion.div>
        ))}
      </div>

      {selectedCategory && (
        <motion.div
          className="category-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="category-header">
            <h2>{selectedCategory.name}</h2>
            <button
              className="close-button"
              onClick={() => setSelectedCategory(null)}
            >
              ×
            </button>
          </div>

          <div className="events-grid">
            {selectedCategory.events.map(event => (
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
        </motion.div>
      )}

      <style jsx>{`
        .categories-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 3rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .category-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .category-card h2 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .category-card p {
          color: #666;
          line-height: 1.6;
        }

        .category-details {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 2rem;
          color: #666;
          cursor: pointer;
          padding: 0.5rem;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .event-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

        @media (max-width: 768px) {
          .categories-page {
            padding: 1rem;
          }

          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoriesPage; 