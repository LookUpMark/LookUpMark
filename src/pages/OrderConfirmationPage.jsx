import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';

// Placeholder Checkmark/Success Icon
const SuccessIcon = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const OrderConfirmationPage = () => {
  // Placeholder order data - in a real app, this would come from state or props
  const orderDetails = {
    orderNumber: 'POKEHAVEN12345',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    items: [
      { id: 1, name: 'Classic Ahi Tuna Bowl', quantity: 1, price: 14.99 },
      { id: 2, name: 'Spicy Salmon Delight', quantity: 2, price: 15.99 },
    ],
    totalAmount: 46.97, // (14.99 * 1) + (15.99 * 2) - assuming no tax for simplicity here
    deliveryAddress: '123 Pineapple Lane, Honolulu, HI 96815',
    estimatedTime: '30-45 minutes for delivery', // Or "ready for pickup in 20 minutes"
  };

  const itemsSummary = orderDetails.items.map(item => `${item.name} (x${item.quantity})`).join(', ');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8 bg-white p-8 sm:p-10 lg:p-12 rounded-xl shadow-2xl text-center">
          
          {/* Confirmation Message Section */}
          <div>
            <SuccessIcon />
            <h1 className="text-3xl lg:text-4xl font-extrabold text-green-600">
              Mahalo! Your Order is Confirmed!
            </h1>
            <p className="mt-3 text-md lg:text-lg text-gray-600">
              We've received your order and are getting it ready with extra Aloha. 
              You'll receive an email confirmation shortly with all the details.
            </p>
          </div>

          {/* Order Summary (Placeholder) */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-left space-y-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 text-center">Order Details</h2>
            <div>
              <span className="font-medium text-gray-700">Order Number:</span>
              <p className="text-gray-600">{orderDetails.orderNumber}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <p className="text-gray-600">{orderDetails.date}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Items Purchased:</span>
              <p className="text-gray-600">{itemsSummary}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Total Amount:</span>
              <p className="text-gray-600 font-bold">${orderDetails.totalAmount.toFixed(2)}</p>
            </div>
            {orderDetails.deliveryAddress && (
              <div>
                <span className="font-medium text-gray-700">Delivery Address:</span>
                <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
              </div>
            )}
          </div>

          {/* Estimated Delivery/Pickup Time (Placeholder) */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Estimated Time</h3>
            <p className="text-gray-600 mt-1">{orderDetails.estimatedTime}</p>
          </div>

          {/* Call to Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0 sm:flex sm:flex-row-reverse sm:justify-center sm:space-x-4 sm:space-x-reverse">
            <Button
              as={Link} // Make button act as a Link
              to="/menu"
              variant="primary"
              size="large"
              className="w-full sm:w-auto"
            >
              Continue Shopping
            </Button>
            <Button
              as={Link}
              to={`/track-order/${orderDetails.orderNumber}`} // Example route, will be 404 for now
              variant="secondary"
              size="large"
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Track Your Order
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
