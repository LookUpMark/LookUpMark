import React, { useState } from 'react'; 
import { Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import MenuManagement from '../components/Admin/MenuManagement.jsx';
import OrderManagement from '../components/Admin/OrderManagement.jsx'; 

// Icons (ensure these are used or remove if not - they are used in adminNavLinks)
const OverviewIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const MenuIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>;
const OrdersIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>;
const UsersIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3M15 21a2 2 0 002-2v-.879a7.505 7.505 0 00-4.5-6.954M15 21h3a2 2 0 002-2v-.879a7.505 7.505 0 00-4.5-6.954M15 21L12 18M12 18l-3 3m3-3V6a3 3 0 00-3-3H9a3 3 0 00-3 3v12m12 0v-2.582a3.75 3.75 0 00-2.046-3.414L12 15m0 0L9.954 16.586A3.75 3.75 0 007.909 19.918V21"></path></svg>;
const SettingsIcon = () => <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const HamburgerIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>;

const AdminDashboardPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminNavLinks = [
    { name: 'Dashboard Overview', path: '/admin/overview', icon: <OverviewIcon /> },
    { name: 'Menu Management', path: '/admin/menu-management', icon: <MenuIcon /> },
    { name: 'Order Management', path: '/admin/order-management', icon: <OrdersIcon /> }, 
    { name: 'User Management', path: '/admin/user-management', icon: <UsersIcon /> },
    { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
  ];

  let activeSectionContent;
  if (currentPath === '/admin' || currentPath === '/admin/' || currentPath === '/admin/overview') {
    activeSectionContent = (
      <>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to the Admin Dashboard! (Content to be implemented)</p>
      </>
    );
  } else if (currentPath === '/admin/menu-management') {
    activeSectionContent = <MenuManagement />;
  } else if (currentPath === '/admin/order-management') { 
    activeSectionContent = <OrderManagement />;
  } else if (currentPath === '/admin/user-management') {
    activeSectionContent = <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">User Management Area (To be implemented)</h2>;
  } else if (currentPath === '/admin/settings') {
    activeSectionContent = <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Settings Area (To be implemented)</h2>;
  } else {
    activeSectionContent = <Navigate to="/admin/overview" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="md:hidden fixed top-18 left-2 z-30 p-2 bg-gray-700 text-white rounded-md"
          aria-controls="admin-sidebar"
          aria-expanded={isSidebarOpen}
          aria-label="Toggle admin menu" // Added aria-label
        >
          <HamburgerIcon />
        </button>

        <aside 
          id="admin-sidebar"
          className={`
            w-64 bg-gray-800 text-white p-4 sm:p-5 space-y-4 sm:space-y-6 shadow-lg print:hidden 
            fixed md:static md:translate-x-0 inset-y-0 left-0 z-20 
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            transition-transform duration-300 ease-in-out
            md:pt-0 pt-16 
          `}
        > 
          <h3 className="text-lg sm:text-xl font-semibold border-b border-gray-700 pb-2 sm:pb-3">Admin Menu</h3>
          <nav className="space-y-1 sm:space-y-2">
            {adminNavLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/admin/overview' && currentPath.startsWith(link.path) && link.path !== '/admin');
              return (
                <Link
                  key={link.name} // Using name as key, assuming names are unique
                  to={link.path}
                  onClick={() => isSidebarOpen && setIsSidebarOpen(false)} 
                  className={`
                    flex items-center px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        
        <main className={`flex-grow p-4 sm:p-6 md:p-10 bg-gray-50 overflow-auto transition-all duration-300 ease-in-out md:ml-64`}>
          {activeSectionContent}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
