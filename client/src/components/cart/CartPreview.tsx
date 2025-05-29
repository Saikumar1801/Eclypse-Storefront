import React, { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { XMarkIcon, ShoppingBagIcon } from '../common/Icons';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({ isOpen, onClose }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotalPrice,
    getCartTotalQuantity,
    clearCart,
  } = useCart();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC key close could be added here
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Flyout Panel */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        aria-label="Shopping cart preview"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-brand-light-gray shrink-0">
          <h2 className="text-xl font-semibold text-brand-dark">
            Shopping Cart ({getCartTotalQuantity()})
          </h2>
          <button
            onClick={onClose}
            className="text-brand-gray hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent-red rounded"
            aria-label="Close cart preview"
            title="Close cart"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Cart Items or Empty State */}
        {items.length === 0 ? (
          <main className="flex-grow flex flex-col items-center justify-center text-center p-8 text-brand-gray">
            <ShoppingBagIcon className="w-16 h-16 mb-4 text-brand-light-gray" />
            <p className="text-lg font-medium text-brand-dark mb-1">Your cart is empty</p>
            <p className="text-sm mb-6">Looks like you haven't added anything yet.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-dark text-brand-white text-sm font-semibold rounded-md hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent-red"
            >
              Continue Shopping
            </button>
          </main>
        ) : (
          <main className="flex-grow overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-brand-dark scrollbar-track-transparent">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex items-start space-x-4 border-b border-brand-light-gray pb-4 last:border-b-0"
                aria-label={`Cart item: ${item.name}, quantity ${item.quantity}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-md flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold text-brand-dark">{item.name}</h3>
                  <p className="text-xs text-brand-gray mb-1">{item.category}</p>
                  <p className="text-sm font-medium text-brand-dark mb-3">
                    {item.currency}
                    {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-brand-light-gray rounded overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="px-3 py-1 text-brand-dark hover:bg-brand-light-gray-bg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                        title={item.quantity <= 1 ? 'Minimum quantity reached' : 'Decrease quantity'}
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-sm font-medium select-none">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="px-3 py-1 text-brand-dark hover:bg-brand-light-gray-bg transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-brand-gray hover:text-brand-accent-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent-red rounded"
                      aria-label={`Remove ${item.name} from cart`}
                      title="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </main>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <footer className="p-6 border-t border-brand-light-gray shrink-0 bg-white sticky bottom-0 shadow-md">
            <div className="flex justify-between items-center mb-5">
              <span className="text-md font-semibold text-brand-dark">Subtotal</span>
              <span className="text-lg font-bold text-brand-dark">
                {items[0]?.currency}
                {getCartTotalPrice().toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-brand-dark text-brand-white font-semibold py-3 rounded-md hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-4 focus:ring-brand-accent-red"
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-3 text-brand-accent-red text-sm font-medium py-2 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>
          </footer>
        )}

        {/* Live region for screen readers */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {`Cart updated: ${getCartTotalQuantity()} items, total ${getCartTotalPrice().toFixed(2)}`}
        </div>
      </aside>
    </>
  );
};

export default CartPreview;
