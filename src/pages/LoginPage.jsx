import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Loader from '../components/Loader/Loader.jsx'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '', 
    password: '',
  });
  const [error, setError] = useState('');
  // Removed success state as navigation implies success
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();
  const { checkAuthStatus } = useContext(AuthContext); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.emailOrUsername, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Removed setSuccess as navigation implies success
        await checkAuthStatus(); 
        navigate('/profile'); 
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      // console.error('Login fetch error:', err); // Keep for important debug if necessary
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Log in to continue to your Poke Haven account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="emailOrUsername" className="sr-only">Email</label>
                <Input
                  id="emailOrUsername"
                  name="emailOrUsername" 
                  type="email" 
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address" 
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  disabled={isLoading} 
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading} 
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>
            )}
            {/* Success message removed */}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
              </div>
              <Link to="/forgot-password" className={`font-medium text-blue-600 hover:text-blue-500 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
                Forgot your password?
              </Link>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full group relative flex justify-center items-center" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size="small" /> 
                    <span className="ml-2">Logging in...</span>
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </div>
          </form>

          <div className="text-sm text-center text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className={`font-medium text-blue-600 hover:text-blue-500 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
