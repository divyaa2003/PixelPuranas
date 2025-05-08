import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="header temple-header"
    >
      <div className="header-content">
        <Link to="/" className="logo">
          <span style={{ color: '#FF9933' }}>Pixel</span><span style={{ color: '#FFFFFF' }}>Puranas</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/timeline">Timeline</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/events"><BookOpen size={16} className="mr-1" /> Events Explorer</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="search-bar">
          <Search size={20} />
          <input type="text" placeholder="Search historical events..." />
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(139, 69, 19, 0.3);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          font-family: 'Noto Serif', serif;
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 4px;
        }

        .nav-links a:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          gap: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .search-bar input {
          border: none;
          background: none;
          outline: none;
          width: 200px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .search-bar {
            width: 100%;
          }

          .search-bar input {
            width: 100%;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header; 