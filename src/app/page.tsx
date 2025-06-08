import HeroSection from '@/components/HeroSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import CategoryBrowser from '@/components/CategoryBrowser';
import LocationBrowser from '@/components/LocationBrowser';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedEvents />
        <CategoryBrowser />
        <LocationBrowser />
      </div>
    </div>
  );
}