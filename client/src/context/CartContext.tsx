// client/src/context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import type { Product } from '../types/Product';
import type {
  CartItem,
  CartState,
  CartAction,
  CartContextType,
} from '../types/Cart';

const CART_STORAGE_KEY = 'eclypseCart';
const RECENTLY_REMOVED_KEY = 'eclypseRecentlyRemoved';

const loadStateFromStorage = (): CartItem[] => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch {
    return [];
  }
};

const loadRecentlyRemoved = (): CartItem[] => {
  try {
    const data = localStorage.getItem(RECENTLY_REMOVED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadStateFromStorage(),
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        const updated = state.items.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM': {
      const updated = state.items.filter(item => item.id !== action.payload.id);
      saveRecentlyRemoved(
        state.items.find(item => item.id === action.payload.id)
      );
      return { ...state, items: updated };
    }

    case 'UNDO_REMOVE': {
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items:
          action.payload.quantity <= 0
            ? state.items.filter(item => item.id !== action.payload.id)
            : state.items.map(item =>
                item.id === action.payload.id
                  ? { ...item, quantity: action.payload.quantity }
                  : item
              ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

// Save removed item for 5 minutes
const saveRecentlyRemoved = (item?: CartItem) => {
  if (!item) return;
  const list = loadRecentlyRemoved();
  const updated = [...list.filter(i => i.id !== item.id), { ...item, removedAt: Date.now() }];
  localStorage.setItem(RECENTLY_REMOVED_KEY, JSON.stringify(updated));
};

// Remove expired recently removed items
const cleanRecentlyRemoved = () => {
  const list = loadRecentlyRemoved();
  const filtered = list.filter(i => Date.now() - i.removedAt < 5 * 60 * 1000);
  localStorage.setItem(RECENTLY_REMOVED_KEY, JSON.stringify(filtered));
  return filtered;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const removedItemsRef = useRef<CartItem[]>([]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    removedItemsRef.current = cleanRecentlyRemoved();
  }, []);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } });
  };

  const undoRemove = (productId: string) => {
    const item = removedItemsRef.current.find(i => i.id === productId);
    if (item) {
      dispatch({ type: 'UNDO_REMOVE', payload: item });
      removedItemsRef.current = removedItemsRef.current.filter(i => i.id !== productId);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotalQuantity = (): number =>
    state.items.reduce((total, item) => total + item.quantity, 0);

  const getCartTotalPrice = (): number =>
    state.items.reduce((total, item) => {
      const pricePerUnit =
        item.quantity >= 5 ? item.price * 0.9 : item.price; // 10% discount for 5+ quantity
      return total + pricePerUnit * item.quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        undoRemove,
        getCartTotalQuantity,
        getCartTotalPrice,
        recentlyRemoved: removedItemsRef.current,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
