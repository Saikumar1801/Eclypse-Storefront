import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
// import forms from '@tailwindcss/forms';
// import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        'brand-dark': '#1A1A1A',
        'brand-gray': '#6B7280',
        'brand-light-gray': '#E5E7EB',
        'brand-light-gray-bg': '#F3F4F6',
        'brand-white': '#FFFFFF',
        'brand-accent-red': '#FF3333',
        'brand-star-yellow': '#FFC107',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'hero-title-lg': '76px',
        'hero-title-md': '48px',
        'heading-1': '36px',
        'heading-2': '24px',
        'heading-3': '20px',
      },
      screens: {
        'xs': '390px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      boxShadow: {
        'card': '0px 2px 4px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 5px 15px rgba(0, 0, 0, 0.1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [
    typography,
    // forms,
    // aspectRatio,
  ],
};
