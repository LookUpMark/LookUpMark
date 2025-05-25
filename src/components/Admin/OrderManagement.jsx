import React, { useState, useEffect, useCallback } from 'react';
// import Button from '../Button/Button'; // Button component is not directly used for status update here
import Loader from '../Loader/Loader';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(null); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const apiBaseUrl = '/api/admin/orders';
  const orderStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

  const clearMessages = () => {
    setError(null);
    setSuccessMessage('');
  };

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    clearMessages();
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch orders: ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      // console.error("Fetch orders error:", err); // Removed for cleanup
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!orderId || !newStatus) {
      setError("Order ID and new status are required.");
      return;
    }
    
    setIsUpdatingStatus(orderId); 
    clearMessages();
    try {
      const response = await fetch(`${apiBaseUrl}/${orderId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const responseData = await response.json(); 
      if (!response.ok) {
        throw new Error(responseData.message || `Failed to update order status: ${response.statusText}`);
      }
      setSuccessMessage(`Order #${orderId} status updated to "${newStatus}" successfully!`);
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus, updated_at: new Date().toISOString() } : order
      ));
    } catch (err) {
      setError(err.message);
      // console.error(`Error updating status for order ${orderId}:`, err); // Removed for cleanup
    } finally {
      setIsUpdatingStatus(null); 
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return dateString; 
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Order Management</h2>

      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center my-4">{error}</p>}
      {successMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md text-center my-4">{successMessage}</p>}
      
      {isLoading && orders.length === 0 && <div className="text-center py-4"><Loader size="large" /></div>}
      {!isLoading && !error && orders.length === 0 && (
        <p className="text-gray-600 text-center py-4">No orders found.</p>
      )}

      {orders.length > 0 && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div>{order.username || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{order.email || `User ID: ${order.user_id}`}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">${order.total_price ? order.total_price.toFixed(2) : '0.00'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800' 
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-normal text-sm text-gray-700 max-w-xs break-words">{order.delivery_address || 'N/A'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {isUpdatingStatus === order.id ? (
                        <div className="flex items-center justify-center w-full max-w-[150px]">
                           <Loader size="small" />
                           <span className="ml-2 text-xs">Updating...</span>
                        </div>
                      ) : (
                        <select
                          value={order.status} 
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="block w-full max-w-[150px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-1.5 text-xs"
                          disabled={isUpdatingStatus !== null && isUpdatingStatus !== order.id} 
                        >
                          {orderStatuses.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
