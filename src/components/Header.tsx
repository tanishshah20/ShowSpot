"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center">
                    <Image 
                      src="/logo.png" 
                      alt="ShowSpot" 
                      width={24} 
                      height={24} 
                      className="mr-2"
                    />
                    <span className="text-gray-900 font-bold text-lg">ShowSpot</span>
                  </div>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-6 md:flex md:space-x-6">
                <Link href="/concerts" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Concerts
                </Link>
                <Link href="/sports" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Sports
                </Link>
                <Link href="/arts-theater" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Arts & Theater
                </Link>
              </nav>
            </div>
            
            {/* Right side: Search, Sell button, Heart icon, Profile */}
            <div className="flex items-center">
              {/* Search Button */}
              <div className="ml-4">
                <Link href="/search" className="inline-flex items-center p-1.5  rounded-full border border-transparent text-sm font-medium rounded bg-gray-100 hover:bg-gray-200 text-gray-900">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Link>
              </div>
              
              {/* Sell Button */}
              <div className="hidden sm:block ml-4">
                <Link href="/sell" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded bg-gray-100 hover:bg-gray-200 text-gray-900">
                  Sell
                </Link>
              </div>
              
              {/* Heart Icon */}
              <div className="ml-4">
                <Link href="/fav" className="p-1 text-gray-400 hover:text-gray-500">
                  <HeartIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div>
              
              {/* Profile Picture */}
              <div className="hidden sm:block ml-4 flex-shrink-0">
                <Link href="/profile" className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/profile-image.png"
                    alt="User profile"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button - only shown on small screens */}
            <div className="md:hidden flex items-center ml-4">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger menu icon */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu, show/hide based on mobile menu state */}
      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    </>
  );
};

export default Header;