import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <svg className="w-24 h-24 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01"></path>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            403 - Access Denied
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mb-10 leading-relaxed">
            Sorry, you do not have the necessary permissions to access this page. 
            If you believe this is an error, please contact support or ensure you are logged in with the correct account.
          </p>
          <Button
            as={Link}
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

export default UnauthorizedPage;
