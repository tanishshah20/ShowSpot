'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// City data - in a real app, this would come from an API or database
const allCities = [
  {
    id: 'new-york',
    name: 'New York',
    image: '/images/city-newyork.jpg',
    eventCount: 423
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    image: '/images/city-losangeles.jpg',
    eventCount: 318
  },
  {
    id: 'chicago',
    name: 'Chicago',
    image: '/images/city-chicago.jpg',
    eventCount: 256
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    image: '/images/city-sanfrancisco.jpg',
    eventCount: 201
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas',
    image: '/images/city-lasvegas.jpg',
    eventCount: 189
  },
  {
    id: 'miami',
    name: 'Miami',
    image: '/images/city-more.jpg',
    eventCount: 176
  },
  {
    id: 'austin',
    name: 'Austin',
    image: '/images/city-more.jpg',
    eventCount: 152
  },
  {
    id: 'seattle',
    name: 'Seattle',
    image: '/images/city-more.jpg',
    eventCount: 142
  },
  {
    id: 'nashville',
    name: 'Nashville',
    image: '/images/city-more.jpg',
    eventCount: 137
  },
  {
    id: 'denver',
    name: 'Denver',
    image: '/images/city-more.jpg',
    eventCount: 129
  },
  {
    id: 'boston',
    name: 'Boston',
    image: '/images/city-more.jpg',
    eventCount: 118
  },
  {
    id: 'orlando',
    name: 'Orlando',
    image: '/images/city-more.jpg',
    eventCount: 105
  }
];

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  
  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCities;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return allCities.filter(city => 
      city.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Determine which cities to display
  const displayedCities = showAllCities 
    ? filteredCities 
    : filteredCities.slice(0, 5);
  
  // Determine if we should show the "View More" button
  const hasMoreCities = filteredCities.length > 5 && !showAllCities;
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse by Location</h1>
        
        {/* Search for a city */}
        <div className="mb-8">
          <div className="max-w-md">
            <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search for a city
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="city-search"
                id="city-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter city name"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {!searchQuery && (
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Search results or popular cities */}
        <h2 className="text-xl font-semibold mb-4">
          {searchQuery ? "Search Results" : "Popular Cities"}
        </h2>
        
        {filteredCities.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No cities found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {displayedCities.map((city) => (
                <Link key={city.id} href={`/location/${city.id}`}>
                  <div className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={city.image}
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{city.name}</h3>
                          <p className="text-sm mt-1">{city.eventCount} events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* View more cities button - only show if there are more than 5 filtered cities and not showing all */}
            {hasMoreCities && (
              <div className="text-center">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowAllCities(true)}
                >
                  View More Cities
                </button>
              </div>
            )}
            {!hasMoreCities && (
              <div className="text-center">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowAllCities(false)}
                >
                  View Less Cities
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}