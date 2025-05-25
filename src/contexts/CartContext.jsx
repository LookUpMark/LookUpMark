import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          // console.warn("Stored cart is not an array, initializing empty."); // Optional: keep for debugging if issues persist
          setCartItems([]);
        }
      } catch (error) {
        // console.error("Error parsing stored cart:", error); // Optional: keep for debugging if issues persist
        setCartItems([]); 
      }
    }
  }, []);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (!item || item.id === undefined) {
      // console.error("addToCart: item or item.id is undefined", item); // Optional: keep for debugging
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 } // Ensure quantity is a number
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    const numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      removeFromCart(itemId); 
    } else {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: numQuantity }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0); // Ensure price and quantity are numbers
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0); // Ensure quantity is a number
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
