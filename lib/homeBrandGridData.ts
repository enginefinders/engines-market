export type HomeBrandPriceEntry = {
  name: string;
  displayName: string;
  slug: string;
  fromPrice: string;
  avgRebuilt: string;
  ctaText: string;
  logo: string;
};

export const homeFeaturedBrandSlugs = [
  "bmw",
  "mercedes-benz",
  "land-rover",
  "jaguar",
  "range-rover",
  "volkswagen",
  "audi",
  "ford",
  "toyota",
  "hyundai",
  "vauxhall",
  "mini",
];

export const homeBrandPriceDirectory: HomeBrandPriceEntry[] = [
  { name: "Alfa Romeo", displayName: "Alfa Romeo", slug: "alfa-romeo", fromPrice: "£900", avgRebuilt: "£2,000 - £4,500", ctaText: "Compare Alfa Romeo Engine Prices", logo: "alfa-romeo" },
  { name: "Aston Martin", displayName: "Aston Martin", slug: "aston-martin", fromPrice: "£4,500", avgRebuilt: "£8,000 - £18,000", ctaText: "Compare Aston Martin Engine Prices", logo: "aston-martin" },
  { name: "Audi", displayName: "Audi", slug: "audi", fromPrice: "£1,000", avgRebuilt: "£2,000 - £5,000", ctaText: "Compare Audi Engine Prices", logo: "audi" },
  { name: "Bentley", displayName: "Bentley", slug: "bentley", fromPrice: "£5,000", avgRebuilt: "£9,000 - £20,000", ctaText: "Compare Bentley Engine Prices", logo: "bentley" },
  { name: "BMW", displayName: "BMW", slug: "bmw", fromPrice: "£1,200", avgRebuilt: "£2,800 - £5,500", ctaText: "Compare BMW Engine Prices", logo: "bmw" },
  { name: "Cadillac", displayName: "Cadillac", slug: "cadillac", fromPrice: "£1,800", avgRebuilt: "£3,500 - £7,000", ctaText: "Compare Cadillac Engine Prices", logo: "cadillac" },
  { name: "Chevrolet", displayName: "Chevrolet", slug: "chevrolet", fromPrice: "£900", avgRebuilt: "£2,000 - £4,500", ctaText: "Compare Chevrolet Engine Prices", logo: "chevrolet" },
  { name: "Chrysler", displayName: "Chrysler", slug: "chrysler", fromPrice: "£1,200", avgRebuilt: "£2,500 - £5,500", ctaText: "Compare Chrysler Engine Prices", logo: "chrysler" },
  { name: "Citroen", displayName: "Citroen", slug: "citroen", fromPrice: "£650", avgRebuilt: "£1,200 - £2,600", ctaText: "Compare Citroen Engine Prices", logo: "citroen" },
  { name: "Dodge", displayName: "Dodge", slug: "dodge", fromPrice: "£1,500", avgRebuilt: "£3,000 - £6,500", ctaText: "Compare Dodge Engine Prices", logo: "dodge" },
  { name: "Ferrari", displayName: "Ferrari", slug: "ferrari", fromPrice: "£6,000", avgRebuilt: "£12,000 - £35,000", ctaText: "Compare Ferrari Engine Prices", logo: "ferrari" },
  { name: "Fiat", displayName: "Fiat", slug: "fiat", fromPrice: "£600", avgRebuilt: "£1,100 - £2,400", ctaText: "Compare Fiat Engine Prices", logo: "fiat" },
  { name: "Ford", displayName: "Ford", slug: "ford", fromPrice: "£700", avgRebuilt: "£1,400 - £3,200", ctaText: "Compare Ford Engine Prices", logo: "ford" },
  { name: "Honda", displayName: "Honda", slug: "honda", fromPrice: "£700", avgRebuilt: "£1,400 - £3,000", ctaText: "Compare Honda Engine Prices", logo: "honda" },
  { name: "Hyundai", displayName: "Hyundai", slug: "hyundai", fromPrice: "£750", avgRebuilt: "£1,500 - £3,000", ctaText: "Compare Hyundai Engine Prices", logo: "hyundai" },
  { name: "Isuzu", displayName: "Isuzu", slug: "isuzu", fromPrice: "£900", avgRebuilt: "£2,000 - £4,500", ctaText: "Compare Isuzu Engine Prices", logo: "isuzu" },
  { name: "Iveco", displayName: "Iveco", slug: "iveco", fromPrice: "£1,200", avgRebuilt: "£2,800 - £6,000", ctaText: "Compare Iveco Engine Prices", logo: "iveco" },
  { name: "Jaguar", displayName: "Jaguar", slug: "jaguar", fromPrice: "£1,300", avgRebuilt: "£2,800 - £6,500", ctaText: "Compare Jaguar Engine Prices", logo: "jaguar" },
  { name: "Jeep", displayName: "Jeep", slug: "jeep", fromPrice: "£1,000", avgRebuilt: "£2,200 - £5,000", ctaText: "Compare Jeep Engine Prices", logo: "jeep" },
  { name: "Kia", displayName: "Kia", slug: "kia", fromPrice: "£700", avgRebuilt: "£1,400 - £2,800", ctaText: "Compare Kia Engine Prices", logo: "kia" },
  { name: "Land Rover", displayName: "Land Rover", slug: "land-rover", fromPrice: "£1,400", avgRebuilt: "£3,200 - £7,000", ctaText: "Compare Land Rover Engine Prices", logo: "land-rover" },
  { name: "Lexus", displayName: "Lexus", slug: "lexus", fromPrice: "£1,200", avgRebuilt: "£2,600 - £5,500", ctaText: "Compare Lexus Engine Prices", logo: "lexus" },
  { name: "Mazda", displayName: "Mazda", slug: "mazda", fromPrice: "£750", avgRebuilt: "£1,500 - £3,200", ctaText: "Compare Mazda Engine Prices", logo: "mazda" },
  { name: "Mercedes-Benz", displayName: "Mercedes-Benz", slug: "mercedes-benz", fromPrice: "£1,200", avgRebuilt: "£2,600 - £5,000", ctaText: "Compare Mercedes Engine Prices", logo: "mercedes-benz" },
  { name: "MG", displayName: "MG", slug: "mg", fromPrice: "£650", avgRebuilt: "£1,300 - £2,600", ctaText: "Compare MG Engine Prices", logo: "mg" },
  { name: "MINI", displayName: "MINI", slug: "mini", fromPrice: "£1,100", avgRebuilt: "£2,400 - £4,500", ctaText: "Compare MINI Engine Prices", logo: "mini" },
  { name: "Mitsubishi", displayName: "Mitsubishi", slug: "mitsubishi", fromPrice: "£800", avgRebuilt: "£1,700 - £3,800", ctaText: "Compare Mitsubishi Engine Prices", logo: "mitsubishi" },
  { name: "Nissan", displayName: "Nissan", slug: "nissan", fromPrice: "£750", avgRebuilt: "£1,500 - £3,500", ctaText: "Compare Nissan Engine Prices", logo: "nissan" },
  { name: "Peugeot", displayName: "Peugeot", slug: "peugeot", fromPrice: "£650", avgRebuilt: "£1,200 - £2,600", ctaText: "Compare Peugeot Engine Prices", logo: "peugeot" },
  { name: "Porsche", displayName: "Porsche", slug: "porsche", fromPrice: "£2,500", avgRebuilt: "£5,500 - £14,000", ctaText: "Compare Porsche Engine Prices", logo: "porsche" },
  { name: "Range Rover", displayName: "Range Rover", slug: "range-rover", fromPrice: "£1,500", avgRebuilt: "£3,500 - £8,000", ctaText: "Compare Range Rover Engine Prices", logo: "range-rover" },
  { name: "Renault", displayName: "Renault", slug: "renault", fromPrice: "£600", avgRebuilt: "£1,100 - £2,500", ctaText: "Compare Renault Engine Prices", logo: "renault" },
  { name: "Rolls-Royce", displayName: "Rolls-Royce", slug: "rolls-royce", fromPrice: "£6,000", avgRebuilt: "£12,000 - £30,000", ctaText: "Compare Rolls-Royce Engine Prices", logo: "rolls-royce" },
  { name: "SEAT", displayName: "SEAT", slug: "seat", fromPrice: "£800", avgRebuilt: "£1,700 - £3,500", ctaText: "Compare SEAT Engine Prices", logo: "seat" },
  { name: "Skoda", displayName: "Skoda", slug: "skoda", fromPrice: "£800", avgRebuilt: "£1,700 - £3,500", ctaText: "Compare Skoda Engine Prices", logo: "skoda" },
  { name: "Subaru", displayName: "Subaru", slug: "subaru", fromPrice: "£1,000", avgRebuilt: "£2,200 - £4,800", ctaText: "Compare Subaru Engine Prices", logo: "subaru" },
  { name: "Suzuki", displayName: "Suzuki", slug: "suzuki", fromPrice: "£650", avgRebuilt: "£1,300 - £2,800", ctaText: "Compare Suzuki Engine Prices", logo: "suzuki" },
  { name: "Toyota", displayName: "Toyota", slug: "toyota", fromPrice: "£800", avgRebuilt: "£1,600 - £3,500", ctaText: "Compare Toyota Engine Prices", logo: "toyota" },
  { name: "Vauxhall", displayName: "Vauxhall", slug: "vauxhall", fromPrice: "£650", avgRebuilt: "£1,200 - £2,800", ctaText: "Compare Vauxhall Engine Prices", logo: "vauxhall" },
  { name: "Volkswagen", displayName: "Volkswagen", slug: "volkswagen", fromPrice: "£900", avgRebuilt: "£1,800 - £4,000", ctaText: "Compare VW Engine Prices", logo: "volkswagen" },
  { name: "Volvo", displayName: "Volvo", slug: "volvo", fromPrice: "£1,100", avgRebuilt: "£2,400 - £5,000", ctaText: "Compare Volvo Engine Prices", logo: "volvo" },
];
