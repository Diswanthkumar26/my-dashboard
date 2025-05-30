import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Bell, Settings, User } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthAnimatedForm from "./components/AuthAnimatedForm";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/";

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleLogout = () => {
    toast.success("Logout Successfully", { position: "top-center" });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAuthPage) {
    return (
      <div
        className={`min-h-screen w-full ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <AuthAnimatedForm />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDark={isDark}
      />

      <div
        className={`flex-1 transition-all duration-300 p-4 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`rounded-md pl-10 pr-4 py-2 w-64 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1110 3a7 7 0 016.65 13.65z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`p-2 rounded-md ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              className={`p-2 rounded-md ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title="Settings"
            >
              <Settings size={18} />
            </button>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className={`p-2 rounded-md ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                title="User Profile"
              >
                <User size={18} />
              </button>

              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-52 shadow-md rounded-md overflow-hidden z-20 ${
                    isDark ? "bg-zinc-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="font-semibold text-sm">RxQ</p>
                    <p className="text-xs text-gray-400">Rafiq@gmail.com</p>
                  </div>
                  <ul>
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                      <Settings size={16} /> Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 12h4"
                        />
                      </svg>
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard isDark={isDark} />
              </ProtectedRoute>
            }
          />
          <Route path="/post-form" element={<CreatePost isDark={isDark} />} />
          <Route path="/product-form" element={<CreateProduct isDark={isDark} />} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
}
