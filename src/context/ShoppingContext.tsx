import React, { createContext, useContext, useEffect, useState } from 'react';
import { DesignItem, QuoteBasketItem } from '../types';
import { SAMPLE_DESIGNS } from '../data/designsData';

interface ShoppingContextType {
  // Favourites
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  favouriteCount: number;
  favouriteDesigns: DesignItem[];

  // Quote Basket
  basketItems: QuoteBasketItem[];
  addToBasket: (design: DesignItem, fabricType?: string, userNotes?: string) => void;
  removeFromBasket: (designId: string) => void;
  updateBasketItemQuantity: (designId: string, quantity: number) => void;
  clearBasket: () => void;
  basketCount: number;
  isItemInBasket: (designId: string) => boolean;

  // Search Global Control
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals
  isBasketOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;

  activeDesignDetail: DesignItem | null;
  openDesignDetail: (design: DesignItem) => void;
  closeDesignDetail: () => void;

  isAdvisorOpen: boolean;
  advisorTopic: string;
  openAdvisor: (topic?: string) => void;
  closeAdvisor: () => void;

  // Feedback Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const FAVOURITES_KEY = 'spandana_saved_favourites';
const BASKET_KEY = 'spandana_quote_basket';

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Favourites State
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVOURITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Quote Basket State
  const [basketItems, setBasketItems] = useState<QuoteBasketItem[]>(() => {
    try {
      const stored = localStorage.getItem(BASKET_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [activeDesignDetail, setActiveDesignDetail] = useState<DesignItem | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorTopic, setAdvisorTopic] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync favourites
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
    } catch (e) {
      console.warn('Could not save favourites', e);
    }
  }, [favourites]);

  // Sync basket
  useEffect(() => {
    try {
      localStorage.setItem(BASKET_KEY, JSON.stringify(basketItems));
    } catch (e) {
      console.warn('Could not save basket', e);
    }
  }, [basketItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed design from saved favourites');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved design to favourites');
        return [...prev, id];
      }
    });
  };

  const isFavourite = (id: string) => favourites.includes(id);

  const favouriteDesigns = SAMPLE_DESIGNS.filter((d) => favourites.includes(d.id));

  const addToBasket = (design: DesignItem, fabricType?: string, userNotes?: string) => {
    setBasketItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.design.id === design.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          fabricType: fabricType || updated[existingIndex].fabricType,
          userNotes: userNotes || updated[existingIndex].userNotes,
        };
        showToast(`Updated quantity for "${design.title}" in quote basket`);
        return updated;
      } else {
        showToast(`Added "${design.title}" to quote basket`);
        return [
          ...prev,
          {
            design,
            quantity: 1,
            fabricType: fabricType || 'Unspecified fabric',
            userNotes: userNotes || '',
            addedAt: Date.now(),
          },
        ];
      }
    });
  };

  const removeFromBasket = (designId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.design.id !== designId));
    showToast('Removed design from quote basket');
  };

  const updateBasketItemQuantity = (designId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(designId);
      return;
    }
    setBasketItems((prev) =>
      prev.map((item) => (item.design.id === designId ? { ...item, quantity } : item))
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
    showToast('Quote basket cleared');
  };

  const isItemInBasket = (designId: string) =>
    basketItems.some((item) => item.design.id === designId);

  const openBasket = () => setIsBasketOpen(true);
  const closeBasket = () => setIsBasketOpen(false);

  const openDesignDetail = (design: DesignItem) => setActiveDesignDetail(design);
  const closeDesignDetail = () => setActiveDesignDetail(null);

  const openAdvisor = (topic?: string) => {
    if (topic) setAdvisorTopic(topic);
    setIsAdvisorOpen(true);
  };
  const closeAdvisor = () => {
    setIsAdvisorOpen(false);
    setAdvisorTopic('');
  };

  const basketCount = basketItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShoppingContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        favouriteCount: favourites.length,
        favouriteDesigns,
        basketItems,
        addToBasket,
        removeFromBasket,
        updateBasketItemQuantity,
        clearBasket,
        basketCount,
        isItemInBasket,
        searchQuery,
        setSearchQuery,
        isBasketOpen,
        openBasket,
        closeBasket,
        activeDesignDetail,
        openDesignDetail,
        closeDesignDetail,
        isAdvisorOpen,
        advisorTopic,
        openAdvisor,
        closeAdvisor,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = (): ShoppingContextType => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};
