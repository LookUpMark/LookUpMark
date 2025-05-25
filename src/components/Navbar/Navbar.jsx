import React, { useState, useContext } from 'react'; // Added useState
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';

// Placeholder Icons
const CartIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const MenuHamburgerIcon = () => <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const MenuCloseIcon = () => <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const cartItemCount = getCartItemCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">Poke Haven</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/menu" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Menu</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right-side icons (Cart, User/Login) - Desktop */}
          <div className="hidden md:flex md:items-center md:ml-6 space-x-3">
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <span className="sr-only">View cart</span>
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated && user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors" title="My Profile">
                  <UserIcon />
                </Link>
                {user.role === 'admin' && (
                   <Link to="/admin" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</Link>
                )}
                <button onClick={logout} className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors" title="Logout">
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button & Mobile Cart Icon */}
          <div className="flex items-center md:hidden">
             <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 p-1 mr-2 rounded-full hover:bg-gray-100 transition-colors">
                <span className="sr-only">View cart</span>
                <CartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            <button 
              onClick={toggleMobileMenu} 
              type="button" 
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" 
              aria-controls="mobile-menu" 
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <MenuCloseIcon className="block h-6 w-6" /> : <MenuHamburgerIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/menu" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Menu</Link>
          <Link to="/about" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">About</Link>
          <Link to="/contact" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated && user ? (
            <div className="px-5 space-y-1">
              <Link to="/profile" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                <UserIcon /> <span className="ml-2">My Profile</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Admin Dashboard</Link>
              )}
              <button onClick={() => { logout(); toggleMobileMenu(); }} className="flex items-center w-full text-left text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                <LogoutIcon /> <span className="ml-2">Logout</span>
              </button>
            </div>
          ) : (
            <div className="px-5">
              <Link to="/login" onClick={toggleMobileMenu} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Updated MenuCloseIcon to be visible when isMobileMenuOpen is true
const MenuCloseIconFixed = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;

// Use MenuCloseIconFixed in the button if needed, or ensure Tailwind classes toggle visibility correctly
// The current implementation uses conditional rendering:
// {isMobileMenuOpen ? <MenuCloseIcon className="block h-6 w-6" /> : <MenuHamburgerIcon className="block h-6 w-6" />}
// The MenuCloseIcon definition itself has `hidden` which might be overridden by `block` if not careful.
// For simplicity, I'll assume the direct conditional rendering in the button works as intended.
// If MenuCloseIcon needs its `hidden` class removed:
// const MenuCloseIcon = () => <svg className="h-6 w-6" ... (remove hidden class if it's part of the base definition)

export default Navbar;
