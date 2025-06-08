export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  date: string;
  time?: string;
  venue: string;
  location: string;
  price: number | string;
  category: EventCategory;
  tags?: string[];
  availability?: string;
  cityId: string;
  featured?: boolean;
}

export interface City {
  id: string;
  name: string;
  image: string;
  description: string;
  timezone: string;
  eventCount?: number;
}

export type EventCategory = 'Concerts' | 'Sports' | 'Arts & Theater' | 'Comedy' | 'Festivals';

export type SortOption = 'Date (Soonest)' | 'Price (Low to High)' | 'Price (High to Low)' | 'Best Selling';
export type DateFilterOption = 'Any Date' | 'Today' | 'This Weekend' | 'This Week' | 'This Month';

// The complete event data
export const events: Record<string, Event> = {
  'rolling-stones': {
    id: 'rolling-stones',
    title: 'The Rolling Stones',
    description: 'The Rolling Stones are back on tour! Don\'t miss the unforgettable night of rock and roll.',
    longDescription: 'Join the legendary Rolling Stones as they embark on their final world tour. Experience the magic of Mick Jagger, Keith Richards, and Ronnie Wood performing all their greatest hits live. From "Paint It Black" to "Satisfaction," this concert will feature the band\'s most iconic songs from their six-decade career. This is potentially your last chance to see the world\'s greatest rock and roll band live in concert!',
    image: '/images/rolling-stones.jpg',
    date: '2025-06-15',
    time: '8:00 PM',
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    price: '$80 - $350',
    category: 'Concerts',
    tags: ['Rock', 'Classic Rock', 'Live Music'],
    availability: 'Limited',
    cityId: 'new-york',
    featured: true
  },
  'lakers-warriors': {
    id: 'lakers-warriors',
    title: 'Lakers vs. Warriors',
    description: 'See the showdown between the Lakers and Warriors. Witness the clash of titans in this thrilling basketball game.',
    longDescription: 'Don\'t miss this epic NBA showdown between the Los Angeles Lakers and the Golden State Warriors. Watch as the league\'s biggest stars battle it out on the court in what promises to be one of the most exciting games of the season. With championship implications on the line, both teams will be bringing their A-game to this highly anticipated matchup. Get your tickets now to witness basketball history in the making!',
    image: '/images/lakers-warriors.jpg',
    date: '2025-06-20',
    time: '7:30 PM',
    venue: 'Staples Center',
    location: 'Los Angeles, CA',
    price: '$60 - $300',
    category: 'Sports',
    tags: ['NBA', 'Basketball', 'Lakers', 'Warriors'],
    availability: 'Going Fast',
    cityId: 'los-angeles',
    featured: true
  },
  'phantom-opera': {
    id: 'phantom-opera',
    title: 'The Phantom of the Opera',
    description: 'Experience Andrew Lloyd Webber\'s Phantom of the Opera. Classic musical that will leave you spellbound.',
    longDescription: 'The Phantom of the Opera tells the tale of a disfigured musical genius known only as "The Phantom" who haunts the depths of the Paris Opera House. Mesmerized by the talent and beauty of a young soprano, Christine, The Phantom lures her as his protégé and falls fiercely in love with her. Unaware of Christine\'s love for Raoul, The Phantom\'s obsession sets the scene for a dramatic turn of events where jealousy, madness, and passions collide. Andrew Lloyd Webber\'s enthralling score includes "Think of Me," "Angel of Music," "Music of the Night," "All I Ask of You," "Masquerade," and the iconic title song.',
    image: '/images/phantom-opera.jpg',
    date: '2025-07-05',
    time: '7:00 PM',
    venue: 'Majestic Theatre',
    location: 'New York, NY',
    price: '$75 - $250',
    category: 'Arts & Theater',
    tags: ['Musical', 'Broadway', 'Theater'],
    availability: 'Available',
    cityId: 'new-york'
  },
  'comedy-night': {
    id: 'comedy-night',
    title: 'Comedy Night',
    description: 'A night of laughs with top comedians from around the country.',
    longDescription: 'Join us for an evening of non-stop laughter featuring some of the funniest comedians in the country. From observational humor to hilarious anecdotes, our comedy night will have you in stitches from start to finish. Each performer brings their unique style and perspective, ensuring a diverse and entertaining show that will appeal to all comedy fans.',
    image: '/images/category-comedy.jpg',
    date: '2025-06-10',
    time: '9:00 PM',
    venue: 'Comedy Club',
    location: 'Chicago, IL',
    price: '$45 - $75',
    category: 'Comedy',
    tags: ['Stand-up', 'Comedy', 'Nightlife'],
    availability: 'Available',
    cityId: 'chicago'
  },
  'summer-festival': {
    id: 'summer-festival',
    title: 'Summer Music Festival',
    description: 'Three days of amazing music across five stages with the hottest artists.',
    longDescription: 'Immerse yourself in the ultimate music experience at this year\'s Summer Music Festival. Featuring five unique stages and over 60 artists spanning multiple genres from pop and rock to electronic and hip-hop. Camp under the stars, enjoy gourmet food options, and create memories that will last a lifetime. This three-day event has become one of the most anticipated festivals in the country.',
    image: '/images/category-festivals1.jpg',
    date: '2025-06-24',
    time: '12:00 PM',
    venue: 'Grant Park',
    location: 'Chicago, IL',
    price: '$150 - $350',
    category: 'Festivals',
    tags: ['Music', 'Festival', 'Outdoor', 'Summer'],
    availability: 'Limited',
    cityId: 'chicago'
  },
  'ny-comedy-fest': {
    id: 'ny-comedy-fest',
    title: 'New York Comedy Festival',
    date: '2025-07-05',
    time: '8:30 PM',
    venue: 'Caroline\'s on Broadway',
    location: 'New York, NY',
    description: 'The biggest comedy festival in New York featuring world-class comedians.',
    longDescription: 'The New York Comedy Festival brings together the best comedic talent from around the globe. With performances across multiple venues in the city, you can enjoy shows from both established comedy legends and rising stars. From stand-up to improv, this festival showcases all styles of comedy for an unforgettable experience.',
    image: '/images/category-comedy3.jpg',
    category: 'Comedy',
    price: '$65 - $85',
    tags: ['Comedy', 'Festival', 'Stand-up'],
    cityId: 'new-york'
  },
  'ny-jazz-night': {
    id: 'ny-jazz-night',
    title: 'Jazz Night in Central Park',
    date: '2025-06-10',
    time: '7:00 PM',
    venue: 'Central Park',
    location: 'New York, NY',
    description: 'An evening of smooth jazz under the stars in Central Park.',
    longDescription: 'Experience the magic of live jazz in the heart of New York City. This special outdoor concert brings together some of the finest jazz musicians for an evening of soulful melodies and improvisations. Bring a blanket and picnic as you enjoy the sophisticated sounds and the beautiful Central Park backdrop.',
    image: '/images/category-concerts.jpg',
    category: 'Concerts',
    price: '$35 - $45',
    tags: ['Jazz', 'Outdoor Concert', 'Live Music'],
    cityId: 'new-york'
  },
  'la-philharmonic': {
    id: 'la-philharmonic',
    title: 'LA Philharmonic',
    date: '2025-06-25',
    time: '8:00 PM',
    venue: 'Walt Disney Concert Hall',
    location: 'Los Angeles, CA',
    description: 'Experience the LA Philharmonic perform classical masterpieces.',
    longDescription: 'The Los Angeles Philharmonic, under the direction of Gustavo Dudamel, presents an evening of classical masterworks. The program includes pieces by Mozart, Beethoven, and Tchaikovsky, showcasing the orchestra\'s virtuosity and emotional depth. The iconic Walt Disney Concert Hall provides the perfect acoustic setting for this unforgettable performance.',
    image: '/images/category-arts.jpg',
    category: 'Arts & Theater',
    price: '$75 - $150',
    tags: ['Classical', 'Orchestra', 'Arts'],
    cityId: 'los-angeles'
  },
  'hollywood-comedy': {
    id: 'hollywood-comedy',
    title: 'Hollywood Comedy Night',
    date: '2025-07-02',
    time: '9:00 PM',
    venue: 'The Comedy Store',
    location: 'Los Angeles, CA',
    description: 'Laugh along with top comedians at this Hollywood comedy showcase.',
    longDescription: 'The legendary Comedy Store hosts another night of side-splitting humor with a lineup of top comedians. From household names to emerging talents, the performers will keep you laughing all night long. The Comedy Store has launched the careers of many comedy greats, and you never know which future star you might see on this historic stage.',
    image: '/images/category-comedy2.jpg',
    category: 'Comedy',
    price: '$45 - $60',
    tags: ['Comedy', 'Stand-up', 'Nightlife'],
    cityId: 'los-angeles'
  },
  'chicago-blues': {
    id: 'chicago-blues',
    title: 'Chicago Blues Festival',
    date: '2025-06-12',
    time: '2:00 PM',
    venue: 'Grant Park',
    location: 'Chicago, IL',
    description: 'The largest free blues festival in the world right in the heart of Chicago.',
    longDescription: 'The Chicago Blues Festival celebrates the city\'s rich blues heritage with performances from local legends and international stars. As the largest free blues festival globally, it attracts hundreds of thousands of music fans to Grant Park for three days of electrifying performances. From traditional delta blues to contemporary interpretations, the festival offers something for every blues enthusiast.',
    image: '/images/category-festivals.jpg',
    category: 'Festivals',
    price: '$0 - $40',
    tags: ['Blues', 'Festival', 'Music'],
    cityId: 'chicago'
  },
  'cubs-cardinals': {
    id: 'cubs-cardinals',
    title: 'Cubs vs. Cardinals',
    date: '2025-06-18',
    time: '1:20 PM',
    venue: 'Wrigley Field',
    location: 'Chicago, IL',
    description: 'Witness this classic MLB rivalry at the historic Wrigley Field.',
    longDescription: 'Experience one of baseball\'s greatest rivalries as the Chicago Cubs take on the St. Louis Cardinals at the iconic Wrigley Field. This matchup between National League Central division foes always delivers excitement and intensity. Enjoy America\'s pastime in one of baseball\'s most beloved and historic venues, complete with the famous ivy-covered outfield walls and hand-operated scoreboard.',
    image: '/images/category-sports.jpg',
    category: 'Sports',
    price: '$45 - $200',
    tags: ['Baseball', 'MLB', 'Sports'],
    cityId: 'chicago'
  },
  'sf-symphony': {
    id: 'sf-symphony',
    title: 'San Francisco Symphony',
    date: '2025-06-14',
    time: '8:00 PM',
    venue: 'Davies Symphony Hall',
    location: 'San Francisco, CA',
    description: 'An evening of classical excellence with the San Francisco Symphony.',
    longDescription: 'The San Francisco Symphony, one of America\'s most innovative orchestras, presents a program featuring works from both traditional and contemporary composers. Under the direction of its music director, the orchestra brings technical precision and emotional depth to every performance. Davies Symphony Hall provides an acoustically superior setting for this celebration of classical music.',
    image: '/images/category-arts2.jpg',
    category: 'Arts & Theater',
    price: '$60 - $175',
    tags: ['Classical', 'Symphony', 'Orchestra'],
    cityId: 'san-francisco'
  },
  'sf-giants-game': {
    id: 'sf-giants-game',
    title: 'SF Giants vs. LA Dodgers',
    date: '2025-06-22',
    time: '1:05 PM',
    venue: 'Oracle Park',
    location: 'San Francisco, CA',
    description: 'Watch this intense West Coast rivalry between the Giants and Dodgers.',
    longDescription: 'One of baseball\'s oldest and most storied rivalries comes to Oracle Park as the San Francisco Giants host the Los Angeles Dodgers. This matchup between these National League West competitors always delivers excitement and intensity. Enjoy the game from one of baseball\'s most beautiful ballparks, with its stunning views of San Francisco Bay and the iconic McCovey Cove, where home run balls splash into the water.',
    image: '/images/category-sports1.jpg',
    category: 'Sports',
    price: '$45 - $150',
    tags: ['Baseball', 'MLB', 'Sports'],
    cityId: 'san-francisco'
  },
  'cirque-soleil': {
    id: 'cirque-soleil',
    title: 'Cirque du Soleil: O',
    date: '2025-06-09',
    time: '7:00 PM',
    venue: 'Bellagio',
    location: 'Las Vegas, NV',
    description: 'The aquatic masterpiece from Cirque du Soleil at the Bellagio.',
    longDescription: 'Cirque du Soleil\'s "O" is a breathtaking aquatic masterpiece that weaves together a tapestry of artistry, surrealism, and theatrical romance. Set in, on, and above a 1.5-million-gallon pool, world-class acrobats, synchronized swimmers, and divers create a breathtaking experience unique to Las Vegas. The show\'s name, "O," is derived from the French word for water, "eau," and perfectly captures the fluid nature of this stunning production.',
    image: '/images/category-arts1.jpg',
    category: 'Arts & Theater',
    price: '$95 - $190',
    tags: ['Cirque du Soleil', 'Acrobatics', 'Theater'],
    cityId: 'las-vegas'
  },
  'lv-residency': {
    id: 'lv-residency',
    title: 'Adele Residency',
    date: '2025-07-01',
    time: '8:00 PM',
    venue: 'Caesars Palace',
    location: 'Las Vegas, NV',
    description: 'Experience Adele\'s powerhouse vocals in this intimate Las Vegas residency.',
    longDescription: 'Grammy-winning superstar Adele continues her acclaimed Las Vegas residency at the iconic Caesars Palace. In this intimate setting, Adele delivers a powerful performance featuring her greatest hits and personal stories. Her unmistakable voice and emotional connection with the audience create an unforgettable experience that has become one of the most sought-after tickets in Las Vegas entertainment.',
    image: '/images/category-concerts1.jpg',
    category: 'Concerts',
    price: '$150 - $550',
    tags: ['Pop', 'Vocal', 'Live Music', 'Residency'],
    cityId: 'las-vegas'
  },
  'lv-comedy': {
    id: 'lv-comedy',
    title: 'Comedy Cellar',
    date: '2025-06-15',
    time: '9:30 PM',
    venue: 'Rio Hotel & Casino',
    location: 'Las Vegas, NV',
    description: 'The famous Comedy Cellar brings New York-style stand-up to Las Vegas.',
    longDescription: 'The legendary Comedy Cellar brings its New York brand of stand-up comedy to Las Vegas with a rotating lineup of comedy\'s brightest stars. Known for surprise appearances by comedy legends and a true comedy club atmosphere, the Comedy Cellar recreates its iconic Greenwich Village experience. With performers from Netflix specials, late-night TV, and top comedy festivals, each show offers a unique and hilarious lineup.',
    image: '/images/category-comedy1.jpg',
    category: 'Comedy',
    price: '$45 - $65',
    tags: ['Comedy', 'Stand-up', 'Nightlife'],
    cityId: 'las-vegas'
  }
};

// Cities data
export const cities: Record<string, City> = {
  'new-york': {
    id: 'new-york',
    name: 'New York',
    image: '/images/city-newyork.jpg',
    description: 'The city that never sleeps offers world-class entertainment, from Broadway shows to sporting events at Madison Square Garden.',
    timezone: 'America/New_York',
    eventCount: 423
  },
  'los-angeles': {
    id: 'los-angeles',
    name: 'Los Angeles',
    image: '/images/city-losangeles.jpg',
    description: 'Experience the best entertainment in LA, from Hollywood shows to sporting events at the Staples Center.',
    timezone: 'America/Los_Angeles',
    eventCount: 318
  },
  'chicago': {
    id: 'chicago',
    name: 'Chicago',
    image: '/images/city-chicago.jpg',
    description: 'Chicago\'s vibrant entertainment scene features everything from jazz clubs to major sporting events.',
    timezone: 'America/Chicago',
    eventCount: 256
  },
  'san-francisco': {
    id: 'san-francisco',
    name: 'San Francisco',
    image: '/images/city-sanfrancisco.jpg', 
    description: 'San Francisco offers diverse entertainment options from the historic Fillmore to Oracle Park.',
    timezone: 'America/Los_Angeles',
    eventCount: 201
  },
  'las-vegas': {
    id: 'las-vegas',
    name: 'Las Vegas',
    image: '/images/city-lasvegas.jpg',
    description: 'Las Vegas is the entertainment capital of the world, featuring world-class shows, concerts, and sporting events.',
    timezone: 'America/Los_Angeles',
    eventCount: 189
  },
  'miami': {
    id: 'miami',
    name: 'Miami',
    image: '/images/city-more.jpg',
    description: 'Miami\'s vibrant culture offers everything from Latin music to world-class sporting events.',
    timezone: 'America/New_York',
    eventCount: 176
  },
  'austin': {
    id: 'austin',
    name: 'Austin',
    image: '/images/city-more.jpg',
    description: 'Live music capital of the world with a thriving cultural and arts scene.',
    timezone: 'America/Chicago',
    eventCount: 152
  },
  'seattle': {
    id: 'seattle',
    name: 'Seattle',
    image: '/images/city-more.jpg',
    description: 'Seattle\'s diverse entertainment options range from indie music to major sports teams.',
    timezone: 'America/Los_Angeles',
    eventCount: 142
  },
  'nashville': {
    id: 'nashville',
    name: 'Nashville',
    image: '/images/city-more.jpg',
    description: 'Country music capital offering legendary venues like the Grand Ole Opry.',
    timezone: 'America/Chicago',
    eventCount: 137
  },
  'denver': {
    id: 'denver',
    name: 'Denver',
    image: '/images/city-more.jpg',
    description: 'Denver combines outdoor adventure with a thriving arts and music scene.',
    timezone: 'America/Denver',
    eventCount: 129
  },
  'boston': {
    id: 'boston',
    name: 'Boston',
    image: '/images/city-more.jpg',
    description: 'Historic Boston offers world-class orchestras, theaters, and sports teams.',
    timezone: 'America/New_York',
    eventCount: 118
  },
  'orlando': {
    id: 'orlando',
    name: 'Orlando',
    image: '/images/city-more.jpg',
    description: 'Beyond theme parks, Orlando offers diverse entertainment options.',
    timezone: 'America/New_York',
    eventCount: 105
  }
};

// Utility functions
export const getCurrentDate = (): Date => {
  // Using a fixed date for consistent behavior
  return new Date('2025-06-08');
};

export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  return new Date(dateString).toLocaleDateString('en-US', mergedOptions);
};

export const getEventsByCity = (cityId: string): Event[] => {
  return Object.values(events).filter(event => event.cityId === cityId);
};

export const getRelatedEvents = (eventId: string, limit: number = 3): Event[] => {
  const event = events[eventId];
  if (!event) return [];
  
  // First try to find events in same category and city
  let related = Object.values(events).filter(e => 
    e.id !== eventId && 
    e.category === event.category && 
    e.cityId === event.cityId
  );
  
  // If not enough, add events from same category
  if (related.length < limit) {
    const sameCategory = Object.values(events).filter(e => 
      e.id !== eventId && 
      e.category === event.category &&
      !related.includes(e)
    );
    related = [...related, ...sameCategory];
  }
  
  // If still not enough, add events from same city
  if (related.length < limit) {
    const sameCity = Object.values(events).filter(e => 
      e.id !== eventId && 
      e.cityId === event.cityId &&
      !related.includes(e)
    );
    related = [...related, ...sameCity];
  }
  
  // If still not enough, add other events
  if (related.length < limit) {
    const other = Object.values(events).filter(e => 
      e.id !== eventId &&
      !related.includes(e)
    );
    related = [...related, ...other];
  }
  
  return related.slice(0, limit);
};

// Ticket section helper for event detail page
export const getTicketSections = (eventId: string) => {
  const event = events[eventId];
  if (!event) return [];
  
  const prices = typeof event.price === 'string'
    ? event.price.split('-').map(p => parseInt(p.replace(/\D/g, '')))
    : [event.price];

  const basePrice = prices[0] || 100;
  const topPrice = prices[1] || prices[0] || 100;
  const division = (topPrice - basePrice)/10;
  
  return [
    { 
      id: 'vip', 
      name: 'VIP Section', 
      price: topPrice
    },
    { 
      id: 'premium', 
      name: 'Premium Seats', 
      price: basePrice + division * 7
    },
    { 
      id: 'standard', 
      name: 'Standard Admission', 
      price: basePrice + division * 3
    },
    { 
      id: 'budget', 
      name: 'Budget Friendly', 
      price: basePrice
    }
  ];
};

// Filter and sort events
export const filterEvents = (
  eventsList: Event[],
  categoryFilter: string = 'All Categories',
  dateFilter: DateFilterOption = 'Any Date',
  sortOption: SortOption = 'Date (Soonest)'
): Event[] => {
  let result = [...eventsList];
  const currentDate = getCurrentDate();
  
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
  switch (sortOption) {
    case 'Date (Soonest)':
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case 'Price (Low to High)':
      result.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : 
          parseInt(a.price.toString().replace(/[^\d]/g, '')) || 0;
        const priceB = typeof b.price === 'number' ? b.price : 
          parseInt(b.price.toString().replace(/[^\d]/g, '')) || 0;
        return priceA - priceB;
      });
      break;
    case 'Price (High to Low)':
      result.sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : 
          parseInt(a.price.toString().replace(/[^\d]/g, '')) || 0;
        const priceB = typeof b.price === 'number' ? b.price : 
          parseInt(b.price.toString().replace(/[^\d]/g, '')) || 0;
        return priceB - priceA;
      });
      break;
    case 'Best Selling':
      // In a real app, this would use actual sales data
      // Here we're using alphabetical order as a placeholder
      result.sort((a, b) => a.id.localeCompare(b.id));
      break;
  }
  
  return result;
};

export const isEventHappeningSoon = (dateString: string): boolean => {
  const eventDate = new Date(dateString);
  const currentDate = getCurrentDate();
  const timeDiff = eventDate.getTime() - currentDate.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 7 && daysDiff >= 0;
};

export const getAllEvents = (): Event[] => {
  return Object.values(events);
};

export const getLocalTime = (timezone: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: timezone
  };
  return new Date().toLocaleTimeString('en-US', options);
};