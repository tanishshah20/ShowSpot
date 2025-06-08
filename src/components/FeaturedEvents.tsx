import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getAllEvents,
} from '@/lib/data';

const EventCard: React.FC<{
  image: string;
  title: string;
  description: string;
  link: string;
}> = ({ image, title, description, link }) => {
  return (
    <Link href={link}>
      <div className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white h-full">
        <div className="relative h-48 sm:h-56">
          <Image src={image} alt={title} fill className="rounded-xl hover:rounded-none transition-all object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FeaturedEvents: React.FC = () => {
  const allEvents = getAllEvents();
  const randomEvents = useMemo(() => {
    return getRandomItems(allEvents, 3);
  }, [allEvents]); // Added allEvents to dependency array

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomEvents.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
            link={`/events/${event.id}`}
          />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <Link href="/events" className="text-base text-center underline">View More</Link>
      </div>
    </section>
  );
};

export default FeaturedEvents;