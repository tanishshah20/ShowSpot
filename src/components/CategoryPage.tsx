'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getAllEvents,
  filterEvents,
  formatDate,
  isEventHappeningSoon,
  type Event,
  type DateFilterOption,
  type SortOption
} from '@/lib/data';

export default function CategoryPage({type}: {type: string}) {
  // State for filters and sorting (with concerts pre-selected)
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('Any Date');
  const [sortOption, setSortOption] = useState<SortOption>('Date (Soonest)');
  // Fix: properly type the filteredEvents state
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  
  // Available filter options
  const dateOptions = ['Any Date', 'Today', 'This Weekend', 'This Week', 'This Month'];
  const sortOptions = ['Date (Soonest)', 'Price (Low to High)', 'Price (High to Low)', 'Best Selling'];

  // Apply filters and sorting when filters change
  useEffect(() => {
    // Get all events and then filter to only concerts
    const events = getAllEvents();
    // Using 'Concerts' as a fixed category filter
    setFilteredEvents(filterEvents(events, type, dateFilter, sortOption));
  }, [dateFilter, sortOption, type]); 

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{`${type}`} Events</h1>
          <Link 
            href="/events" 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            View All Events
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Filter options */}
        <div className="flex flex-wrap gap-4 mb-6">
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
        
        {/* Concert count */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredEvents.length} concert events found</p>
        </div>
        
        {/* Concert events list */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
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
                    <p className="text-sm text-gray-600">{event.venue}, {event.location}</p>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">{event.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-500">No concert events found matching your criteria</p>
            <button 
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
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
  );
}