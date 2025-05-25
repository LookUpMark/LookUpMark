import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';

// Placeholder for a lighthearted icon (e.g., a stylized question mark or lost map icon)
const LostIcon = () => (
  <svg className="w-24 h-24 text-blue-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2c0 1.1.9 2 2 2h1a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v6m0 0v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2c0-1.1.9-2 2-2h1a2 2 0 012 2zM12 14l.01-.01"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h.01M12 17h.01M9 17h.01M9 14h.01M15 14h.01M12 8a2 2 0 100-4 2 2 0 000 4z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21l-4.35-4.35M14.65 12.35L19 16.7M12 3v1M12 20v1M3 12h1M20 12h1M5.636 5.636l.707.707M17.657 17.657l.707.707M5.636 18.364l.707-.707M17.657 6.343l.707-.707"></path>
    {/* Simple Question Mark (alternative) */}
    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c0-2.063 1.672-3.772 3.772-3.772 2.1 0 3.772 1.709 3.772 3.772 0 1.464-.906 2.698-2.23 3.346l-.43.215c-.778.388-1.113.902-1.113 1.51v.53H12m0 3.772h.01"></path> */}
  </svg>
);


const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow flex items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          {/* Optional Icon */}
          <LostIcon />

          <p className="text-8xl lg:text-9xl font-extrabold text-blue-500 mb-4">404</p>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found.
          </h1>
          
          <p className="text-md sm:text-lg text-gray-600 mb-10 leading-relaxed">
            It looks like the page you're searching for has taken a detour. 
            Maybe it was moved, renamed, or it's just taking a little break. 
            No worries, we can help you find your way back!
          </p>
          
          <Button
            as={Link} // Make the button act as a Link
            to="/"
            variant="primary"
            size="large"
            className="shadow-lg transform hover:scale-105"
          >
            Go to Homepage
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
