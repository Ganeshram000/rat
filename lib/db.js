import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Default Seed Data
const DEFAULT_SETTINGS = {
  businessName: 'NeevSaathi',
  legalName: 'NeevSaathi Construction & Contracting Pvt. Ltd.',
  tagline: 'Building Your Vision, From Foundation to Finish.',
  shortDescription: 'Trusted construction services in Jaipur and nearby areas, built around quality, transparency, and your vision.',
  phone: '+91 98290 12345',
  whatsapp: '+91 98290 12345',
  email: 'contact@neevsaathi.com',
  address: 'Plot No. 42, Main Tonk Road, Near Gopalpura Flyover, Jaipur, Rajasthan 302015',
  city: 'Jaipur',
  state: 'Rajasthan',
  postalCode: '302015',
  country: 'India',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113886.72147449232!2d75.7205178652433!3d26.88514167905151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  serviceAreas: [
    'Vaishali Nagar, Jaipur',
    'Mansarovar & Gopalpura, Jaipur',
    'Malviya Nagar & Jagatpura, Jaipur',
    'C-Scheme & Civil Lines, Jaipur',
    'Ajmer Road & Bhankrota',
    'Tonk Road & Sitapura Industrial Area',
    'Sikar Road & Vidhyadhar Nagar',
    'Raja Park & Jawahar Nagar',
    'Nearby Areas: Chomu, Dausa, Phulera, Bagru'
  ],
  socialLinks: {
    facebook: 'https://facebook.com/neevsaathi',
    instagram: 'https://instagram.com/neevsaathi.constructions',
    linkedin: 'https://linkedin.com/company/neevsaathi',
    youtube: 'https://youtube.com/@neevsaathi'
  },
  seo: {
    metaTitle: 'NeevSaathi — Trusted Construction Contractor in Jaipur, Rajasthan',
    metaDescription: 'Premium house construction, commercial building, civil contracting & turnkey projects in Jaipur. Transparent pricing, top-tier materials & engineering precision.',
    keywords: 'construction contractor jaipur, house construction jaipur, civil contractor rajasthan, home renovation jaipur, turnkey construction jaipur, building contractor vaishali nagar'
  }
};

const DEFAULT_SERVICES = [
  {
    id: 'residential-construction',
    slug: 'residential-construction',
    title: 'Residential House Construction',
    category: 'Residential',
    shortDescription: 'Custom villas, duplex bungalows, and independent residences built with uncompromised structural integrity and modern aesthetics.',
    description: 'From soil testing and structural excavation to final paint and fixtures, NeevSaathi delivers turnkey residential construction tailored to your lifestyle. We ensure Fe550D TMT steel, grade-certified concrete, and Rajasthani architectural detailing for homes that last generations.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'Comprehensive architectural blueprint & structural CAD drawings',
      'Excavation, anti-termite treatment & reinforced foundation casting',
      'Fe550D TMT bar reinforcement and M25/M30 grade RMC/machine mix concrete',
      'First-class red clay brick or AAC lightweight block masonry',
      'Double-coat sand face exterior plaster & smooth Gypsum interior finish',
      'Concealed Finolex/Havells copper wiring & modular switchboards',
      'Astral/Supreme CPVC plumbing with premium Kohler/Jaquar sanitary fittings',
      'Vitrified tiles/Italian marble flooring & Asian Paints Apex Ultima exterior finish'
    ],
    suitableFor: 'Independent plot owners, luxury villa builders, and duplex buyers across Jaipur and NCR Rajasthan.',
    published: true,
    order: 1
  },
  {
    id: 'commercial-construction',
    slug: 'commercial-construction',
    title: 'Commercial Construction',
    category: 'Commercial',
    shortDescription: 'Modern corporate offices, retail spaces, commercial plazas, and showrooms designed for functionality, durability, and business growth.',
    description: 'We construct commercial properties engineered to maximize usable carpet area, optimize natural lighting, and comply fully with Jaipur Development Authority (JDA) and National Building Code (NBC) norms.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'JDA municipal compliance & structural safety certifications',
      'Heavy-load RCC raft/isolated footing & multi-level framing',
      'Structural glazing, curtain walls & ACP cladding systems',
      'High-capacity electrical sub-stations, transformer setups & 3-phase wiring',
      'Fire-fighting piping, smoke detector arrays & emergency exits',
      'HVAC ducting rough-ins & commercial elevator shaft engineering',
      'Basement water-proofing with polyurethane membrane injection',
      'Heavy-duty vitrified/epoxy flooring for high footfall traffic'
    ],
    suitableFor: 'Business owners, corporate developers, retail chains, and commercial property investors.',
    published: true,
    order: 2
  },
  {
    id: 'home-renovation',
    slug: 'home-renovation',
    title: 'Home Renovation & Remodeling',
    category: 'Renovation',
    shortDescription: 'Transform existing houses with structural upgrades, floor additions, modular interiors, modern elevations, and water-proofing.',
    description: 'Revitalize your ancestral or older home with our specialized remodeling solutions. From adding a new second floor to retrofitting structural beams and giving the facade a modern look, we execute renovations with minimal disruption to your daily life.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'Structural audit and load-bearing feasibility assessment',
      'Safe demolition & debris disposal using eco-friendly protocols',
      'Elevation facelift using stone cladding, louvers & HPL sheets',
      'Bathroom remodeling with waterproof membranes & modern fixtures',
      'Kitchen transformation into contemporary modular layout',
      'Floor additions and column reinforcement with micro-concreting',
      'Comprehensive terrace & wall dampness waterproofing treatments',
      'Full re-wiring & plumbing replacement to eliminate old line leakages'
    ],
    suitableFor: 'Homeowners in established Jaipur colonies (Malviya Nagar, Mansarovar, C-Scheme, Raja Park) seeking modern lifestyle upgrades.',
    published: true,
    order: 3
  },
  {
    id: 'structural-civil-work',
    slug: 'structural-civil-work',
    title: 'Structural & Civil Work',
    category: 'Civil',
    shortDescription: 'Earthwork, deep foundations, RCC framing, retaining walls, and precision concrete casting executed strictly to IS codes.',
    description: 'The foundation is the bedrock of every enduring structure. NeevSaathi specializes in heavy civil engineering, column-beam casting, and structural retrofitting with stringent slump tests, cube strength tests, and laser-guided level checks.',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'Geotechnical soil investigation & SBC (Safe Bearing Capacity) determination',
      'Machine excavation, anti-termite chemical barrier treatment',
      'Plinth beam tie-ins, DPC (Damp Proof Course) execution',
      'Precision steel shuttering and waterproof plywood formwork',
      'Monolithic concrete pour with needle vibration consolidation',
      '21-day pond curing & membrane water curing systems',
      'Retaining walls for basement & underground water reservoir tanks',
      'Continuous quality reporting with on-site compressive cube testing'
    ],
    suitableFor: 'Architects, builders, and plot owners requiring pure civil & structural contracting contracts.',
    published: true,
    order: 4
  },
  {
    id: 'interior-finishing',
    slug: 'interior-finishing',
    title: 'Interior & Finishing Work',
    category: 'Interior',
    shortDescription: 'Architectural false ceilings, Italian marble polishing, modular cabinetry, electrical fixtures, and designer wall finishes.',
    description: 'We bridge structural strength with refined living spaces. Our interior craftsmen deliver bespoke woodwork, acoustic false ceilings, designer lighting setups, and luxurious wall coatings that make your space feel warm, expansive, and prestigious.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'Gypsum plasterboard & Saint-Gobain acoustic false ceilings',
      'Designer cove lighting & smart home automation conduit integration',
      'Italian marble laying with diamond-pad mirror polishing',
      'Large-format 4x2 / 6x4 vitrified glazed porcelain tile installation',
      'Waterproof plywood modular kitchen & wardrobe carcass installation',
      'Solid teakwood/flush door frames with Hafele/Godrej hardware',
      'Velvet touch interior paints, textured stucco & micro-cement accents',
      'Toughened glass railings, shower cubicles & aluminum slimline windows'
    ],
    suitableFor: 'Homeowners and boutique commercial spaces seeking turnkey interior completion with premium finishes.',
    published: true,
    order: 5
  },
  {
    id: 'turnkey-construction',
    slug: 'turnkey-construction',
    title: 'Turnkey Construction (End-to-End)',
    category: 'Turnkey',
    shortDescription: 'Complete single-point responsibility: from architectural design and municipal approvals to civil construction, interior finishing, and final key handover.',
    description: 'Experience absolute peace of mind with NeevSaathi Turnkey Solutions. We take complete ownership of your project: architectural drawings, government approvals, material procurement, on-site execution, interior styling, and handover on guaranteed milestones.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    includedWork: [
      'End-to-end single contract with transparent stage-wise billing',
      'Complete 2D floor plans, 3D elevations & structural engineering',
      'Procurement of branded cement (UltraTech/Ambuja) and steel (Tata Tiscon/Jindal)',
      'Dedicated on-site site engineer and weekly photographic progress reports',
      'Full civil, electrical, plumbing, sanitary, and HVAC execution',
      'Complete interior finishing, paint, doors, and electrical fittings',
      '10-year structural warranty & 1-year complimentary defect liability maintenance',
      'Deep cleaning, handover ceremony & complete digital project dossier'
    ],
    suitableFor: 'Busy professionals, NRIs, and plot owners seeking hassle-free, timely construction with zero daily supervision headaches.',
    published: true,
    order: 6
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 'vaishali-luxury-villa',
    title: 'The Grand Courtyard Villa',
    slug: 'the-grand-courtyard-villa',
    category: 'Residential',
    location: 'Vaishali Nagar, Jaipur',
    area: '4,200 sq.ft',
    duration: '11 Months',
    completedDate: 'January 2025',
    featured: true,
    published: true,
    shortDescription: 'A modern 4BHK architectural villa marrying contemporary clean lines with traditional Rajasthani stone jali and an interior courtyard.',
    description: 'Commissioned by a leading Jaipur physician, this bespoke villa was designed to foster abundant natural cross-ventilation and daylight. Built with an earthquake-resistant RCC frame, high-thermal insulation walls, and large floor-to-ceiling double-glazed windows, this home represents the pinnacle of modern Jaipur residential architecture.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      '4,200 sq.ft built-up area across G+1 levels',
      'Centrally located open-to-sky courtyard with water feature',
      'Italian Statuario marble flooring across living zones',
      'High-efficiency solar grid integration and rainwater harvesting pit',
      'Custom handcrafted Jodhpur stone jali screens for sun deflection'
    ]
  },
  {
    id: 'mansarovar-commercial-hub',
    title: 'Aura Commercial Arcade',
    slug: 'aura-commercial-arcade',
    category: 'Commercial',
    location: 'Mansarovar, Jaipur',
    area: '13,500 sq.ft',
    duration: '14 Months',
    completedDate: 'November 2024',
    featured: true,
    published: true,
    shortDescription: 'A multi-storey commercial complex designed for high footfall retail showrooms and modern corporate offices.',
    description: 'Engineered on a challenging corner plot along the high-traffic Mansarovar commercial artery, this G+4 structure features clear-span post-tensioned slabs that minimize interior columns. Equipped with automated fire suppression, high-speed capsule elevators, and sound-insulated structural glazing.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'G+4 framed commercial building with basement parking',
      'Double-height showroom frontages with frameless toughened glass',
      'Complete NBC-compliant fire sprinkler and dual-staircase core',
      'Energy-efficient Saint-Gobain Low-E insulated glass units (IGU)'
    ]
  },
  {
    id: 'jagatpura-modern-duplex',
    title: 'Sanskriti Modern Duplex',
    slug: 'sanskriti-modern-duplex',
    category: 'Residential',
    location: 'Jagatpura, Jaipur',
    area: '3,200 sq.ft',
    duration: '9 Months',
    completedDate: 'August 2024',
    featured: true,
    published: true,
    shortDescription: 'A warm, minimalist 3BHK duplex crafted for an IT executive family featuring a rooftop lounge and pergolas.',
    description: 'Constructed on a 200 sq.yard plot in fast-growing Jagatpura, this turnkey duplex balances privacy with open spatial flow. Highlights include cantilevered wooden staircases, an open modular kitchen, and an insulated rooftop terrace garden.',
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Turnkey execution with complete carpentry and modular fittings',
      'Terrace gazebo with solar pergolas & automated micro-irrigation',
      'Vitrified 4x2 floor slabs and concealed warm LED profile lighting'
    ]
  },
  {
    id: 'malviya-nagar-renovation',
    title: 'The Courtyard Bungalow Remodel',
    slug: 'the-courtyard-bungalow-remodel',
    category: 'Renovation',
    location: 'Malviya Nagar, Jaipur',
    area: '2,600 sq.ft',
    duration: '5 Months',
    completedDate: 'March 2024',
    featured: true,
    published: true,
    shortDescription: 'Comprehensive structural upgrade, second floor addition, and modern facade renovation of a 28-year-old residence.',
    description: 'We reinforced the existing foundations with chemical anchoring and micro-concrete jacking, created a new open-plan living room by removing non-structural walls with steel I-beams, and revamped the facade with composite timber louvers and Dholpur stone cladding.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Complete structural strengthening with zero foundation settlement',
      'Modern open-concept living area with load-transfer steel beams',
      '100% eradication of dampness and seepage with polyurethane injection'
    ]
  },
  {
    id: 'civil-lines-heritage-villa',
    title: 'The Heritage Estate',
    slug: 'the-heritage-estate',
    category: 'Residential',
    location: 'Civil Lines, Jaipur',
    area: '5,800 sq.ft',
    duration: '15 Months',
    completedDate: 'December 2023',
    featured: false,
    published: true,
    shortDescription: 'An opulent royal estate blending classical Rajasthani arches, chhatris, and carved pillars with state-of-the-art smart living.',
    description: 'Constructed in the prestigious Civil Lines zone of Jaipur, this private estate required skilled stone carvers from Sikandra and high-grade structural engineering to support multi-vaulted brick and stone arches alongside modern seismic-proof RCC skeleton work.',
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Hand-carved red stone brackets and fluted columns',
      'Home automation controlling lighting, climate, and security',
      'Double-height grand entrance foyer with bespoke crystal chandelier'
    ]
  },
  {
    id: 'c-scheme-corporate-studio',
    title: 'Apex Design & Legal Chambers',
    slug: 'apex-design-legal-chambers',
    category: 'Interior',
    location: 'C-Scheme, Jaipur',
    area: '2,900 sq.ft',
    duration: '4 Months',
    completedDate: 'May 2024',
    featured: false,
    published: true,
    shortDescription: 'Turnkey interior civil reconstruction and luxury finish for a prestigious boutique law firm.',
    description: 'Full interior architecture project featuring acoustic glass partitions, warm walnut wood wall panelling, hidden wiring runs, and custom conference room furniture built with waterproof marine ply and veneer.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: [
      'Custom acoustic soundproofing STC rating 45 for private chambers',
      'Seamless micro-topping floor and bespoke veneer wall panelling',
      'Smart dimmable lighting scenes for presentations and client meetings'
    ]
  }
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    title: 'Modern Villa Front Elevation',
    category: 'Residential',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern 4BHK architectural villa front elevation with stone jali in Jaipur',
    projectId: 'vaishali-luxury-villa'
  },
  {
    id: 'gal-2',
    title: 'Commercial Glazing & Steel Frame',
    category: 'Commercial',
    location: 'Mansarovar, Jaipur',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Multi-storey commercial building construction in Mansarovar Jaipur',
    projectId: 'mansarovar-commercial-hub'
  },
  {
    id: 'gal-3',
    title: 'RCC Column Reinforcement & Casting',
    category: 'Civil',
    location: 'Jagatpura, Jaipur',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Civil engineering reinforced concrete column shuttering and casting',
    projectId: 'jagatpura-modern-duplex'
  },
  {
    id: 'gal-4',
    title: 'Open-Concept Living & Italian Marble',
    category: 'Interior',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Double height luxury living hall with Italian marble flooring in Jaipur',
    projectId: 'civil-lines-heritage-villa'
  },
  {
    id: 'gal-5',
    title: 'Modern Duplex Architectural Exterior',
    category: 'Residential',
    location: 'Jagatpura, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern exterior elevation of a G+2 residential duplex in Jaipur',
    projectId: 'jagatpura-modern-duplex'
  },
  {
    id: 'gal-6',
    title: 'Heritage Villa Stone Architecture',
    category: 'Residential',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    alt: 'Heritage luxury bungalow with Rajasthani architectural detailing',
    projectId: 'civil-lines-heritage-villa'
  },
  {
    id: 'gal-7',
    title: 'Renovated Living Room & Timber Accents',
    category: 'Renovation',
    location: 'Malviya Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Interior makeover and timber paneling for renovated Jaipur residence',
    projectId: 'malviya-nagar-renovation'
  },
  {
    id: 'gal-8',
    title: 'Executive Conference Room Fitout',
    category: 'Interior',
    location: 'C-Scheme, Jaipur',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Commercial interior boardroom civil fitout in C-Scheme Jaipur',
    projectId: 'c-scheme-corporate-studio'
  }
];

const DEFAULT_ENQUIRIES = [
  {
    id: 'enq-101',
    customerName: 'Rahul Sharma',
    phone: '9829045678',
    email: 'rahul.sharma@gmail.com',
    location: 'Vaishali Nagar, Jaipur',
    workType: 'New Construction',
    plotArea: '250 Sq. Yards (Plot 30x75)',
    budget: '₹60 - ₹80 Lakhs',
    startDate: 'Within 1 Month',
    requirements: 'Looking for turnkey G+1 villa construction. Need high-quality RCC work with modern elevation and 3D architectural plan.',
    status: 'New',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    notes: 'Called briefly, client is available on WhatsApp. Ready for site visit on Saturday.'
  },
  {
    id: 'enq-102',
    customerName: 'Sunita Mathur',
    phone: '9414012399',
    email: 'sunita.mathur@yahoo.co.in',
    location: 'Malviya Nagar, Jaipur',
    workType: 'Renovation',
    plotArea: '1,800 Sq. Ft built-up',
    budget: '₹15 - ₹25 Lakhs',
    startDate: 'Next 2-3 Months',
    requirements: 'Complete first-floor remodeling, bathroom waterproofing, and new exterior stone facade elevation.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    notes: 'Explained our renovation inspection process. Site visit scheduled for Sunday 11 AM.'
  },
  {
    id: 'enq-103',
    customerName: 'Vikramaditya Singh',
    phone: '9828114422',
    email: 'vikram.singh@chomu.com',
    location: 'Jagatpura (Near Airport), Jaipur',
    workType: 'Turnkey Construction',
    plotArea: '300 Sq. Yards',
    budget: '₹1 - ₹1.5 Crore',
    startDate: 'Immediate',
    requirements: 'Require A-grade turnkey construction for duplex residence with solar pergolas, Italian marble, and boundary wall.',
    status: 'Estimate Sent',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    notes: 'Detailed BOQ and architectural specification sheet sent over email and WhatsApp.'
  },
  {
    id: 'enq-104',
    customerName: 'Anil Khandelwal',
    phone: '9784099881',
    email: 'anil.khandelwal@tradecorp.in',
    location: 'Mansarovar (VT Road), Jaipur',
    workType: 'Commercial',
    plotArea: '2,200 Sq. Ft (G+2)',
    budget: '₹75 Lakhs - ₹1 Crore',
    startDate: 'Within 15 Days',
    requirements: 'Commercial building for medical diagnostic center. Needs heavy load floor slabs, ambulance ramp, and elevator shaft.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
    notes: 'Contract finalized and signed. Earth excavation initiated.'
  }
];

// File access helpers with atomic writes
function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

function readJsonFile(filename, defaultData) {
  try {
    ensureDirectoryExists();
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filename, defaultData);
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultData;
  }
}

function writeJsonFile(filename, data) {
  try {
    ensureDirectoryExists();
    const filePath = getFilePath(filename);
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// ================= Services =================
export function getServices() {
  return readJsonFile('services.json', DEFAULT_SERVICES);
}

export function getServiceById(idOrSlug) {
  const services = getServices();
  return services.find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
}

export function createService(serviceData) {
  const services = getServices();
  const newService = {
    id: serviceData.slug || `srv-${Date.now()}`,
    slug: serviceData.slug || `srv-${Date.now()}`,
    published: true,
    order: services.length + 1,
    ...serviceData,
  };
  services.push(newService);
  writeJsonFile('services.json', services);
  return newService;
}

export function updateService(id, updatedData) {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...updatedData, id };
  writeJsonFile('services.json', services);
  return services[index];
}

export function deleteService(id) {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  if (filtered.length === services.length) return false;
  writeJsonFile('services.json', filtered);
  return true;
}

// ================= Projects =================
export function getProjects() {
  return readJsonFile('projects.json', DEFAULT_PROJECTS);
}

export function getProjectById(idOrSlug) {
  const projects = getProjects();
  return projects.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export function createProject(projectData) {
  const projects = getProjects();
  const newProject = {
    id: projectData.slug || `proj-${Date.now()}`,
    slug: projectData.slug || `proj-${Date.now()}`,
    published: true,
    featured: Boolean(projectData.featured),
    createdAt: new Date().toISOString(),
    images: projectData.images || (projectData.coverImage ? [projectData.coverImage] : []),
    ...projectData,
  };
  projects.unshift(newProject);
  writeJsonFile('projects.json', projects);
  return newProject;
}

export function updateProject(id, updatedData) {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updatedData, id };
  writeJsonFile('projects.json', projects);
  return projects[index];
}

export function deleteProject(id) {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  writeJsonFile('projects.json', filtered);
  return true;
}

// ================= Gallery =================
export function getGallery() {
  return readJsonFile('gallery.json', DEFAULT_GALLERY);
}

export function addGalleryItem(item) {
  const gallery = getGallery();
  const newItem = {
    id: `gal-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...item
  };
  gallery.unshift(newItem);
  writeJsonFile('gallery.json', gallery);
  return newItem;
}

export function deleteGalleryItem(id) {
  const gallery = getGallery();
  const filtered = gallery.filter(g => g.id !== id);
  if (filtered.length === gallery.length) return false;
  writeJsonFile('gallery.json', filtered);
  return true;
}

// ================= Enquiries =================
export function getEnquiries() {
  return readJsonFile('enquiries.json', DEFAULT_ENQUIRIES);
}

export function getEnquiryById(id) {
  const enquiries = getEnquiries();
  return enquiries.find(e => e.id === id) || null;
}

export function createEnquiry(enquiryData) {
  const enquiries = getEnquiries();
  
  // Anti-duplicate protection: check if same phone and message submitted within last 5 minutes
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  const isDuplicate = enquiries.some(e => 
    e.phone === enquiryData.phone && 
    new Date(e.createdAt).getTime() > fiveMinAgo
  );
  if (isDuplicate) {
    throw new Error('An enquiry from this mobile number was recently submitted. Our team will contact you shortly.');
  }

  const newEnquiry = {
    id: `enq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
    notes: '',
    ...enquiryData,
  };
  enquiries.unshift(newEnquiry);
  writeJsonFile('enquiries.json', enquiries);
  return newEnquiry;
}

export function updateEnquiry(id, updatedData) {
  const enquiries = getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;
  enquiries[index] = { ...enquiries[index], ...updatedData, id };
  writeJsonFile('enquiries.json', enquiries);
  return enquiries[index];
}

export function deleteEnquiry(id) {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter(e => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  writeJsonFile('enquiries.json', filtered);
  return true;
}

// ================= Settings =================
export function getSettings() {
  return readJsonFile('settings.json', DEFAULT_SETTINGS);
}

export function updateSettings(newSettings) {
  const current = getSettings();
  const updated = {
    ...current,
    ...newSettings,
    socialLinks: { ...current.socialLinks, ...(newSettings.socialLinks || {}) },
    seo: { ...current.seo, ...(newSettings.seo || {}) }
  };
  writeJsonFile('settings.json', updated);
  return updated;
}
