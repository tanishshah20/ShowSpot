'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Event } from '@/lib/data';

interface WishlistContextType {
  wishlist: Event[];
  addToWishlist: (event: Event) => void;
  removeFromWishlist: (eventId: string) => void;
  isInWishlist: (eventId: string) => boolean;
  clearWishlist: () => void;
}

// Create context with default values
const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
});

// Hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);

// Provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState<Event[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlist]);

  // Add an event to the wishlist
  const addToWishlist = (event: Event) => {
    setWishlist(prev => {
      if (prev.some(e => e.id === event.id)) {
        return prev; // Don't add duplicates
      }
      return [...prev, event];
    });
  };

  // Remove an event from the wishlist
  const removeFromWishlist = (eventId: string) => {
    setWishlist(prev => prev.filter(event => event.id !== eventId));
  };

  // Check if an event is in the wishlist
  const isInWishlist = (eventId: string) => {
    return wishlist.some(event => event.id === eventId);
  };

  // Clear the wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};