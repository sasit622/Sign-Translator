
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
      <div className="signx-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold signx-gradient-text">SignX</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple transition-colors">
              Courses
            </Link>
            <Link to="/practice" className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple transition-colors">
              Practice
            </Link>
            <Link to="/library" className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple transition-colors">
              Library
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/practice" 
                className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice
              </Link>
              <Link 
                to="/library" 
                className="text-slate-700 dark:text-slate-200 hover:text-signx-purple dark:hover:text-signx-purple px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Library
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
