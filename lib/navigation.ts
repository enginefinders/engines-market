export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationGroup = NavigationLink & {
  links?: NavigationLink[];
};

export const serviceLinks: NavigationLink[] = [
  { label: "Replacement Engines", href: "/services/replacement-engines" },
  { label: "Used Engines", href: "/services/used-engines" },
  { label: "Reconditioned Engines", href: "/services/reconditioned-engines" },
  { label: "Rebuilt Engines", href: "/services/rebuilt-engines" },
  { label: "Engine Fitting", href: "/services/engine-fitting" },
  { label: "Engine Repair", href: "/services/engine-repair" },
  { label: "Engine Diagnostics", href: "/services/engine-diagnostic" },
  { label: "Gearbox Replacement", href: "/services/gearbox-replacement" },
];

export const priceLinks: NavigationLink[] = [
  { label: "Engine Replacement Cost", href: "/prices/engine-replacement-cost" },
  { label: "Used Engine Cost", href: "/prices/used-engine-cost" },
  { label: "Reconditioned Engine Cost", href: "/prices/reconditioned-engine-cost" },
  { label: "Engine Fitting Cost", href: "/prices/engine-fitting-cost" },
  { label: "Labour Cost Guide", href: "/prices/garage-labour-rates" },
  { label: "Timing Chain Cost", href: "/prices/timing-chain-replacement-cost" },
  { label: "Head Gasket Cost", href: "/prices/head-gasket-repair-cost" },
  { label: "Turbo Cost", href: "/prices/turbo-replacement-cost" },
];

export const brandLinks: NavigationLink[] = [
  { label: "Alfa Romeo", href: "/alfa-romeo" },
  { label: "Aston Martin", href: "/aston-martin" },
  { label: "Audi", href: "/audi" },
  { label: "Bentley", href: "/bentley" },
  { label: "BMW", href: "/bmw" },
  { label: "Cadillac", href: "/cadillac" },
  { label: "Chevrolet", href: "/chevrolet" },
  { label: "Chrysler", href: "/chrysler" },
  { label: "Citroen", href: "/citroen" },
  { label: "Dodge", href: "/dodge" },
  { label: "Ferrari", href: "/ferrari" },
  { label: "Fiat", href: "/fiat" },
  { label: "Ford", href: "/ford" },
  { label: "Honda", href: "/honda" },
  { label: "Hyundai", href: "/hyundai" },
  { label: "Isuzu", href: "/isuzu" },
  { label: "Iveco", href: "/iveco" },
  { label: "Jaguar", href: "/jaguar" },
  { label: "Jeep", href: "/jeep" },
  { label: "Kia", href: "/kia" },
  { label: "Land Rover", href: "/land-rover" },
  { label: "Lexus", href: "/lexus" },
  { label: "Mazda", href: "/mazda" },
  { label: "Mercedes-Benz", href: "/mercedes-benz" },
  { label: "MG", href: "/mg" },
  { label: "MINI", href: "/mini" },
  { label: "Mitsubishi", href: "/mitsubishi" },
  { label: "Nissan", href: "/nissan" },
  { label: "Peugeot", href: "/peugeot" },
  { label: "Porsche", href: "/porsche" },
  { label: "Range Rover", href: "/range-rover" },
  { label: "Renault", href: "/renault" },
  { label: "Rolls-Royce", href: "/rolls-royce" },
  { label: "SEAT", href: "/seat" },
  { label: "Skoda", href: "/skoda" },
  { label: "Subaru", href: "/subaru" },
  { label: "Suzuki", href: "/suzuki" },
  { label: "Toyota", href: "/toyota" },
  { label: "Vauxhall", href: "/vauxhall" },
  { label: "Volkswagen", href: "/volkswagen" },
  { label: "Volvo", href: "/volvo" },
];

export const featuredBrandLinks: NavigationLink[] = [
  { label: "BMW", href: "/bmw" },
  { label: "Mercedes-Benz", href: "/mercedes-benz" },
  { label: "Land Rover", href: "/land-rover" },
  { label: "Audi", href: "/audi" },
  { label: "Ford", href: "/ford" },
  { label: "Vauxhall", href: "/vauxhall" },
  { label: "All 41 Brands", href: "/resources#brands" },
];

export const knowledgeLinks: NavigationLink[] = [
  { label: "Engine Failures", href: "/failures" },
  { label: "Car Symptoms", href: "/symptoms" },
  { label: "Compare Options", href: "/compare" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Guides & Tools", href: "/guides" },
  { label: "All Resources", href: "/resources" },
];

export const insightLinks: NavigationLink[] = [
  { label: "UK Engine Price Index", href: "/insights/uk-engine-price-index.html" },
  { label: "Engine Replacement Statistics", href: "/insights/uk-engine-replacement-statistics.html" },
  { label: "Most Replaced Engines", href: "/insights/most-replaced-engines-uk.html" },
  { label: "Most Reliable Engines", href: "/insights/most-reliable-diesel-engines.html" },
  { label: "UK Market Report 2026", href: "/insights/uk-engine-market-report-2026.html" },
];

export const headerNavigation: NavigationGroup[] = [
  { label: "Services", href: "/services", links: serviceLinks },
  { label: "Prices", href: "/prices", links: priceLinks },
  { label: "Brands", href: "/resources#brands", links: featuredBrandLinks },
  { label: "Knowledge", href: "/resources", links: knowledgeLinks },
  { label: "Insights", href: "/insights", links: insightLinks },
  { label: "Blog", href: "/blog" },
];

export const companyLinks: NavigationLink[] = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/about/how-engines-market-works" },
  { label: "Supplier Standards", href: "/about/supplier-standards" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/about/contact" },
];

export const legalLinks: NavigationLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { label: "Cookie Policy", href: "/legal" },
  { label: "Modern Slavery", href: "/legal" },
  { label: "Accessibility", href: "/legal" },
];

export const toolLinks: NavigationLink[] = [
  { label: "Find Engine Number", href: "/guides" },
  { label: "Engine History Check", href: "/guides" },
  { label: "Locations", href: "/locations" },
  { label: "View All Resources", href: "/resources" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export const footerNavigation = [
  { label: "Company", links: companyLinks },
  { label: "Services", links: serviceLinks.slice(0, 6) },
  { label: "Knowledge", links: knowledgeLinks.slice(0, 5) },
  { label: "Legal", links: legalLinks },
  { label: "Tools", links: toolLinks },
];

export const resourceSections = [
  { id: "company", title: "Trust, Legal & Platform", links: [...companyLinks, ...legalLinks] },
  { id: "services", title: "Services", links: serviceLinks },
  { id: "prices", title: "Price Guides", links: priceLinks },
  { id: "brands", title: "Brands", links: brandLinks },
  { id: "knowledge", title: "Knowledge Hubs", links: knowledgeLinks },
  { id: "insights", title: "Insights", links: insightLinks },
];
