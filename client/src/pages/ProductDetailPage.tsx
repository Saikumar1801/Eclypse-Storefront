// client/src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { StarIcon, ShoppingBagIcon } from '../components/common/Icons';

// Image gallery component (main image + thumbnails)
const ProductImageGallery: React.FC<{ images: { src: string; alt: string }[] }> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.src || 'https://via.placeholder.com/600x800.png?text=No+Image');

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0].src);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-gray-200 rounded-lg flex items-center justify-center">
        <p>No Image</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-brand-light-gray">
        <img src={mainImage} alt="Main product" className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img.src)}
              className={`aspect-square w-full rounded overflow-hidden border-2 transition-colors ${
                mainImage === img.src ? 'border-brand-dark' : 'border-transparent hover:border-brand-light-gray'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, items: cartItems } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing.');
      setIsLoading(false);
      return;
    }

    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      // You can add toast or feedback here
      console.log(`${quantity} of ${product.name} added to cart!`);
    }
  };

  const isProductInCart = product ? cartItems.some(item => item.id === product.id) : false;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={`star-detail-${i}`}
          className={`w-5 h-5 ${i < fullStars ? 'text-brand-star-yellow' : 'text-gray-300'}`}
          filled={i < fullStars}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Skeleton */}
          <div>
            <div className="aspect-[3/4] w-full bg-gray-300 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square w-full bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          {/* Details Skeleton */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="flex items-center mb-4">
              <div className="h-5 bg-gray-300 rounded w-24 mr-2"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-20 bg-gray-300 rounded w-full mb-6"></div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-semibold text-brand-accent-red mb-4">Error</h1>
        <p className="text-brand-gray">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-brand-dark text-white rounded hover:bg-opacity-80"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-semibold text-brand-dark mb-4">Product Not Found</h1>
        <p className="text-brand-gray">Sorry, we couldn't find the product you're looking for.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-brand-dark text-white rounded hover:bg-opacity-80"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  const productImages = [{ src: product.imageUrl, alt: product.name }];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <ProductImageGallery images={productImages} />

        <div>
          <span className="text-sm text-brand-gray uppercase tracking-wider mb-1">{product.category}</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-3">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">{renderStars(product.rating)}</div>
            <span className="text-sm text-brand-gray">({product.reviewsCount} reviews)</span>
          </div>

          <div className="mb-6">
            {product.onSale && product.originalPrice ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-brand-accent-red">
                  {product.currency}
                  {product.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.currency}
                  {product.originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-brand-dark">
                {product.currency}
                {product.price.toFixed(2)}
              </span>
            )}
            {product.onSale && (
              <span className="ml-3 text-sm font-semibold text-brand-accent-red bg-red-100 px-2 py-0.5 rounded">
                {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="text-brand-gray leading-relaxed mb-6 prose prose-sm max-w-none">
            <p>{product.description || 'No description available.'}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-brand-dark mb-1">
              Quantity
            </label>
            <div className="flex items-center w-28 border border-brand-light-gray rounded">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-brand-dark hover:bg-brand-light-gray-bg disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                min={1}
                className="w-full text-center text-lg focus:outline-none"
                aria-label="Quantity"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-brand-dark hover:bg-brand-light-gray-bg"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isProductInCart}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded font-semibold text-white ${
              isProductInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-dark hover:bg-brand-dark/90'
            } transition-colors`}
            title={isProductInCart ? 'Already in Cart' : 'Add to Cart'}
            aria-disabled={isProductInCart}
          >
            <ShoppingBagIcon className="w-5 h-5" />
            {isProductInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
