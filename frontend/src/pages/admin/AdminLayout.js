import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiFilm, FiUsers, FiGrid, FiGlobe, FiBarChart2, FiList, FiHome, FiMenu, FiX } from 'react-icons/fi';

const menuItems = [
  { path: '/admin', icon: FiBarChart2, label: 'Thống kê', exact: true },
  { path: '/admin/movies', icon: FiFilm, label: 'Quản lý phim' },
  { path: '/admin/episodes', icon: FiList, label: 'Quản lý tập phim' },
  { path: '/admin/users', icon: FiUsers, label: 'Người dùng' },
  { path: '/admin/genres', icon: FiGrid, label: 'Thể loại' },
  { path: '/admin/countries', icon: FiGlobe, label: 'Quốc gia' },
];

function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-dark-500 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-100 transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <Link to="/admin" className="text-primary font-bold text-xl">Admin Panel</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition text-sm ${
                isActive(item)
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-dark-400 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
          <hr className="border-gray-800 my-4" />
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-400 hover:text-white transition text-sm"
          >
            <FiHome size={18} />
            <span>Về trang chủ</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-dark-100 border-b border-gray-800 flex items-center px-4 lg:px-6 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white mr-4">
            <FiMenu size={20} />
          </button>
          <h1 className="text-white font-semibold">Dashboard</h1>
        </header>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
