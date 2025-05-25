import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const UserProfilePage = () => {
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (passwordError) setPasswordError('');
    if (passwordSuccess) setPasswordSuccess('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordFormData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    // Placeholder for password update logic
    // console.log('Password update attempt:', passwordFormData); // Removed for cleanup
    setPasswordSuccess('Password updated successfully! (This is a placeholder)');
    setPasswordFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  // Placeholder data - in a real app, this would come from API/context
  const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const placeholderOrders = [
    { id: 'ORD12345', date: '2023-10-15', total: '$45.98', status: 'Delivered' },
    { id: 'ORD67890', date: '2023-11-01', total: '$28.50', status: 'Processing' },
    // Add more placeholder orders if needed
  ];

  const placeholderAddresses = [
    { id: 'addr1', type: 'Primary', details: '123 Main Street, Anytown, USA 12345' },
    // Add more placeholder addresses if needed
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              My Profile
            </h1>
          </header>

          <div className="space-y-10 lg:space-y-12">
            {/* User Information Section */}
            <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                Personal Details
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <p className="text-gray-800">{userDetails.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-800">{userDetails.email}</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="medium" className="text-blue-600 border-blue-500 hover:bg-blue-50">
                    Edit Information
                  </Button>
                </div>
              </div>
            </section>

            {/* Order History Section */}
            <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                My Orders
              </h2>
              {placeholderOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {placeholderOrders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">You have no recent orders.</p>
              )}
              <div className="mt-6">
                <Button variant="secondary" size="medium" className="bg-gray-200 hover:bg-gray-300 text-gray-700">
                  View All Orders
                </Button>
              </div>
            </section>

            {/* Saved Addresses Section */}
            <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                My Addresses
              </h2>
              {placeholderAddresses.length > 0 ? (
                placeholderAddresses.map(address => (
                  <div key={address.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-700">{address.type}</h3>
                    <p className="text-gray-600 text-sm">{address.details}</p>
                    <Button variant="outline" size="small" className="mt-2 text-xs text-blue-600 border-blue-500 hover:bg-blue-50">Edit</Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No saved addresses.</p>
              )}
              <div className="mt-6">
                <Button variant="primary" size="medium">
                  Add New Address
                </Button>
              </div>
            </section>

            {/* Change Password Section */}
            <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                Change Password
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    placeholder="Enter your current password"
                    value={passwordFormData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    placeholder="Enter new password (min. 8 characters)"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    required
                    placeholder="Confirm your new password"
                    value={passwordFormData.confirmNewPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                {passwordError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{passwordError}</p>}
                {passwordSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{passwordSuccess}</p>}
                <div>
                  <Button type="submit" variant="primary" size="large">
                    Update Password
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
