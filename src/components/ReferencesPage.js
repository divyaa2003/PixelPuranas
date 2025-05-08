import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Globe, FileText, Youtube } from 'lucide-react';

function ReferencesPage() {
  const references = {
    books: [
      {
        title: "A History of India",
        author: "Romila Thapar",
        publisher: "Penguin Books",
        year: "2015",
        isbn: "978-0140128358"
      },
      {
        title: "The Mughal Empire",
        author: "John F. Richards",
        publisher: "Cambridge University Press",
        year: "1995",
        isbn: "978-0521566032"
      },
      {
        title: "India: A History",
        author: "John Keay",
        publisher: "Grove Press",
        year: "2000",
        isbn: "978-0802137975"
      }
    ],
    websites: [
      {
        title: "The British Library - Indian History",
        url: "https://www.bl.uk/india",
        description: "Extensive collection of Indian historical resources"
      },
      {
        title: "Archaeological Survey of India",
        url: "https://asi.nic.in",
        description: "Official website with information about Indian archaeological sites"
      },
      {
        title: "Indian History Congress",
        url: "https://www.indianhistorycongress.org",
        description: "Academic organization for Indian history research"
      }
    ],
    articles: [
      {
        title: "The Indus Valley Civilization: A Contemporary Perspective",
        author: "Jane McIntosh",
        journal: "Journal of World Prehistory",
        year: "2008",
        volume: "22",
        pages: "1-42"
      },
      {
        title: "Mughal Architecture: Evolution and Characteristics",
        author: "Ebba Koch",
        journal: "Architectural History",
        year: "1991",
        volume: "34",
        pages: "95-131"
      }
    ],
    videos: [
      {
        title: "The Story of India",
        creator: "Michael Wood",
        platform: "PBS",
        year: "2007",
        url: "https://www.pbs.org/thestoryofindia"
      },
      {
        title: "Ancient India: A Journey Through Time",
        creator: "National Geographic",
        platform: "YouTube",
        year: "2019",
        url: "https://www.youtube.com/watch?v=example"
      }
    ]
  };

  return (
    <motion.div 
      className="references-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="header">
          <div className="navigation-links">
            <Link to="/" className="back-link">
              <ArrowLeft className="icon" />
              Back to Home
            </Link>
            <Link to="/gallery" className="gallery-link">
              View Gallery
            </Link>
          </div>
          <h1>References</h1>
          <p className="subtitle">Academic and Educational Resources</p>
        </div>

        <div className="references-grid">
          <motion.section 
            className="reference-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <Book className="section-icon" />
              <h2>Books</h2>
            </div>
            <ul className="reference-list">
              {references.books.map((book, index) => (
                <motion.li
                  key={index}
                  className="reference-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <p className="details">
                    {book.publisher}, {book.year}
                    <br />
                    ISBN: {book.isbn}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            className="reference-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <Globe className="section-icon" />
              <h2>Websites</h2>
            </div>
            <ul className="reference-list">
              {references.websites.map((site, index) => (
                <motion.li
                  key={index}
                  className="reference-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <h3>{site.title}</h3>
                  <p className="description">{site.description}</p>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="link">
                    Visit Website
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            className="reference-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="section-header">
              <FileText className="section-icon" />
              <h2>Academic Articles</h2>
            </div>
            <ul className="reference-list">
              {references.articles.map((article, index) => (
                <motion.li
                  key={index}
                  className="reference-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <h3>{article.title}</h3>
                  <p className="author">{article.author}</p>
                  <p className="details">
                    {article.journal}, {article.year}
                    <br />
                    Vol. {article.volume}, pp. {article.pages}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section 
            className="reference-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="section-header">
              <Youtube className="section-icon" />
              <h2>Videos</h2>
            </div>
            <ul className="reference-list">
              {references.videos.map((video, index) => (
                <motion.li
                  key={index}
                  className="reference-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <h3>{video.title}</h3>
                  <p className="creator">{video.creator}</p>
                  <p className="details">
                    {video.platform}, {video.year}
                  </p>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="link">
                    Watch Video
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>

      <style jsx>{`
        .references-page {
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

        .navigation-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .back-link, .gallery-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .back-link:hover, .gallery-link:hover {
          background: rgba(255, 255, 255, 0.4);
          color: #483D8B;
        }

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        h1 {
          font-size: 3rem;
          color: #483D8B;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #8B4513;
          font-style: italic;
        }

        .references-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .reference-section {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: #483D8B;
        }

        .section-icon {
          width: 2rem;
          height: 2rem;
        }

        .reference-list {
          list-style: none;
          padding: 0;
        }

        .reference-item {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .reference-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .reference-item h3 {
          color: #483D8B;
          margin-bottom: 0.5rem;
        }

        .author, .creator {
          color: #8B4513;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .details {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .description {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .link {
          display: inline-block;
          color: #483D8B;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .link:hover {
          color: #8B4513;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .references-grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default ReferencesPage; 