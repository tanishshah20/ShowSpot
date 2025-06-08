'use client'

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sample events data for the page
const allEvents = [
  {
    id: 'rolling-stones',
    title: 'The Rolling Stones',
    description: 'The Rolling Stones are back on tour! Don\'t miss the unforgettable night of rock and roll.',
    image: '/images/rolling-stones.jpg',
    date: '2025-06-15',
    venue: 'Madison Square Garden, New York',
    category: 'Concerts',
    price: 150
  },
  {
    id: 'lakers-warriors',
    title: 'Lakers vs. Warriors',
    description: 'See the showdown between the Lakers and Warriors. Witness the clash of titans in this thrilling basketball game.',
    image: '/images/lakers-warriors.jpg',
    date: '2025-06-20',
    venue: 'Staples Center, Los Angeles',
    category: 'Sports',
    price: 200
  },
  {
    id: 'phantom-opera',
    title: 'The Phantom of the Opera',
    description: 'Experience Andrew Lloyd Webber\'s Phantom of the Opera. Classic musical that will leave you spellbound.',
    image: '/images/phantom-opera.jpg',
    date: '2025-07-05',
    venue: 'Majestic Theatre, New York',
    category: 'Arts & Theater',
    price: 120
  },
  {
    id: 'comedy-night',
    title: 'Comedy Night',
    description: 'A night of laughs with top comedians from around the country.',
    image: '/images/category-comedy.jpg',
    date: '2025-06-10',
    venue: 'Comedy Club, Chicago',
    category: 'Comedy',
    price: 75
  },
  {
    id: 'summer-festival',
    title: 'Summer Music Festival',
    description: 'Three days of amazing music across five stages with the hottest artists.',
    image: '/images/category-festivals.jpg',
    date: '2025-06-24',
    venue: 'Grant Park, Chicago',
    category: 'Festivals',
    price: 250
  }
];

export default function EventsPage() {
  // State for filters and sorting
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('Any Date');
  const [sortOption, setSortOption] = useState('Date (Soonest)');
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  
  // Memoize the current date to prevent it from causing re-renders
  const currentDate = useMemo(() => new Date('2025-06-08'), []);

  // Apply filters and sorting when filters change
  useEffect(() => {
    let result = [...allEvents];

    // Apply category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter(event => event.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter !== 'Any Date') {
      switch (dateFilter) {
        case 'Today':
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === currentDate.toDateString();
          });
          break;
        case 'This Weekend': {
          // Get upcoming weekend (Friday to Sunday)
          const today = new Date(currentDate.getTime());
          const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
          const daysToFriday = dayOfWeek === 0 ? 5 : 5 - dayOfWeek;
          const fridayDate = new Date(today.getTime());
          fridayDate.setDate(today.getDate() + daysToFriday);
          
          const sundayDate = new Date(fridayDate.getTime());
          sundayDate.setDate(fridayDate.getDate() + 2);
          
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= fridayDate && eventDate <= sundayDate;
          });
          break;
        }
        case 'This Week': {
          const startOfWeek = new Date(currentDate.getTime());
          const endOfWeek = new Date(currentDate.getTime());
          const dayOfWeek = currentDate.getDay();
          
          startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
          });
          break;
        }
        case 'This Month': {
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          
          result = result.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= startOfMonth && eventDate <= endOfMonth;
          });
          break;
        }
      }
    }

    // Apply sorting
    result = [...result]; // Create a new array to avoid mutating the filtered result
    if (sortOption) {
      switch (sortOption) {
        case 'Date (Soonest)':
          result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'Price (Low to High)':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'Price (High to Low)':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'Best Selling':
          // Simulating a popularity sort
          result.sort((a, b) => a.id.localeCompare(b.id));
          break;
      }
    }

    setFilteredEvents(result);
  }, [categoryFilter, dateFilter, sortOption]); // Remove currentDate from dependencies since it's now memoized

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">All Events</h1>
        
        {/* Filters and Sort Options */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Filter by:</span>
            <select 
              className="border border-gray-300 rounded-md py-1 px-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Concerts</option>
              <option>Sports</option>
              <option>Arts & Theater</option>
              <option>Festivals</option>
              <option>Comedy</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Date:</span>
            <select 
              className="border border-gray-300 rounded-md py-1 px-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option>Any Date</option>
              <option>Today</option>
              <option>This Weekend</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="ml-auto flex items-center">
            <span className="mr-2 text-gray-700">Sort by:</span>
            <select 
              className="border border-gray-300 rounded-md py-1 px-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Date (Soonest)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
        </div>
        
        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.map(event => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-md mb-2">
                      {event.category}
                    </span>
                    <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                    <p className="text-sm text-gray-600 mb-3">
                      {formatDate(event.date)} • {event.venue}
                    </p>
                    <p className="text-gray-700 line-clamp-2">{event.description}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-blue-600 font-medium">View details →</span>
                      <span className="text-gray-900 font-semibold">${event.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
  );
}