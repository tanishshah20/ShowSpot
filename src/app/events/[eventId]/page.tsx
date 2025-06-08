'use client'

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  events, 
  formatDate, 
  getRelatedEvents, 
  getTicketSections,
  isEventHappeningSoon
} from '@/lib/data';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';

export default function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const router = useRouter();
  
  // Extract eventId using React.use
  const { eventId } = React.use(params);
  const event = events[eventId];
  
  const [quantity, setQuantity] = useState(2);
  const [selectedSection, setSelectedSection] = useState('');
  
  // Use the wishlist context
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  // If the event doesn't exist, show 404 page
  if (!event) {
    notFound();
  }
  
  // Get ticket sections for this event
  const ticketSections = getTicketSections(event.id);
  
  // Get related events
  const relatedEvents = getRelatedEvents(event.id, 3);
  
  // Toggle wishlist
  const toggleWishlist = () => {
    if (isInWishlist(event.id)) {
      removeFromWishlist(event.id);
    } else {
      addToWishlist(event);
    }
  };
  
  // Calculate total price
  const calculateTotal = () => {
    if (!selectedSection) return 0;
    const section = ticketSections.find(s => s.id === selectedSection);
    return section ? section.price * quantity : 0;
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (!selectedSection) return;
    
    const section = ticketSections.find(s => s.id === selectedSection);
    if (!section) return;
    
    const checkoutData = {
      eventId: event.id,
      eventName: event.title,
      eventDate: formatDate(event.date),
      eventTime: event.time,
      venue: event.venue,
      section: section.name,
      quantity: quantity,
      unitPrice: section.price,
      subtotal: calculateTotal(),
      fees: Math.round(calculateTotal() * 0.15),
      total: Math.round(calculateTotal() * 1.15)
    };
    
    // Encode the checkout data in the URL
    const params = new URLSearchParams();
    
    // Add each property to the URL parameters
    Object.entries(checkoutData).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    
    // Navigate to checkout page with query parameters
    router.push(`/checkout?${params.toString()}`);
  };
  
  return (
    <div className="bg-white">
      {/* Hero section with event image */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">{event.title}</h1>
          <p className="text-white text-lg mt-4">
            {formatDate(event.date, { weekday: 'long' })} • {event.time} • {event.venue}, {event.location}
          </p>
          {isEventHappeningSoon(event.date) && (
            <div className="mt-3 w-max inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Happening Soon!
            </div>
          )}
        </div>
      </div>
      
      {/* Event details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About this event</h2>
            <p className="text-gray-700">{event.longDescription}</p>
            
            {/* Tags */}
            {event.tags && (
              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Additional event details */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Event Details</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Date and Time</p>
                    <p className="font-medium">{formatDate(event.date, { weekday: 'long' })}, {event.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-gray-700">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="font-medium">{event.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price Range</p>
                    <p className="font-medium">{event.price}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Venue Map Placeholder */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Venue Map</h3>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Venue map will be displayed here</p>
              </div>
            </div>
          </div>
          
          {/* Ticket purchase section */}
          <div className="bg-gray-50 p-6 rounded-lg h-min sticky top-24">
            <h2 className="text-xl font-bold mb-4">Tickets</h2>
            
            {/* Ticket selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Ticket Type</label>
              {ticketSections.map(section => (
                <div key={section.id} className="mb-3">
                  <button
                    className={`w-full text-left px-4 py-3 border rounded-md ${
                      selectedSection === section.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{section.name}</span>
                      <span className="text-gray-900">${section.price}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            {/* Price breakdown */}
            {selectedSection && (
              <div className="mb-6 bg-white p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-lg mb-2">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Ticket Price × {quantity}</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Service fees</span>
                  <span>${Math.round(calculateTotal() * 0.15)}</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${Math.round(calculateTotal() * 1.15)}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className={`w-full py-3 px-4 rounded font-medium ${
                  selectedSection 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedSection}
              >
                Checkout
              </button>
              
              <button 
                onClick={toggleWishlist}
                className={`w-full py-3 px-4 rounded font-medium border flex items-center justify-center gap-2 ${
                  isInWishlist(event.id)
                    ? 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
                    : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300'
                }`}
              >
                <svg 
                  className={`h-5 w-5 ${isInWishlist(event.id) ? 'text-pink-600' : 'text-gray-500'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d={isInWishlist(event.id) 
                      ? "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                      : "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"} 
                    clipRule="evenodd" 
                  />
                </svg>
                {isInWishlist(event.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            
            {/* Share options */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Share this event</p>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/>
                  </svg>
                </button>
                <button className="text-blue-400 hover:text-blue-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317v9.575h4.065v-9.575h3.316l.532-4.515h-3.848V10.94c0-1.342.387-2.242 2.24-2.242h1.777V5.005z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related events */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map(relatedEvent => (
              <Link href={`/events/${relatedEvent.id}`} key={relatedEvent.id}>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="relative h-40">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-md mb-2">
                      {relatedEvent.category}
                    </span>
                    <h3 className="font-bold text-lg mb-1">{relatedEvent.title}</h3>
                    <p className="text-sm text-gray-600">{formatDate(relatedEvent.date)}</p>
                    <p className="text-sm text-gray-600">{relatedEvent.venue}, {relatedEvent.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}