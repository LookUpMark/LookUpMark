import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserProfilePage from './pages/UserProfilePage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'; // Import ProtectedRoute
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'; // Import UnauthorizedPage

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar and Footer are now typically part of individual page layouts for more control */}
      {/* For example, Navbar could be in LandingPage, MenuPage, etc. */}
      {/* Or, a main Layout component could wrap routes that share Navbar/Footer */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> 

        {/* Protected Routes for Authenticated Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/cart" element={<CartPage />} /> 
          {/* OrderConfirmationPage is often public post-checkout, but specific order history/details should be protected */}
          {/* For now, let's assume order confirmation is public, but a route like /orders (list) or /orders/:id (detail) would be protected */}
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} /> 
          {/* Example for a protected specific order detail page: */}
          {/* <Route path="/orders/:orderId" element={<OrderDetailPage />} /> */}
        </Route>

        {/* Protected Routes for Admin Users */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          {/* 
            AdminDashboardPage itself might have further nested routing using <Outlet />
            if it acts as a layout for various admin sections.
          */}
          <Route path="/admin" element={<AdminDashboardPage />}>
            {/* Example of how nested admin routes might look if AdminDashboardPage uses Outlet:
            <Route path="overview" element={<AdminOverviewComponent />} />
            <Route path="menu-management" element={<AdminMenuManagementComponent />} />
            ...etc. 
            For now, AdminDashboardPage itself is the protected component.
            If AdminDashboardPage has its own <Routes> and <Outlet>, this structure is fine.
            The current AdminDashboardPage from previous subtasks is a single page.
            */}
          </Route>
          {/* If you had separate pages for admin functionalities instead of them being part of AdminDashboardPage: */}
          {/* <Route path="/admin/menu-management" element={<AdminMenuManagementPage />} /> */}
          {/* <Route path="/admin/order-management" element={<AdminOrderManagementPage />} /> */}
        </Route>
        
        {/* Not Found Route - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
