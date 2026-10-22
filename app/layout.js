import { Lora, Poppins } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NeevSaathi — Trusted Construction Contractor in Jaipur, Rajasthan',
    template: '%s | NeevSaathi Construction Jaipur'
  },
  description: 'Premium house construction, commercial building, structural civil contracting & turnkey projects in Jaipur, Rajasthan. Transparent BOQ estimates, certified materials, and verified on-time execution.',
  keywords: [
    'construction contractor jaipur',
    'house construction jaipur',
    'civil contractor rajasthan',
    'building contractor vaishali nagar',
    'turnkey construction jaipur',
    'home renovation jaipur',
    'commercial building jaipur'
  ],
  authors: [{ name: 'NeevSaathi Construction' }],
  creator: 'NeevSaathi',
  publisher: 'NeevSaathi Construction & Contracting Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'NeevSaathi — Building Your Vision, From Foundation to Finish',
    description: 'Trusted construction services in Jaipur and nearby areas, built around quality, transparency, and your vision.',
    url: 'https://neevsaathi.com',
    siteName: 'NeevSaathi Construction',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NeevSaathi Construction Project in Jaipur',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeevSaathi Construction Contractor Jaipur',
    description: 'Trusted residential & commercial construction in Jaipur, Rajasthan. From foundation to finish.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'NeevSaathi',
    legalName: 'NeevSaathi Construction & Contracting Pvt. Ltd.',
    description: 'Trusted construction services in Jaipur and nearby areas, built around quality, transparency, and your vision.',
    url: 'https://neevsaathi.com',
    telephone: '+919829012345',
    email: 'contact@neevsaathi.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 42, Main Tonk Road, Near Gopalpura Flyover',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302015',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.885141',
      longitude: '75.720517'
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Jaipur' },
      { '@type': 'AdministrativeArea', name: 'Vaishali Nagar' },
      { '@type': 'AdministrativeArea', name: 'Mansarovar' },
      { '@type': 'AdministrativeArea', name: 'Malviya Nagar' },
      { '@type': 'AdministrativeArea', name: 'Jagatpura' },
      { '@type': 'AdministrativeArea', name: 'Rajasthan' }
    ],
    priceRange: '₹₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:30'
      }
    ]
  };

  return (
    <html lang="en" className={`${lora.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-beige-100 text-brown-dark font-sans antialiased selection:bg-terracotta selection:text-white">
        {children}
      </body>
    </html>
  );
}
