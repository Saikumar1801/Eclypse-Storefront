import React, { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-900">
      <Header />

      <main
        className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8
                   animate-fade-in py-8"
        role="main"
      >
        {children}
      </main>

      <footer
        className="bg-white shadow-inner border-t border-gray-200 py-6 mt-auto"
        role="contentinfo"
      >
        <Footer />
      </footer>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg
                     transition-transform transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default MainLayout;