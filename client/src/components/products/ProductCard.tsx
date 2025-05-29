// client/src/components/product/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import { StarIcon, ShoppingBagIcon, HeartIcon } from '../common/Icons';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items: cartItems } = useCart();

  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) return;

    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(prev => !prev);
    // Persist wishlist logic here (localStorage, context, API, etc)
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={`star-${product.id}-${i}`}
          className={`w-4 h-4 ${i < fullStars ? 'text-brand-star-yellow' : 'text-gray-300'}`}
          filled={i < fullStars}
          aria-hidden="true"
        />
      );
    }
    return stars;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative block rounded-lg border border-brand-light-gray bg-white shadow-md hover:shadow-lg transition-shadow"
      title={`View details for ${product.name}`}
      aria-label={`View details for ${product.name}`}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
        <h3 className="text-base font-semibold text-brand-dark line-clamp-2">{product.name}</h3>
        <div className="flex items-center space-x-3">
          {product.onSale && product.originalPrice ? (
            <>
              <span className="text-sm font-bold text-brand-accent-red">
                {product.currency}
                {product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.currency}
                {product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-brand-dark">
              {product.currency}
              {product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay buttons */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 rounded-b-lg">
        <div className="pointer-events-auto flex gap-4 p-3">
          <button
            aria-label={isInCart ? 'Already in cart' : 'Add to cart'}
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`flex items-center justify-center rounded-full p-2 bg-brand-dark text-white shadow-lg hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark ${
              isInCart ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {addedToCart && !isInCart ? (
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-accent-green opacity-75 animate-ping"></span>
            ) : null}
            <ShoppingBagIcon className="w-5 h-5" />
          </button>

          <button
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={toggleWishlist}
            className={`flex items-center justify-center rounded-full p-2 bg-white bg-opacity-90 shadow-lg text-brand-dark hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark ${
              wishlisted ? 'text-brand-accent-red' : ''
            }`}
          >
            <HeartIcon filled={wishlisted} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
