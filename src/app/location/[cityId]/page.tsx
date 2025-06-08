'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  cities, 
  getEventsByCity, 
  formatDate, 
  filterEvents, 
  getLocalTime,
  isEventHappeningSoon,
  type DateFilterOption,
  type SortOption
} from '@/lib/data';

export default function CityPage() {
  const params = useParams();
  const cityId = params?.cityId as string;
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('Any Date');
  const [sortOption, setSortOption] = useState<SortOption>('Date (Soonest)');
  const [cityEvents, setCityEvents] = useState(getEventsByCity(cityId));
  
  // Available filter options
  const categories = ['All Categories', 'Concerts', 'Sports', 'Arts & Theater', 'Comedy', 'Festivals'];
  const dateOptions = ['Any Date', 'Today', 'This Weekend', 'This Week', 'This Month'];
  const sortOptions = ['Date (Soonest)', 'Price (Low to High)', 'Price (High to Low)', 'Best Selling'];
  
  // Get city data
  const city = cities[cityId];
  
  // If city doesn't exist, show 404
  if (!city) {
    notFound();
  }
  
  // Apply filters when they change
  useEffect(() => {
    const allCityEvents = getEventsByCity(cityId);
    setCityEvents(filterEvents(allCityEvents, categoryFilter, dateFilter, sortOption as SortOption));
  }, [cityId, categoryFilter, dateFilter, sortOption]);
  
  // Get local time for the city
  const localTime = getLocalTime(city.timezone);
  
  return (
    <div className="bg-white">
      {/* City hero section */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Events in {city.name}
          </h1>
          <p className="text-white text-lg mt-4">
            Local Time: {localTime}
          </p>
        </div>
      </div>
      
      {/* City description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-lg text-gray-700">{city.description}</p>
        </div>
        
        {/* Filter section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events in {city.name}</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date-filter" className="sr-only">Filter by Date</label>
              <select
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilterOption)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {dateOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="sort-option" className="sr-only">Sort by</label>
              <select
                id="sort-option"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Event count */}
          <p className="text-gray-600 mb-6">{cityEvents.length} events found in {city.name}</p>
          
          {/* Event list */}
          {cityEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityEvents.map(event => (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
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
                        <span className="font-semibold text-gray-900">{typeof event.price === 'string' ? event.price : `$${event.price}`}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                      <p className="text-sm text-gray-600">{event.venue}</p>
                      <p className="mt-2 text-sm text-gray-700 line-clamp-3">{event.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500">No events found matching your criteria</p>
              <button 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setCategoryFilter('All Categories');
                  setDateFilter('Any Date');
                  setSortOption('Date (Soonest)');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}