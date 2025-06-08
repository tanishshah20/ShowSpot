'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getAllEvents, 
  cities,
  formatDate,
  isEventHappeningSoon,
  type Event,
  type City 
} from '@/lib/data';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchType, setSearchType] = useState<'events' | 'cities'>('events');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get all events and cities
  const allEvents = useMemo(() => getAllEvents(), []);
  const allCities = useMemo(() => Object.values(cities), []);
  
  // Filter based on search term
  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return allEvents.filter(event => 
      event.title.toLowerCase().includes(term) || 
      event.description.toLowerCase().includes(term) || 
      event.location.toLowerCase().includes(term) ||
      event.venue.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term)
    );
  }, [searchTerm, allEvents]);
  
  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return allCities.filter(city => 
      city.name.toLowerCase().includes(term) || 
      city.description.toLowerCase().includes(term)
    );
  }, [searchTerm, allCities]);
  
  // Update URL when search changes
  useEffect(() => {
    // If the search term is from URL, don't update URL
    if (searchTerm === query) return;
    
    // Simulate loading state
    setIsLoading(true);
    
    // Add small delay to simulate search and avoid too many URL updates
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        // Update URL with search query without refreshing page
        const params = new URLSearchParams();
        params.set('q', searchTerm);
        router.replace(`/search?${params.toString()}`);
      }
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, router, query]);
  
  const resultsToShow = searchType === 'events' ? filteredEvents : filteredCities;
  const hasResults = resultsToShow.length > 0;
  
  return (
    <div className="bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Search ShowSpot</h1>
        
        {/* Search input */}
        <div className="mb-8">
          <div className="max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for events, artists, venues, or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {isLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Toggle between events and cities */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setSearchType('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                searchType === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Events ({filteredEvents.length})
            </button>
            <button
              onClick={() => setSearchType('cities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                searchType === 'cities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cities ({filteredCities.length})
            </button>
          </div>
        </div>
        
        {/* Search results */}
        {searchTerm.trim() && (
          <>
            {hasResults ? (
              <div>
                {searchType === 'events' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <EventSearchResult key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCities.map((city) => (
                      <CitySearchResult key={city.id} city={city} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">
                  No {searchType} found matching &quot;{searchTerm}&quot;
                </p>
                <button 
                  className="mt-4 text-blue-600 hover:text-blue-800"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Suggestions if no search term */}
        {!searchTerm.trim() && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {['concerts', 'sports', 'comedy', 'theater', 'festivals', 'new york', 'los angeles', 'chicago'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface EventSearchResultProps {
  event: Event;
}

function EventSearchResult({ event }: EventSearchResultProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <div className="relative h-36">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          {isEventHappeningSoon(event.date) && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Soon
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-md">
              {event.category}
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1">{event.title}</h3>
          <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
          <p className="text-sm text-gray-600">{event.venue}, {event.location}</p>
        </div>
      </div>
    </Link>
  );
}

// Component to display city search results
interface CitySearchResultProps {
  city: City;
}

function CitySearchResult({ city }: CitySearchResultProps) {
  return (
    <Link href={`/location/${city.id}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <div className="relative h-36">
          <Image
            src={city.image}
            alt={city.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <h3 className="font-bold text-lg">{city.name}</h3>
            <p className="text-sm">{city.eventCount} Events</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-700 line-clamp-2">{city.description}</p>
        </div>
      </div>
    </Link>
  );
}