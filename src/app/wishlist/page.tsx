'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { formatDate, isEventHappeningSoon } from '@/lib/data';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Clear Wishlist
            </button>
          )}
        </div>
        
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="relative">
                  <Link href={`/events/${event.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      {isEventHappeningSoon(event.date) && (
                        <div className="absolute top-2 left-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Happening Soon!
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(event.id);
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <Link href={`/events/${event.id}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-md">
                        {event.category}
                      </span>
                      <span className="font-semibold text-gray-900">{typeof event.price === 'string' ? event.price : `$${event.price}`}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-600">{event.venue}, {event.location}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Find events you love and add them to your wishlist.</p>
            <div className="mt-6">
              <Link href="/events" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Browse Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}