import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Settings, User } from 'lucide-react';
import AuthAnimatedForm from './components/AuthAnimatedForm';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/';

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <div className={`flex ${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      {!isAuthPage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isDark={isDark} />
      )}

      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 p-4">
        {!isAuthPage && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 w-64 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1110 3a7 7 0 016.65 13.65z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                title="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white" title="Notifications">
                <Bell size={18} />
              </button>
              <button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white" title="Settings">
                <Settings size={18} />
              </button>
              <button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white" title="User Profile">
                <User size={18} />
              </button>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<AuthAnimatedForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard isDark={isDark} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
