import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Lightbulb, GitCompare, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              MH Engineering Colleges
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/colleges"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/colleges')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Browse Colleges</span>
            </Link>
            <Link
              to="/recommendations"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/recommendations')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Lightbulb className="h-4 w-4" />
              <span>Get Recommendations</span>
            </Link>
            <Link
              to="/compare"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/compare')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <GitCompare className="h-4 w-4" />
              <span>Compare</span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
