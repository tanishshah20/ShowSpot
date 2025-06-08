'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/data';

// Define interfaces for our data structures
interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  avatar: string;
}

interface Order {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketQty: number;
  ticketType: string;
  purchaseDate: string;
  total: number;
  status: 'upcoming' | 'past' | 'cancelled';
}

export default function ProfilePage() {
  // User profile data - in a real app, this would come from an API or context
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Tanish Shah',
    email: 'shahtanish207@gmail.com',
    joinedDate: 'January 2023',
    avatar: '/profile-image.png'
  });

  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load orders from localStorage on component mount
  useEffect(() => {
    // Get orders from localStorage
    const storedOrders = localStorage.getItem('userOrders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing orders from localStorage:', error);
      }
    }
  }, []);

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  
  // Current tab
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    
    // Determine if the event is upcoming or past
    const eventDate = new Date(order.eventDate);
    const isUpcoming = eventDate > new Date();
    
    if (activeTab === 'upcoming') return isUpcoming;
    if (activeTab === 'past') return !isUpcoming;
    return true;
  });

  // Handle profile edit
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    
    // Store updated profile in localStorage
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
  };

  // Cancel profile edit
  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
                  {profile.avatar && (
                    <Image 
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                
                {!isEditing ? (
                  <>
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-gray-600 mt-1">{profile.email}</p>
                    <p className="text-sm text-gray-500 mt-2">Member since {profile.joinedDate}</p>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <form className="w-full mt-2">
                    <div className="mb-3">
                      <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium">Account Settings</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link 
                      href="/wishlist" 
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      My Wishlist
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Tickets/Orders Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'upcoming'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Upcoming Tickets
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'past'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Past Events
                  </button>
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'all'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    All Orders
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {filteredOrders.length > 0 ? (
                  <div className="space-y-6">
                    {filteredOrders.map(order => (
                      <div key={order.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="font-bold text-lg">
                              <Link href={`/events/${order.eventId}`} className="hover:text-blue-600">
                                {order.eventName}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(order.eventDate)}
                            </p>
                            <div className="mt-3">
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                new Date(order.eventDate) > new Date()
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {new Date(order.eventDate) > new Date() ? 'Upcoming' : 'Past Event'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:text-right">
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              Purchased on {new Date(order.purchaseDate).toLocaleDateString()}
                            </p>
                            <p className="font-medium mt-1">{order.ticketQty} {order.ticketQty > 1 ? 'tickets' : 'ticket'}</p>
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                          <Link 
                            href={`/events/${order.eventId}`}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            View Event
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} tickets</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'upcoming' 
                        ? "You don't have any upcoming events." 
                        : activeTab === 'past'
                          ? "You haven't attended any events yet."
                          : "You haven't purchased any tickets yet."}
                    </p>
                    <div className="mt-6">
                      <Link href="/events" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        Browse Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}