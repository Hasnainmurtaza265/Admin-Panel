import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LogsPage from './pages/LogsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import {
  initialStats,
  revenueData,
  categorySalesData,
  initialUsers,
  initialProducts,
  initialOrders,
  trafficSourceData,
  deviceAnalyticsData,
  initialActivityLogs,
  initialNotifications,
} from './data/mockData.js';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // App dataset states
  const [stats, setStats] = useState(initialStats);
  const [revenueTimeline, setRevenueTimeline] = useState(revenueData);
  const [categorySales, setCategorySales] = useState(categorySalesData);
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [logs, setLogs] = useState(initialActivityLogs);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Quick modals and details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Current admin user
  const [currentUser, setCurrentUser] = useState({
    name: 'Hasnain Murtaza',
    email: 'admin@gamil.com',
    role: 'Super Admin',
    avatar: 'https://avatars.githubusercontent.com/u/248255139?s=400&u=b1ba33760dedd783e7904909ec7de1ba5f38294b&v=4',
  });

  // Dark mode effect on root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dynamic badge counts for sidebar
  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing').length;

  const handleExportReport = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status'].join(','),
      ...orders.map((o) =>
        [o.id, `"${o.customer}"`, o.email, o.date, o.total.toFixed(2), o.status].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `executive_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectOrderAndNavigate = (order) => {
    setSelectedOrder(order);
    setActivePage('orders');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Navigation Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        counts={{
          usersCount: users.length,
          lowStockCount: lowStockCount,
          pendingOrdersCount: pendingOrdersCount,
        }}
      />

      {/* Top Application Header */}
      <Header
        isCollapsed={isSidebarCollapsed}
        setIsMobileOpen={setIsMobileSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenNewProduct={() => {
          setActivePage('products');
          setIsAddProductModalOpen(true);
        }}
        onExportReport={handleExportReport}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main
        id="main-content-viewport"
        className={`flex-1 transition-all duration-200 ease-in-out pt-16 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
      >
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              stats={stats}
              revenueTimeline={revenueTimeline}
              categorySales={categorySales}
              orders={orders}
              users={users}
              onNavigate={setActivePage}
              onSelectOrder={handleSelectOrderAndNavigate}
            />
          )}

          {activePage === 'analytics' && (
            <AnalyticsPage
              trafficSources={trafficSourceData}
              deviceAnalytics={deviceAnalyticsData}
            />
          )}

          {activePage === 'users' && (
            <UsersPage
              users={users}
              setUsers={setUsers}
              searchTerm={searchTerm}
            />
          )}

          {activePage === 'products' && (
            <ProductsPage
              products={products}
              setProducts={setProducts}
              searchTerm={searchTerm}
              isAddModalOpen={isAddProductModalOpen}
              setIsAddModalOpen={setIsAddProductModalOpen}
            />
          )}

          {activePage === 'orders' && (
            <OrdersPage
              orders={orders}
              setOrders={setOrders}
              searchTerm={searchTerm}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              onExportReport={handleExportReport}
            />
          )}

          {activePage === 'logs' && (
            <LogsPage
              logs={logs}
              setLogs={setLogs}
              searchTerm={searchTerm}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </div>
      </main>
    </div>
  );
}
