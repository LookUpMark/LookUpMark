import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext.jsx'; 
import Loader from '../components/Loader/Loader.jsx'; 

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart, 
  } = useCart();
  const { isAuthenticated, user } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = getCartTotal();
  const estimatedTaxes = 5.85; 
  const orderTotal = parseFloat((subtotal + estimatedTaxes).toFixed(2));

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handlePlaceOrder = async () => {
    setCheckoutError('');
    if (!isAuthenticated || !user) {
      setCheckoutError("Please log in to place an order.");
      navigate('/login'); 
      return;
    }
    if (!deliveryAddress.trim()) {
      setCheckoutError("Delivery address is required.");
      return;
    }
    if (phoneNumber && !/^\+?[0-9\s-()]{7,20}$/.test(phoneNumber)) {
        setCheckoutError("Please enter a valid phone number.");
        return;
    }

    setIsPlacingOrder(true);

    const orderData = {
      userId: user.id,
      items: cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtPurchase: item.price, 
      })),
      totalPrice: orderTotal, 
      deliveryAddress: deliveryAddress,
      phoneNumber: phoneNumber,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      if (response.ok) {
        clearCart();
        navigate(`/order-confirmation?orderId=${responseData.order?.id || ''}`);
      } else {
        setCheckoutError(responseData.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      // console.error('Place order fetch error:', err); // Keep for important debug if necessary
      setCheckoutError('An error occurred while placing your order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  const placeOrderButtonDisabled = !isAuthenticated || cartItems.length === 0 || !deliveryAddress.trim() || isPlacingOrder;

  if (cartItems.length === 0 && !isAuthenticated) { 
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Your Cart is Empty</h1>
          <p className="text-md sm:text-lg text-gray-600 mb-8">Log in and add some delicious poke bowls to your cart!</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button as={Link} to="/login" variant="primary" size="large" className="shadow-md w-full sm:w-auto">Log In</Button>
            <Button as={Link} to="/menu" variant="secondary" size="large" className="shadow-md w-full sm:w-auto">Browse Menu</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Your Cart is Empty</h1>
          <p className="text-md sm:text-lg text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button as={Link} to="/menu" variant="primary" size="large" className="shadow-md">Start Shopping</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Your Shopping Cart
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 items-start">
            <section aria-labelledby="cart-heading" className="lg:col-span-7 bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 lg:mb-0">
              <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex flex-col sm:flex-row py-4 sm:py-6">
                    <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 self-center sm:self-start">
                      <img
                        src={item.image || `https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${item.name.split(' ')[0]}`}
                        alt={item.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-md sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="mt-1 text-sm font-medium text-gray-700">${item.price ? item.price.toFixed(2) : '0.00'}</p>
                      </div>
                      <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center mt-2 sm:mt-0">
                          <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                          <Input
                            type="number"
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            value={item.quantity}
                            min="0"
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="w-20 text-center text-sm py-1.5"
                            disabled={isPlacingOrder} 
                          />
                        </div>
                        <p className="mt-2 sm:mt-0 text-sm font-medium text-gray-900">
                          Item Total: ${(item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : '0.00')}
                        </p>
                        <Button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          variant="outline"
                          size="small"
                          className="text-red-600 border-red-500 hover:bg-red-50 flex items-center mt-2 sm:mt-0 sm:ml-4 px-2 py-1 text-xs"
                          disabled={isPlacingOrder} 
                        >
                          <TrashIcon /><span className="ml-1.5">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="summary-heading"
              className="lg:col-span-5 bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 sticky top-24"
            >
              <h2 id="summary-heading" className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
                Order Summary
              </h2>
              <dl className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm sm:text-md text-gray-600">Subtotal</dt>
                  <dd className="text-sm sm:text-md font-medium text-gray-800">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                  <dt className="flex items-center text-sm sm:text-md text-gray-600">Estimated Taxes</dt>
                  <dd className="text-sm sm:text-md font-medium text-gray-800">${estimatedTaxes.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                  <dt className="text-lg sm:text-xl font-bold text-gray-900">Order Total</dt>
                  <dd className="text-lg sm:text-xl font-bold text-gray-900">${orderTotal.toFixed(2)}</dd>
                </div>
              </dl>

              {isAuthenticated && cartItems.length > 0 && (
                <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Checkout Details</h3>
                  <form className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <textarea
                        id="deliveryAddress"
                        name="deliveryAddress"
                        rows="3"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="123 Poke Lane, Honolulu, HI"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                        disabled={isPlacingOrder}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                      <Input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full"
                        placeholder="e.g., (555) 123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={isPlacingOrder}
                      />
                    </div>
                  </form>
                </div>
              )}

              {checkoutError && (
                <p className="mt-4 text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{checkoutError}</p>
              )}

              <div className="mt-8 sm:mt-10">
                {isAuthenticated ? (
                  <Button
                    onClick={handlePlaceOrder}
                    variant="primary"
                    size="large"
                    className="w-full shadow-lg text-sm sm:text-base flex justify-center items-center"
                    disabled={placeOrderButtonDisabled}
                  >
                    {isPlacingOrder ? (
                      <>
                        <Loader size="small" />
                        <span className="ml-2">Placing Order...</span>
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="large"
                    className="w-full shadow-lg text-sm sm:text-base"
                    onClick={() => navigate('/login')}
                  >
                    Log In to Checkout
                  </Button>
                )}
              </div>

              <div className="mt-4 sm:mt-6 text-center text-sm">
                <p>
                  or{' '}
                  <Link to="/menu" className={`font-medium text-blue-600 hover:text-blue-500 ${isPlacingOrder ? 'pointer-events-none opacity-50' : ''}`}>
                    Continue Shopping <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
