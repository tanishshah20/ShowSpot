"use client"
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[500px] md:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Concert background"
          fill
          className="object-cover brightness-[0.65]"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Find tickets to live events
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl">
          Join millions of fans buying and selling tickets to the best concerts,
          sports, and theater events.
        </p>        
      </div>
    </div>
  );
};

export default HeroSection;
