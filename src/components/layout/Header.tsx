import React, { useState } from 'react';
import { Menu, X, Home, CircleDollarSign, Plus, Users, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WalletButton from '../wallet/WalletButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-teal-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse" onClick={closeMenu}>
          <CircleDollarSign size={28} />
          <span className="text-2xl font-bold">جمعية</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 rtl:space-x-reverse hover:text-teal-200 transition-colors ${isActive('/') ? 'text-teal-200 font-medium' : ''}`}
          >
            <Home size={18} />
            <span>الرئيسية</span>
          </Link>
          <Link 
            to="/create" 
            className={`flex items-center space-x-2 rtl:space-x-reverse hover:text-teal-200 transition-colors ${isActive('/create') ? 'text-teal-200 font-medium' : ''}`}
          >
            <Plus size={18} />
            <span>إنشاء جمعية</span>
          </Link>
          <Link 
            to="/join" 
            className={`flex items-center space-x-2 rtl:space-x-reverse hover:text-teal-200 transition-colors ${isActive('/join') ? 'text-teal-200 font-medium' : ''}`}
          >
            <Users size={18} />
            <span>انضم إلى جمعية</span>
          </Link>
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-2 rtl:space-x-reverse hover:text-teal-200 transition-colors ${isActive('/dashboard') ? 'text-teal-200 font-medium' : ''}`}
          >
            <LogIn size={18} />
            <span>لوحة التحكم</span>
          </Link>
        </nav>

        <div className="hidden md:flex">
          <WalletButton />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-700 py-4 px-4 absolute w-full z-50">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-2 rounded hover:bg-teal-600 ${isActive('/') ? 'bg-teal-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              <Home size={18} />
              <span>الرئيسية</span>
            </Link>
            <Link 
              to="/create" 
              className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-2 rounded hover:bg-teal-600 ${isActive('/create') ? 'bg-teal-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              <Plus size={18} />
              <span>إنشاء جمعية</span>
            </Link>
            <Link 
              to="/join" 
              className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-2 rounded hover:bg-teal-600 ${isActive('/join') ? 'bg-teal-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              <Users size={18} />
              <span>انضم إلى جمعية</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-2 rounded hover:bg-teal-600 ${isActive('/dashboard') ? 'bg-teal-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              <LogIn size={18} />
              <span>لوحة التحكم</span>
            </Link>
            <div className="pt-2">
              <WalletButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;