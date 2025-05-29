import React, { useEffect, useState, useMemo } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductCard from '../components/products/ProductCard';
import SkeletonProductCard from '../components/products/SkeletonProductCard';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/api';
import { ChevronDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const PRODUCTS_PER_PAGE = 8;

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
];

const brandLogos = [
  { name: 'Nike', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Adidas', src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Puma', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg' },
  { name: 'Reebok', src: 'https://upload.wikimedia.org/wikipedia/en/6/67/Reebok_2019_logo.svg' },
  { name: 'Under Armour', src: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Under_armour_logo.svg' }
];

const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProductsCount, setDisplayedProductsCount] = useState<number>(PRODUCTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeSort, setActiveSort] = useState<string>('default');

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchProducts();
        setAllProducts(fetchedProducts);
        const uniqueCategories = ['All', ...new Set(fetchedProducts.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedProductsCount(prevCount => prevCount + PRODUCTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let productsToDisplay = [...allProducts];

    if (activeFilter !== 'All') {
      productsToDisplay = productsToDisplay.filter(product => product.category === activeFilter);
    }

    switch (activeSort) {
      case 'price-asc': productsToDisplay.sort((a, b) => a.price - b.price); break;
      case 'price-desc': productsToDisplay.sort((a, b) => b.price - a.price); break;
      case 'name-asc': productsToDisplay.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': productsToDisplay.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return productsToDisplay;
  }, [allProducts, activeFilter, activeSort]);

  useEffect(() => {
    setDisplayedProductsCount(PRODUCTS_PER_PAGE);
  }, [activeFilter, activeSort]);

  const displayedProducts = filteredAndSortedProducts.slice(0, displayedProductsCount);
  const hasMoreProducts = displayedProductsCount < filteredAndSortedProducts.length;

  return (
    <>
      <HeroSection />

      {/* Brand Logos */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-700 uppercase tracking-wider">Featured Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {brandLogos.map((brand) => (
              <motion.div
                key={brand.name}
                className="h-10 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                whileHover={{ scale: 1.1 }}
              >
                <img src={brand.src} alt={brand.name} className="h-10 object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter/Sort Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Our Products</h2>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 border-b pb-4 mb-6">
            {categories.map(category => {
              const count = allProducts.filter(p => category === 'All' || p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    activeFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category} <span className="ml-1 text-xs bg-gray-200 px-2 py-0.5 rounded-full">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">No products found for "{activeFilter}".</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="text-blue-600 hover:underline"
              >
                Show all products
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {!isLoading && (
            <div className="text-center mt-10">
              {isLoadingMore ? (
                <p className="text-gray-500">Loading more...</p>
              ) : hasMoreProducts ? (
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              ) : (
                <p className="text-gray-500">You’ve reached the end!</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default HomePage;
