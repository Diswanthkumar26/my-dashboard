import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Tag,
  Eye,
  Clipboard,
  Calendar,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, isDark }) => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-700 transition";

  return (
    <div
      className={`fixed top-0 left-0 z-30 h-full overflow-y-auto shadow-lg transition-all duration-300
        ${isOpen ? "w-64" : "w-16"} ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center font-bold border rounded-full">
              RQ
            </div>
            <span className="text-lg font-semibold">RxQ Console</span>
          </div>
        )}
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="mt-4 flex flex-col space-y-4">
        <Link to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} /> {isOpen && <span>Dashboard</span>}
        </Link>

        <div className="px-4 text-xs text-gray-400 uppercase">
          {isOpen && "Management"}
        </div>
        <Link to="/posts" className={linkClass}>
          <FileText size={20} /> {isOpen && <span>Post Table Info</span>}
        </Link>
        <Link to="/projects" className={linkClass}>
          <Folder size={20} /> {isOpen && <span>Project Table Info</span>}
        </Link>
        <Link to="/categories" className={linkClass}>
          <Tag size={20} /> {isOpen && <span>Category & Tag Info</span>}
        </Link>
        <Link to="/visitors" className={linkClass}>
          <Eye size={20} /> {isOpen && <span>Visitors Info</span>}
        </Link>

        <div className="px-4 text-xs text-gray-400 uppercase">
          {isOpen && "Forms"}
        </div>
        <Link to="/post-form" className={linkClass}>
          <Clipboard size={20} /> {isOpen && <span>Post Form</span>}
        </Link>
        <Link to="/product-form" className={linkClass}>
          <Clipboard size={20} /> {isOpen && <span>Product Form</span>}
        </Link>

        <div className="px-4 text-xs text-gray-400 uppercase">
          {isOpen && "Components"}
        </div>
        <Link to="/calendar" className={linkClass}>
          <Calendar size={20} /> {isOpen && <span>Calendar</span>}
        </Link>

        <div className="px-4 text-xs text-gray-400 uppercase">
          {isOpen && "Settings"}
        </div>
        <Link to="/faq" className={linkClass}>
          <HelpCircle size={20} /> {isOpen && <span>FAQ Page</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
