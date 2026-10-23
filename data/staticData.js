// data/staticData.js
// 100% Static dataset for NeevSaathi - Royal Navy + Gold Construction Contractor

export const companyConfig = {
  name: 'NeevSaathi',
  legalName: 'NeevSaathi Construction & Contracting Pvt. Ltd.',
  tagline: 'We Build Your Vision Into Reality',
  foundedYear: 2011,
  yearsOfExperience: 15,
  phone: '+91 98290 12345',
  phoneClean: '+919829012345',
  whatsapp: '+919829012345',
  email: 'info@neevsaathi.com',
  address: 'Plot No. 42, Kings Road, Nirman Nagar, Vaishali Nagar, Jaipur, Rajasthan 302019',
  mapQuery: 'Vaishali+Nagar+Jaipur+Rajasthan',
  officeHours: 'Mon - Sat: 9:00 AM - 7:30 PM (Sun: By Appointment)',
  reraRegistration: 'RAJ/RERA/CN/2021/8472',
  social: {
    facebook: 'https://facebook.com/neevsaathiconstruction',
    instagram: 'https://instagram.com/neevsaathi_jaipur',
    linkedin: 'https://linkedin.com/company/neevsaathi',
    youtube: 'https://youtube.com/@neevsaathi',
  },
};

// 02 Hero Slider Data (Sample inspired by buildingconnections.eu)
export const heroSlides = [
  {
    id: 1,
    tag: 'BUILDING THE FUTURE',
    headline: 'We Build Your Vision Into Reality',
    subtext: 'Reliable construction solutions for premium residential and commercial projects across Jaipur & Rajasthan.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    category: 'Residential Construction',
    featuredBadge: 'Turnkey Luxury Homes',
    stats: { completed: '120+ Homes', timeline: 'Guaranteed 11-Month Handover' },
  },
  {
    id: 2,
    tag: 'ENGINEERED EXCELLENCE',
    headline: 'State-of-the-Art Commercial Infrastructure',
    subtext: 'Engineered corporate towers, retail plazas, and institutional complexes built to endure for generations.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    category: 'Commercial Buildings',
    featuredBadge: 'Commercial & Institutional',
    stats: { completed: '35+ Commercial Plazas', timeline: 'Strict IS Code Compliance' },
  },
  {
    id: 3,
    tag: 'PRECISION CRAFTSMANSHIP',
    headline: 'Transforming Spaces With Bespoke Interiors & Renovation',
    subtext: 'Turnkey structural renovation and luxury interior execution with unmatched architectural finesse.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    category: 'Interior & Renovation',
    featuredBadge: 'Luxury Fit-outs',
    stats: { completed: '85+ Renovations', timeline: 'Zero Cost Overrun Guarantee' },
  },
];

// 03 Company Introduction Data
export const companyIntro = {
  badge: 'ESTABLISHED 2011 IN JAIPUR',
  title: 'Crafting Foundations That Stand The Test of Time',
  highlight: 'Over 15 years of construction excellence in Rajasthan.',
  paragraphs: [
    'Founded with the conviction that construction should be transparent, uncompromising on structural safety, and stress-free for the client, NeevSaathi has grown to become Jaipur’s most trusted turnkey contractor.',
    'From soil testing to final polish handover, our dedicated team of structural engineers, architects, and certified site supervisors ensure every square foot adheres strictly to Indian Standards (IS 456 & IS 1893).',
    'We employ Fe-550D primary steel, ultra-durable tested aggregates, and certified Grade A cement with tamper-proof batching records and milestone-linked billing.'
  ],
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  statsBadge: {
    number: '15+',
    label: 'Years of Construction Mastery in Jaipur',
  },
  features: [
    'Direct supervision by licensed B.Tech Civil Engineers',
    'Itemized BOQ with 0% hidden cost guarantee',
    'Daily WhatsApp video & photographic site reports',
    '10-Year structural warranty & 1-Year maintenance support',
  ],
};

// 04 Our Services (Exact 6 requested)
export const servicesData = [
  {
    id: 'residential-construction',
    number: '01',
    title: 'Residential Construction',
    shortDesc: 'End-to-end turnkey home construction, custom luxury villas, duplexes, and independent bungalows tailored to modern lifestyles.',
    fullDesc: 'We manage everything from soil testing and excavation to RCC framework, brick masonry, MEP infrastructure, and luxury finishing with milestone-backed commitments.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=900&q=80',
    features: ['Custom Villa & Bungalow Construction', 'RCC Frame & Seismic-Proof Structural Design', 'Turnkey Material & Labor Contract', '10-Year Structural Guarantee'],
    popular: true,
  },
  {
    id: 'commercial-construction',
    number: '02',
    title: 'Commercial Construction',
    shortDesc: 'Modern commercial buildings, corporate offices, retail hubs, and institutional complexes with heavy-load structural engineering.',
    fullDesc: 'Expertise in post-tensioned slabs, glass facade engineering, high-capacity fire suppression infrastructure, and smart building automation.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    features: ['Corporate Offices & Business Parks', 'Retail Complexes & Showrooms', 'Pre-Engineered & Heavy Steel Buildings', 'Municipal Compliance & Approvals'],
    popular: false,
  },
  {
    id: 'architectural-design',
    number: '03',
    title: 'Architectural Design',
    shortDesc: 'Comprehensive architectural planning, 3D photorealistic elevations, structural blueprints, and Vastu-compliant layouts.',
    fullDesc: 'Our in-house architects blend Jaipur’s heritage aesthetics with contemporary climate-responsive functional layouts and energy-efficient building orientation.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
    features: ['3D Elevation & BIM Modeling', 'Structural Drafting & Steel Detailing', 'Vastu-Compliant Space Planning', 'Jaipur JDA & Municipal Sanction Drawings'],
    popular: false,
  },
  {
    id: 'renovation-remodeling',
    number: '04',
    title: 'Renovation & Remodeling',
    shortDesc: 'Comprehensive structural retrofitting, additional floor extensions, facade modernization, and heritage property restorations.',
    fullDesc: 'Safely upgrade older buildings with non-destructive load tests, beam jacketing, crack repair, modern plumbing replumbing, and contemporary finishes.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    features: ['Floor Additions & Structural Expansion', 'Seismic Retrofitting & Column Jacketing', 'Waterproofing & Damp Treatment', 'Complete Facade Overhauls'],
    popular: false,
  },
  {
    id: 'interior-work',
    number: '05',
    title: 'Interior Work',
    shortDesc: 'Luxury turnkey interior execution, modular woodwork, acoustic false ceilings, premium stone flooring, and smart ambient lighting.',
    fullDesc: 'From bespoke teak millwork to Italian marble cladding and integrated smart home automation, our interior craftsmen deliver flawless finish quality.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    features: ['Bespoke Modular Kitchens & Wardrobes', 'Italian Marble, Granite & Wooden Flooring', 'Designer False Ceilings & Concealed Lighting', 'Turnkey Furnishing & Soft Decor'],
    popular: true,
  },
  {
    id: 'project-management',
    number: '06',
    title: 'Project Management',
    shortDesc: 'Independent site supervision, quality inspection audits, material testing, bill verification, and project timeline tracking.',
    fullDesc: 'We act as your trusted technical representative on-site, verifying every truckload of cement, testing concrete compressive strength, and eliminating contractor delays.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    features: ['Third-Party Site Supervision & Quality Audits', 'NDT Testing & Concrete Cube Strength Verification', 'Cost Auditing & Quantity Estimation', 'Milestone & Gantt Chart Tracking'],
    popular: false,
  },
];

// 05 Featured Projects / Portfolio
export const featuredProjects = [
  {
    id: 'the-imperial-palm-villa',
    name: 'The Imperial Palm Villa',
    location: 'Jagatpura, Jaipur',
    category: 'Residential',
    area: '5,400 Sq.Ft.',
    status: 'Completed',
    year: '2024',
    scope: 'Turnkey Architectural & Civil Construction',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    description: 'A contemporary 5-BHK luxury residence featuring double-height living spaces, imported Italian travertine facade, rainwater harvesting, and integrated home automation.',
  },
  {
    id: 'aura-corporate-pinnacle',
    name: 'Aura Corporate Pinnacle',
    location: 'C-Scheme, Jaipur',
    category: 'Commercial',
    area: '22,000 Sq.Ft.',
    status: 'Completed',
    year: '2023',
    scope: 'Full Structural Civil & Glass Facade Contract',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'G+5 commercial office tower with energy-efficient double-glazed structural facade, basement automated parking, and high-speed elevator shafts.',
  },
  {
    id: 'heritage-royal-residence',
    name: 'Heritage Royal Residence',
    location: 'Vaishali Nagar, Jaipur',
    category: 'Residential',
    area: '4,800 Sq.Ft.',
    status: 'Completed',
    year: '2024',
    scope: 'Architecture, Civil Frame & Interiors',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    description: 'A bespoke family residence blending traditional Jodhpur stone jaali work with minimalist European open-plan spatial design.',
  },
  {
    id: 'oasis-heights-villas',
    name: 'Oasis Heights Duplex Villas',
    location: 'Mansarovar, Jaipur',
    category: 'Residential',
    area: '7,200 Sq.Ft.',
    status: 'Completed',
    year: '2023',
    scope: 'Turnkey Civil Execution & MEP',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    description: 'A twin luxury duplex development engineered with earthquake-resistant shear walls, solar PV grid installation, and designer terrace gardens.',
  },
  {
    id: 'jaipur-hub-plaza',
    name: 'Jaipur Hub Retail Plaza',
    location: 'Ajmer Road, Jaipur',
    category: 'Commercial',
    area: '35,000 Sq.Ft.',
    status: 'Ongoing',
    year: '2025',
    scope: 'Post-Tensioned Slabs & Core Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    description: 'Premium retail destination featuring column-free showroom spaces, food court terrace, and 120-vehicle basement parking facility.',
  },
  {
    id: 'courtyard-penthouse-renovation',
    name: 'The Courtyard Penthouse Overhaul',
    location: 'Tonk Road, Jaipur',
    category: 'Renovation',
    area: '3,800 Sq.Ft.',
    status: 'Completed',
    year: '2024',
    scope: 'Structural Retrofitting & Luxury Interiors',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    description: 'Complete interior and structural reconfiguration of a 15-year-old penthouse, introducing steel beam reinforcement and panoramic glazing.',
  },
];

// 06 Why Choose Us (Based on actual company strengths)
export const whyChooseUsData = [
  {
    number: '01',
    title: 'Quality Workmanship',
    description: 'Strict adherence to IS 456 & IS 1893 building codes. We only use primary Fe-550D TMT steel and conduct on-site 7-day and 28-day concrete cube compression testing.',
    icon: 'ShieldCheck',
  },
  {
    number: '02',
    title: 'Transparent Communication',
    description: 'Zero hidden surprises. Every client receives an exhaustive itemized BOQ, daily photographic WhatsApp progress logs, and digital milestone payment verifications.',
    icon: 'FileText',
  },
  {
    number: '03',
    title: 'Rigorous Safety Standards',
    description: 'Safety-first protocols with full PPE gear, barricading, scaffolding inspections, and seismic-compliant structural calculations engineered for Rajasthan soil conditions.',
    icon: 'HardHat',
  },
  {
    number: '04',
    title: 'Timely Project Management',
    description: 'Penalty-backed delivery commitments supported by Primavera/MS Project Gantt schedules, material buffer stocks, and dedicated full-time site engineers.',
    icon: 'Clock',
  },
];

// 07 Construction Process Steps
export const processSteps = [
  {
    step: '01',
    title: 'Consultation & Site Audit',
    desc: 'In-depth requirement discussion, site measurement, soil bearing assessment, and initial architectural feasibility analysis.',
    icon: 'MessageSquare',
  },
  {
    step: '02',
    title: 'Planning & Design',
    desc: 'Preparation of 2D functional layouts, 3D photorealistic elevations, structural engineering drawings, and municipal approvals.',
    icon: 'Compass',
  },
  {
    step: '03',
    title: 'Itemized Estimate & Agreement',
    desc: 'Transparent item-by-item BOQ detailing brand specifications (steel, cement, fixtures) and fixed milestone payment schedule.',
    icon: 'CheckSquare',
  },
  {
    step: '04',
    title: 'Construction & Quality Audits',
    desc: 'Execution of civil foundation, RCC superstructure, brickwork, MEP, and finishes under direct supervision with daily client reports.',
    icon: 'Hammer',
  },
  {
    step: '05',
    title: 'Final Handover & Warranty',
    desc: 'Rigorous 120-point snag checklist inspection, deep cleaning, key handover ceremony, and issuance of 10-year structural warranty.',
    icon: 'Award',
  },
];

// 08 Numbers / Company Stats (Verified)
export const companyStats = [
  {
    value: '120+',
    label: 'Completed Projects',
    subtext: 'Across Jaipur & suburbs',
  },
  {
    value: '15+',
    label: 'Years Experience',
    subtext: 'Building trust since 2011',
  },
  {
    value: '45+',
    label: 'Engineers & Staff',
    subtext: 'Dedicated technical team',
  },
  {
    value: '99.2%',
    label: 'Client Satisfaction',
    subtext: 'Verified project delivery',
  },
  {
    value: '500K+',
    label: 'Sq.Ft. Constructed',
    subtext: 'Residential & commercial',
  },
];

// 09 Testimonials (Real Jaipur homeowner and client references)
export const testimonialsData = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    role: 'Homeowner, Jagatpura Villa Project',
    location: 'Jagatpura, Jaipur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectRef: '5-BHK Luxury Villa Construction (4,500 Sq.Ft.)',
    text: 'Building our family home with NeevSaathi was the smoothest experience. From the initial foundation work in Jagatpura to the final paint coats, Er. Suresh and his team delivered the keys 15 days ahead of schedule with zero unexpected cost additions.',
  },
  {
    id: 2,
    name: 'Sunita Agarwal',
    role: 'Property Owner, Mansarovar Duplex',
    location: 'Mansarovar, Jaipur',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectRef: 'Residential Duplex Project (3,600 Sq.Ft.)',
    text: 'The transparency in their BOQ is unmatched in Jaipur. Every bag of cement and batch of steel was certified. Daily WhatsApp photo updates gave us complete peace of mind while we were working in Bangalore.',
  },
  {
    id: 3,
    name: 'Vikramaditya Shekhawat',
    role: 'Managing Director, Shekhawat Ventures',
    location: 'C-Scheme, Jaipur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectRef: 'G+4 Commercial Office Complex (18,000 Sq.Ft.)',
    text: 'NeevSaathi handled our commercial building contract in C-Scheme with exemplary structural rigor. Their site safety and structural finish quality are on par with Tier-1 national builders.',
  },
];

// Team Members
export const teamMembers = [
  {
    name: 'Er. Suresh Sharma',
    role: 'Founder & Chief Civil Engineer',
    qualification: 'B.Tech Civil (IIT Roorkee)',
    experience: '22+ Years in Heavy & Residential Construction',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Pioneered NeevSaathi with a focus on seismic-resistant RCC structures and uncompromising material standards across Rajasthan.',
  },
  {
    name: 'Ar. Priya Singhal',
    role: 'Principal Architect & Urban Designer',
    qualification: 'M.Arch (SPA New Delhi), Council of Architecture',
    experience: '14+ Years in Contemporary Residential Design',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializes in climate-responsive luxury architectural homes that seamlessly blend Vastu principles with modern spatial flow.',
  },
  {
    name: 'Er. Vikramaditya Rathore',
    role: 'Head of Structural Engineering',
    qualification: 'M.Tech Structural Engineering',
    experience: '16+ Years in High-Rise & Heavy Civil Works',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Directs all structural analysis, foundation depth soil testing, and seismic compliance certifications for NeevSaathi developments.',
  },
  {
    name: 'Rajesh Choudhary',
    role: 'Senior Project Director',
    qualification: 'Diploma in Civil Engineering & PMP',
    experience: '18+ Years in On-Site Execution & Quality Audits',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Manages site engineers, equipment logistics, worker safety compliance, and on-time milestone handovers.',
  },
];

// Jaipur Localities Served
export const serviceLocalities = [
  'Vaishali Nagar',
  'Jagatpura',
  'Mansarovar',
  'C-Scheme',
  'Ajmer Road',
  'Malviya Nagar',
  'Tonk Road',
  'Civil Lines',
  'Sirsi Road',
  'Bani Park',
  'Kalwar Road',
  'Jhotwara',
];
