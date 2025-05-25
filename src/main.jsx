import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* Wrap App (or relevant part) with CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
