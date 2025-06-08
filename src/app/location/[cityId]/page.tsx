'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// City data - in a real app, this would come from an API or database
const cityData = {
  'new-york': {
    id: 'new-york',
    name: 'New York',
    image: '/images/city-newyork.jpg',
    description: 'The city that never sleeps offers world-class entertainment, from Broadway shows to sporting events at Madison Square Garden.',
    timezone: 'America/New_York'
  },
  'los-angeles': {
    id: 'los-angeles',
    name: 'Los Angeles',
    image: '/images/city-losangeles.jpg',
    description: 'Experience the best entertainment in LA, from Hollywood shows to sporting events at the Staples Center.',
    timezone: 'America/Los_Angeles'
  },
  'chicago': {
    id: 'chicago',
    name: 'Chicago',
    image: '/images/city-chicago.jpg',
    description: 'Chicago\'s vibrant entertainment scene features everything from jazz clubs to major sporting events.',
    timezone: 'America/Chicago'
  },
  'san-francisco': {
    id: 'san-francisco',
    name: 'San Francisco',
    image: '/images/city-sanfrancisco.jpg', 
    description: 'San Francisco offers diverse entertainment options from the historic Fillmore to Oracle Park.',
    timezone: 'America/Los_Angeles'
  },
  'las-vegas': {
    id: 'las-vegas',
    name: 'Las Vegas',
    image: '/images/city-lasvegas.jpg',
    description: 'Las Vegas is the entertainment capital of the world, featuring world-class shows, concerts, and sporting events.',
    timezone: 'America/Los_Angeles'
  }
};

// Sample events for each city - in a real app, this would be filtered based on location
const cityEvents = {
  'new-york': [
    {
      id: 'phantom-opera-ny',
      title: 'The Phantom of the Opera',
      date: '2025-06-15',
      venue: 'Majestic Theatre',
      image: '/images/phantom-opera.jpg',
      category: 'Arts & Theater',
      price: 120
    },
    {
      id: 'rolling-stones-ny',
      title: 'The Rolling Stones',
      date: '2025-06-20',
      venue: 'Madison Square Garden',
      image: '/images/rolling-stones.jpg',
      category: 'Concerts',
      price: 200
    },
    {
      id: 'ny-comedy-fest',
      title: 'New York Comedy Festival',
      date: '2025-07-05',
      venue: 'Caroline\'s on Broadway',
      image: '/images/category-comedy.jpg',
      category: 'Comedy',
      price: 85
    },
    {
      id: 'ny-jazz-night',
      title: 'Jazz Night in Central Park',
      date: '2025-06-10',
      venue: 'Central Park',
      image: '/images/category-concerts.jpg',
      category: 'Concerts',
      price: 45
    }
  ],
  'los-angeles': [
    {
      id: 'lakers-warriors',
      title: 'Lakers vs. Warriors',
      date: '2025-06-20',
      venue: 'Staples Center',
      image: '/images/lakers-warriors.jpg',
      category: 'Sports',
      price: 180
    },
    {
      id: 'la-philharmonic',
      title: 'LA Philharmonic',
      date: '2025-06-25',
      venue: 'Walt Disney Concert Hall',
      image: '/images/category-arts.jpg',
      category: 'Arts & Theater',
      price: 100
    },
    {
      id: 'hollywood-comedy',
      title: 'Hollywood Comedy Night',
      date: '2025-07-02',
      venue: 'The Comedy Store',
      image: '/images/category-comedy.jpg',
      category: 'Comedy',
      price: 60
    }
  ],
  'chicago': [
    {
      id: 'chicago-blues',
      title: 'Chicago Blues Festival',
      date: '2025-06-12',
      venue: 'Grant Park',
      image: '/images/category-festivals.jpg',
      category: 'Festivals',
      price: 40
    },
    {
      id: 'cubs-cardinals',
      title: 'Cubs vs. Cardinals',
      date: '2025-06-18',
      venue: 'Wrigley Field',
      image: '/images/category-sports.jpg',
      category: 'Sports',
      price: 85
    }
  ],
  'san-francisco': [
    {
      id: 'sf-symphony',
      title: 'San Francisco Symphony',
      date: '2025-06-14',
      venue: 'Davies Symphony Hall',
      image: '/images/category-arts.jpg',
      category: 'Arts & Theater',
      price: 95
    },
    {
      id: 'sf-giants-game',
      title: 'SF Giants vs. LA Dodgers',
      date: '2025-06-22',
      venue: 'Oracle Park',
      image: '/images/category-sports.jpg',
      category: 'Sports',
      price: 75
    }
  ],
  'las-vegas': [
    {
      id: 'cirque-soleil',
      title: 'Cirque du Soleil: O',
      date: '2025-06-09',
      venue: 'Bellagio',
      image: '/images/category-arts.jpg',
      category: 'Arts & Theater',
      price: 150
    },
    {
      id: 'lv-residency',
      title: 'Adele Residency',
      date: '2025-07-01',
      venue: 'Caesars Palace',
      image: '/images/category-concerts.jpg',
      category: 'Concerts',
      price: 250
    },
    {
      id: 'lv-comedy',
      title: 'Comedy Cellar',
      date: '2025-06-15',
      venue: 'Rio Hotel & Casino',
      image: '/images/category-comedy.jpg',
      category: 'Comedy',
      price: 65
    }
  ]
};

export default function CityPage() {
  const params = useParams();
  const cityIdRaw = params?.cityId;
  const cityId = typeof cityIdRaw === 'string' ? cityIdRaw : '';
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('Any Date');
  const [sortOption, setSortOption] = useState('Date (Soonest)');
  const [loading, setLoading] = useState(true);
  
  // Current date for filtering
  const currentDate = useMemo(() => new Date('2025-06-08 07:37:16'), []);
  
  // Get the city data and events directly using the cityId
  const [city, setCity] = useState<any>(null);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  
  // Update city and events whenever cityId changes
  useEffect(() => {
    // Reset loading state
    setLoading(true);
    
    // Lookup exact match first
    let foundCity = cityData[cityId as keyof typeof cityData];
    let foundEvents = cityEvents[cityId as keyof typeof cityEvents] || [];
    
    if (!foundCity) {
      // Try case-insensitive match
      const lowerCaseId = cityId.toLowerCase();
      
      for (const key in cityData) {
        if (key.toLowerCase() === lowerCaseId) {
          foundCity = cityData[key as keyof typeof cityData];
          foundEvents = cityEvents[key as keyof typeof cityEvents] || [];
          break;
        }
      }
    }
    
    // Update state with found data
    setCity(foundCity);
    setAllEvents(foundEvents);
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [cityId]);
  
  // Apply filters and sorting
  const filteredEvents = useMemo(() => {
    if (!allEvents || allEvents.length === 0) return [];
    
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
    
    return result;
  }, [allEvents, categoryFilter, dateFilter, sortOption, currentDate]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get local time in the city
  const getLocalTime = () => {
    if (!city?.timezone) return '';
    
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: city.timezone
    };
    return new Date().toLocaleTimeString('en-US', options);
  };
  
  // If we're still loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If we couldn't find the city, show an error
  if (!city) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">City Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">Sorry, we couldn't find information about this city.</p>
        <Link href="/location" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Browse All Locations
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white">
      {/* Hero section with city image */}
      <div className="relative h-[300px]">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Events in {city.name}</h1>
          <p className="text-white text-lg mt-3 max-w-3xl">{city.description}</p>
          <p className="text-white text-sm mt-2">Local time: {getLocalTime()}</p>
        </div>
      </div>
      
      {/* Events listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        {/* Filters */}
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
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found in {city.name}
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
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No events found matching your criteria in {city.name}.</p>
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
        
        {/* Back to all locations button */}
        <div className="mt-8 mb-8">
          <Link href="/location" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            ← Browse All Locations
          </Link>
        </div>
      </div>
    </div>
  );
}