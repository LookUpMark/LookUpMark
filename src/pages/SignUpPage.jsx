import React, { useState } from 'react'; // Removed useContext as it's not used
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
// import { AuthContext } from '../contexts/AuthContext.jsx'; // Removed AuthContext import
import Loader from '../components/Loader/Loader.jsx'; 

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();
  // const { checkAuthStatus } = useContext(AuthContext); // Removed as not used in current flow

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) { 
        setSuccess(data.message || 'Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      } else {
        setError(data.message || 'Sign up failed. Please try again.');
      }
    } catch (err) {
      // console.error('Sign up fetch error:', err); // Keep for important debug if necessary
      setError('An error occurred during sign up. Please try again.');
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
              Create Your Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join Poke Haven and start building your perfect bowl today!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Choose a Username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Your Email Address"
                  value={formData.email}
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
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Create a Password (min. 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 text-center bg-green-100 p-3 rounded-md">{success}</p>
            )}

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
                    <span className="ml-2">Creating Account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>

          <div className="text-sm text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/login" className={`font-medium text-blue-600 hover:text-blue-500 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUpPage;
