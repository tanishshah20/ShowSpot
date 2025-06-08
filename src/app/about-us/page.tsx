'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutUsPage() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/images/hero-background.jpg" 
          alt="Crowd at a concert"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className={`text-white text-4xl md:text-5xl lg:text-6xl font-bold transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            About ShowSpot
          </h1>
          <p className={`text-white text-xl mt-4 max-w-3xl transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Your ticket to freedom and unforgettable live experiences
          </p>
        </div>
      </div>
      
      {/* Main content - simplified with requested formatting */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`space-y-8 text-center text-gray-900 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg leading-relaxed">
            ShowSpot is your ticket to freedom. It&apos;s a marketplace that allows you to free yourself from virtual queues and frantic refreshing. From back-alley deals and the bitter disappointment of FOMO. A safe space that allows sellers to name their price, and saves buyers from missing out.
          </p>
          
          <p className="text-lg leading-relaxed">
            Providing access to over 50 million live event listings, we give you the freedom to buy or sell from any device, in nearly every currency and language – any time. The freedom to experience your love of live IR. To dance till you drop. To sing at the top of your lungs. The freedom to laugh until you cry. To scream yourself hoarse at that championship-winning goal. To be surrounded by your fellow fans, having the time of your life.
          </p>
          
          <p className="text-lg leading-relaxed">
            And if life throws you a curveball – we give you the freedom to change your mind and resell your ticket, safely and securely.
          </p>
          
          <p className="text-lg leading-relaxed">
            From sport to music, comedy to dance, festivals to theatre – we offer the widest choice of the most diverse events. And the ShowSpot 100% order guarantee covers both buyers and sellers, so rest assured, we&apos;ve got your back.
          </p>
        </div>
      </div>
    </div>
  );
}