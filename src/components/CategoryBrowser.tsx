import Image from 'next/image';
import Link from 'next/link';

const CategoryCard: React.FC<{
  image: string;
  title: string;
  link: string;
}> = ({ image, title, link}) => {
  return (
    <Link href={link}>
      <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-black aspect-square`}>
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover opacity-80`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white font-bold text-xl">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategoryBrowser: React.FC = () => {
  const categories = [
    {
      image: "/images/category-concerts.jpg",
      title: "Concerts",
      link: "/concerts"
    },
    {
      image: "/images/category-sports.jpg",
      title: "Sports",
      link: "/sports"
    },
    {
      image: "/images/category-arts.jpg",
      title: "Arts & Theater",
      link: "/arts-theater"
    },
    {
      image: "/images/category-festivals.jpg",
      title: "Festivals",
      link: "/festivals"
    },
    {
      image: "/images/category-comedy.jpg",
      title: "Comedy",
      link: "/comedy"
    },
  ];

  return (
    <section className="my-12 pt-4">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            image={category.image}
            title={category.title}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowser;