import React from 'react';
import heroBannerImage from '../../assets/images/hero-banner.avif';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center text-brand-white select-none"
      style={{
        backgroundImage: `url(${heroBannerImage})`,
        minHeight: '500px',
        height: 'calc(100vh - 80px)',
        maxHeight: '712px',
        willChange: 'transform',
        animation: 'floatBackground 20s ease-in-out infinite alternate',
      }}
      role="banner"
      aria-label="Promotional hero banner with sale information"
    >
      {/* Multi-layer overlay for contrast and depth */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

      {/* Content container */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-xl text-center md:text-left animate-fadeInUp">
          <span className="block text-sm sm:text-base font-medium uppercase tracking-widest text-gray-300 mb-3 md:mb-5 drop-shadow-md">
            LIFESTYLE COLLECTION
          </span>

          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-5 md:mb-8 drop-shadow-lg">
            MEN
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 md:mb-8 drop-shadow-md">
            SALE UP TO{' '}
            <span className="text-brand-accent-red tracking-wide">30% OFF</span>
          </p>

          <p className="hidden md:block text-sm sm:text-base text-gray-300 mb-8 md:mb-12 drop-shadow-md">
            Get free shipping on orders over $99.00
          </p>

          <button
            className="inline-flex items-center gap-2 bg-brand-dark text-brand-white font-semibold text-sm sm:text-base
                       px-8 py-3 sm:px-10 sm:py-4 rounded-md
                       hover:bg-opacity-80 shadow-lg hover:shadow-brand-accent-red transition-transform duration-300
                       transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-accent-red focus:ring-offset-2 focus:ring-offset-brand-dark"
            aria-label="Shop now and explore men lifestyle collection"
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating background animation keyframes */}
      <style>{`
        @keyframes floatBackground {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;