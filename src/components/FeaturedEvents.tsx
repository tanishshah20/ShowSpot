import Image from 'next/image';
import Link from 'next/link';

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

const FeaturedEvents: React.FC = () => {
  const events = [
    {
      image: "/images/rolling-stones.jpg",
      title: "The Rolling Stones",
      description: "The Rolling Stones are back on tour! Don't miss the unforgettable night of rock and roll.",
      link: "/events/rolling-stones"
    },
    {
      image: "/images/lakers-warriors.jpg",
      title: "Lakers vs. Warriors",
      description: "See the showdown between the Lakers and Warriors. Witness the clash of titans in this thrilling basketball game.",
      link: "/events/lakers-warriors"
    },
    {
      image: "/images/phantom-opera.jpg",
      title: "The Phantom of the Opera",
      description: "Experience Andrew Lloyd Webber's Phantom of the Opera. Classic musical that will leave you spellbound.",
      link: "/events/phantom-opera"
    }
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard
            key={index}
            image={event.image}
            title={event.title}
            description={event.description}
            link={event.link}
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