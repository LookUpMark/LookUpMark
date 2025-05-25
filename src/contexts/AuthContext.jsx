import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    // No setLoading(true) here to prevent layout shift on every call from login/signup
    // It's primarily for the initial load.
    try {
      const response = await fetch('/api/auth/status');
      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // console.error('Auth status check failed:', response.statusText); // Keep for important debug if necessary, or remove
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      // console.error('Error fetching auth status:', error); // Keep for important debug if necessary, or remove
    } finally {
      setLoading(false); // Ensure loading is false after initial check
    }
  }, []);

  useEffect(() => {
    setLoading(true); // Set loading true for initial check
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Login function in context is mostly for triggering a global state update via checkAuthStatus.
  // Actual API call is handled by the LoginPage component.
  const login = async () => { 
    // This function's primary role within the context might be to re-trigger auth status check
    // if login logic were more centralized here. Currently, LoginPage handles the API call.
    // For consistency, it can call checkAuthStatus if needed.
    await checkAuthStatus();
  };

  const logout = async () => {
    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        if(response.ok) {
            setIsAuthenticated(false);
            setUser(null);
        } else {
            // console.error('Logout failed:', response.statusText); // Keep for important debug if necessary, or remove
        }
    } catch (error) {
        // console.error('Error during logout:', error); // Keep for important debug if necessary, or remove
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, checkAuthStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
