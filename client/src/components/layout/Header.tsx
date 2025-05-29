import React, { useState, useEffect, useCallback } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import CartPreview from '../cart/CartPreview';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const { getCartTotalQuantity } = useCart();
  const cartItemCount = getCartTotalQuantity();

  // Scroll shadow toggle
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle with localStorage persistence
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', (!prev).toString());
      return !prev;
    });
  };

  // Close menus on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsCartPreviewOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Close mobile menu on nav link click (improved UX)
  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg bg-white/90 dark:bg-gray-900/90' : 'shadow-sm bg-white/80 dark:bg-gray-900/80'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-500 text-transparent bg-clip-text select-none"
              aria-label="Eclypse Home"
            >
              Eclypse
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 dark:bg-indigo-400 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="search"
                  aria-label="Search products"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-52 text-sm rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-200"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3 dark:text-gray-400" />
              </div>

              {/* Account */}
              <button
                aria-label="Account"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              >
                <UserIcon className="h-6 w-6" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
                className="relative text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-transform hover:scale-110"
                aria-label="Cart"
                aria-expanded={isCartPreviewOpen}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
                className="relative text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                aria-label="Cart"
                aria-expanded={isCartPreviewOpen}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-semibold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop Overlay when menu or cart is open */}
        {(isMobileMenuOpen || isCartPreviewOpen) && (
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartPreviewOpen(false);
            }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 cursor-pointer"
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <nav
          className={`lg:hidden fixed top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 py-6 shadow-lg space-y-6 z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
          aria-label="Mobile menu"
        >
          {/* Search */}
          <div className="relative">
            <input
              type="search"
              aria-label="Search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-200"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3 dark:text-gray-400" />
          </div>

          {/* Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-base font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              onClick={handleNavLinkClick}
            >
              {link.name}
            </Link>
          ))}

          {/* Account */}
          <Link
            href="/account"
            className="flex items-center gap-3 text-base font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <UserIcon className="h-5 w-5" />
            My Account
          </Link>
        </nav>
      </header>

      {/* Cart Preview */}
      <CartPreview isOpen={isCartPreviewOpen} onClose={() => setIsCartPreviewOpen(false)} />
    </>
  );
};

export default Header;
