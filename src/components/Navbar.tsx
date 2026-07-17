import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Bot, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'text-brand-secondary border-b-2 border-brand-secondary rounded-none'
        : 'text-brand-muted hover:text-white hover:bg-slate-800/40'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white font-extrabold text-xl tracking-tight">
              <Bot className="h-6 w-6 text-brand-primary animate-pulse" />
              <span>
                Campaign<span className="text-brand-secondary">Craft</span>
                <span className="text-brand-primary text-sm font-semibold ml-1 px-1.5 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/explore" className={navLinkClass('/explore')}>Explore</Link>

            {isAuthenticated ? (
              <>
                <Link to="/generator" className={navLinkClass('/generator')}>AI Copywriter</Link>
                <Link to="/analyzer" className={navLinkClass('/analyzer')}>Data Intelligence</Link>
                <Link to="/items/add" className={navLinkClass('/items/add')}>Launch Campaign</Link>
                <Link to="/items/manage" className={navLinkClass('/items/manage')}>Manage</Link>
              </>
            ) : (
              <>
                <Link to="/about" className={navLinkClass('/about')}>About</Link>
                <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 bg-slate-900/60 pl-3 pr-2 py-1.5 rounded-full border border-white/5">
                {/* Avatar — Google photo or fallback initial */}
                {(user as any)?.photoURL ? (
                  <img
                    src={(user as any).photoURL}
                    alt={user?.name}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-brand-secondary/40"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="h-6 w-6 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-[10px] font-bold text-brand-primary">
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                )}
                <span className="text-xs text-brand-muted font-medium">
                  {user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 hover:bg-brand-accent/20 text-brand-accent transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-brand-muted hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary hover:bg-brand-primary/90 text-white transition-all shadow-md shadow-brand-primary/20 glow-btn"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-muted hover:text-white hover:bg-slate-800/40 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-white/5 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/explore') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
              }`}
            >
              Explore
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/generator"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/generator') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  AI Copywriter
                </Link>
                <Link
                  to="/analyzer"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/analyzer') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Data Intelligence
                </Link>
                <Link
                  to="/items/add"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/items/add') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Launch Campaign
                </Link>
                <Link
                  to="/items/manage"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/items/manage') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Manage
                </Link>
                <div className="pt-4 pb-2 border-t border-white/5 px-3">
                  <div className="flex items-center space-x-3 mb-3">
                    {(user as any)?.photoURL ? (
                      <img
                        src={(user as any).photoURL}
                        alt={user?.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-brand-secondary/40"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="h-8 w-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-xs font-bold text-brand-primary">
                        {user?.name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-medium text-white">{user?.name}</div>
                      <div className="text-xs text-brand-muted">{user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-accent/15 border border-brand-accent/25 hover:bg-brand-accent/25 text-brand-accent transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/about') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/contact') ? 'text-brand-secondary bg-slate-800/30' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-white/5 space-y-2 px-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-brand-muted hover:text-white bg-slate-900/60 border border-white/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
