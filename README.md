# Eclypse Storefront - E-commerce Webpage Recreation

This project is a recreation of a basic e-commerce webpage based on Figma designs. It was developed as a coding assignment to assess frontend and backend development skills using React, TailwindCSS, TypeScript, and NodeJS.

![screencapture-localhost-5173-2025-05-29-21_50_57](https://github.com/user-attachments/assets/26c3261a-85b7-4097-8ebb-8bfd95a1051e)

## Table of Contents

*   [Project Overview](#project-overview)
*   [Features Implemented](#features-implemented)
*   [Core Technologies Used](#core-technologies-used)
*   [Bonus Enhancements & Creative Additions](#bonus-enhancements--creative-additions)
*   [Project Structure](#project-structure)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation & Setup](#installation--setup)
    *   [Running the Application](#running-the-application)
*   [Available Scripts](#available-scripts)
*   [Future Improvements (Optional)](#future-improvements-optional)
*   [Acknowledgements (Optional)](#acknowledgements-optional)

---

## Project Overview

The primary objective was to accurately recreate the UI/UX from the provided Figma designs, focusing on functional components, basic state management, responsive layout, and interaction with a simple NodeJS backend serving dummy data.

The application features a homepage displaying various product sections, product cards, filtering and sorting capabilities, and a basic client-side shopping cart.

---

## Features Implemented

### Core Requirements:

*   **Accurate UI Recreation:** Implemented UI based on Figma designs for desktop and mobile.
*   **Responsive Layout:** Ensured the application adapts to various screen sizes (mobile, tablet, desktop).
*   **Functional Components:** Built with React functional components and hooks.
*   **TypeScript:** Entire codebase (frontend and backend) written in TypeScript for type safety.
*   **TailwindCSS:** Used for styling, adhering to a utility-first approach.
*   **NodeJS Backend:** Basic Express.js server providing dummy product data via API endpoints.
    *   `GET /api/products` - Fetches all products.
    *   `GET /api/products/:id` - Fetches a single product by ID.
    *   `GET /api/products/category/:categoryName` - Fetches products by category.
*   **Basic State Management:**
    *   Component-level state using `useState` and `useEffect`.
    *   Global state for the shopping cart using React Context API (`useReducer` for cart logic).
*   **Product Listing:** Display of products fetched from the backend in a grid.
*   **Product Detail Page:** Dynamic page for showing individual product details, accessed via routing.
*   **Client-Side Routing:** Implemented using `react-router-dom` for navigation between homepage and product detail pages.

---

## Core Technologies Used

*   **Frontend:**
    *   React 18+ (with Vite)
    *   TypeScript
    *   TailwindCSS
    *   React Router DOM (for routing)
    *   Heroicons (for SVG icons)
    *   Framer Motion (for animations - *as per your improvement list*)
*   **Backend:**
    *   NodeJS
    *   Express.js
    *   TypeScript
    *   `cors`
*   **Development Tools:**
    *   Vite (Frontend build tool and dev server)
    *   `nodemon` (Backend auto-restarting dev server)
    *   `ts-node` (Backend TypeScript execution for development)
    *   ESLint / Prettier (for code linting and formatting - *assuming you used them*)

---

## Bonus Enhancements & Creative Additions

This section highlights features implemented beyond the core scope, demonstrating creativity and a deeper understanding of modern web development practices.

### ✅ **1. User Interface (UI) Enhancements**

*   **Brand Section Upgrade**:
    *   Replaced placeholder logos with real **brand images** (or visually distinct placeholders).
    *   Added **hover animations** to brand logos for interactivity.
*   **Modern Styling**:
    *   Unified spacing, typography, and layout using **Tailwind CSS** best practices.
    *   Improved visual hierarchy of headings, product grid, and filters.
*   **Skeleton Loaders:** Implemented `SkeletonProductCard` components for an improved loading experience, providing visual placeholders while data is fetched.

### 🚀 **2. User Experience (UX) Improvements**

*   **Animated Product Grid**:
    *   Introduced **Framer Motion** for smooth product card animations on load and filter changes.
*   **Dynamic Filters & Sorting**:
    *   Client-side filtering by product category.
    *   Client-side sorting by price (asc/desc) and name (asc/desc).
    *   Filter tabs include **category badge counts** (e.g., `Electronics (12)`) for better filtering insights.
    *   Active filter/sort options are visually distinct.
*   **Client-Side Shopping Cart**:
    *   Fully functional client-side cart using React Context API.
    *   Features: Add to cart, remove from cart, update quantity, clear cart.
    *   Cart item count displayed in the header.
    *   Flyout cart preview panel.
    *   Cart state persists in `localStorage`.
*   **Improved Footer:** Refined footer design to closely match Figma, including link columns and social media icons.

### 🔁 **3. Interactivity Enhancements**

*   **Sort & Filter Responsiveness**:
    *   Real-time product list updates without page reload.
    *   Pagination automatically resets to the first page when sort or filter criteria change.
*   **"Load More" Products**:
    *   Functionality to progressively load more products on the homepage.
    *   Includes a loading state and feedback when all products are displayed.

### 🧠 **4. Error and Empty State Handling**

*   Graceful handling of:
    *   **Network/API errors** during product fetching with user-friendly messages.
    *   **Empty categories** or filter results, with suggestions (e.g., "No products found for 'X'. Show all products.").
    *   **404 Not Found Page:** For invalid routes.

### 📱 **5. Mobile Responsiveness**

*   Ensured full responsiveness for all implemented sections (Header, Hero, Brands, Product Grid, Filters, Footer, Product Detail Page, Cart Preview) across various breakpoints.

### 🔝 **6. New Functionalities Added (Beyond Core)**

*   **Scroll-to-Top Button**:
    *   Appears when the user scrolls down the page.
    *   Provides smooth scroll-to-top behavior, enhancing navigation on long lists.
*   **Performance Optimization with `useMemo`**:
    *   Used `useMemo` for derived data (filtered and sorted product lists) to prevent unnecessary re-computations and improve rendering performance.

### 📦 **7. Code Quality & Best Practices**

*   **Strong Typing:** Consistent use of TypeScript for props, state, and function signatures (e.g., `Product`, `CartItem` types).
*   **Modular Components:** Well-defined, reusable components (e.g., `HeroSection`, `ProductCard`, `SkeletonProductCard`, `CartPreview`, layout components).
*   **Reusable Constants:** Used for pagination limits, sort options, etc.
*   **Custom Hooks:** `useCart` hook for easy access to cart context.
*   **Environment Variables (Conceptual):** Backend port can be configured via `process.env.PORT`. (Actual `.env` files are gitignored).

---

## Project Structure

The repository is organized into two main directories:
```bash
eclypse-storefront/
├── client/ # React Frontend (Vite, TypeScript, TailwindCSS)
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── cart/
│ │ │ ├── common/
│ │ │ ├── home/
│ │ │ ├── layout/
│ │ │ └── products/
│ │ ├── context/
│ │ ├── hooks/ (if any custom hooks beyond useCart)
│ │ ├── pages/
│ │ ├── services/
│ │ ├── types/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ ├── tsconfig.app.json
│ ├── tsconfig.node.json
│ └── vite.config.ts
│ └── tailwind.config.js
│ └── postcss.config.js
│
└── server/ # NodeJS Backend (Express, TypeScript)
├── src/
│ ├── data/
│ │ └── products.ts
│ ├── routes/
│ │ └── productRoutes.ts
│ └── index.ts
├── package.json
└── tsconfig.json
```
---

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (v9.x or later) or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Saikumar1801/Eclypse-Storefront.git
    cd Eclypse-Storefront
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```
    *(If you added `@heroicons/react` or `framer-motion` or `@tailwindcss/typography`, ensure they are in `client/package.json` and get installed.)*

### Running the Application

You need to run both the backend and frontend servers concurrently in separate terminal windows.

1.  **Start the Backend Server:**
    *   Navigate to the `server` directory: `cd server`
    *   Run: `npm run dev`
    *   The backend server will typically start on `http://localhost:3001`.

2.  **Start the Frontend Development Server:**
    *   Navigate to the `client` directory: `cd client` (from the root, or `cd ../client` if you are in `server`)
    *   Run: `npm run dev`
    *   The frontend application will typically start on `http://localhost:5173` (Vite will indicate the port).

Open `http://localhost:5173` (or the port shown by Vite) in your browser.

---

## Available Scripts

### Backend (`server/` directory)

*   `npm run build`: Compiles TypeScript to JavaScript (outputs to `dist/`).
*   `npm run start`: Starts the production server (requires a prior build).
*   `npm run dev`: Starts the development server with `nodemon` for auto-reloading.

### Frontend (`client/` directory)

*   `npm run dev`: Starts the Vite development server with HMR.
*   `npm run build`: Builds the frontend application for production (outputs to `dist/`).
*   `npm run lint`: Lints the codebase (if ESLint is configured).
*   `npm run preview`: Serves the production build locally for preview.

---

## Future Improvements (Optional)

*   Implement user authentication.
*   Integrate a real database for products and user data.
*   Develop a full checkout process with payment integration.
*   Server-side filtering and pagination for better performance with large datasets.
*   More comprehensive testing (unit, integration, e2e).
*   Enhanced state management for larger scale (e.g., Zustand, Redux Toolkit).
