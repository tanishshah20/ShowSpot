import Image from 'next/image';
import Link from 'next/link';

const LocationCard: React.FC<{
  image: string;
  city: string;
  link: string;
}> = ({ image, city, link }) => {
  return (
    <Link href={link}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-black relative">
        <div className="aspect-[4/3] relative">
          <Image src={image} alt={city} fill className="object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-center font-bold text-xl">{city}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const LocationBrowser: React.FC = () => {
  const locations = [
    {
      image: "/images/city-newyork.jpg",
      city: "New York",
      link: "/location/new-york"
    },
    {
      image: "/images/city-losangeles.jpg",
      city: "Los Angeles",
      link: "/location/los-angeles"
    },
    {
      image: "/images/city-chicago.jpg",
      city: "Chicago",
      link: "/location/chicago"
    },
    {
      image: "/images/city-sanfrancisco.jpg",
      city: "San Francisco",
      link: "/location/san-francisco"
    },
    {
      image: "/images/city-lasvegas.jpg",
      city: "Las Vegas",
      link: "/location/las-vegas"
    },
    {
      image: "/images/city-more.jpg",
      city: "More",
      link: "/location"
    }
  ];

  return (
    <section className="my-12 pt-4">
      <h2 className="text-2xl font-bold mb-6">Browse by Location</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {locations.map((location, index) => (
          <LocationCard
            key={index}
            image={location.image}
            city={location.city}
            link={location.link}
          />
        ))}
      </div>
    </section>
  );
};

export default LocationBrowser;