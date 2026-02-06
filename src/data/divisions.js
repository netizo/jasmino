export const divisions = [
  {
    id: 'engineering-design',
    slug: 'engineering-design',
    num: '01',
    name: 'Engineering Design',
    shortName: 'Engineering',
    tagline: 'From concept to construction-ready deliverables',
    description: 'Complete engineering solutions spanning process design, equipment engineering, piping systems, and water treatment. We deliver construction-ready documentation that eliminates costly rework.',
    stats: [
      { num: '500+', label: 'Projects Delivered' },
      { num: '40+', label: 'Design Engineers' }
    ],
    services: [
      { name: 'Process & Plant Design', slug: 'process-plant-design' },
      { name: 'Equipment Design', slug: 'equipment-design' },
      { name: 'Piping Design', slug: 'piping-design' },
      { name: 'Water Treatment', slug: 'water-treatment' }
    ],
    proof: {
      stat: '500+ projects',
      detail: 'Engineering deliverables across petrochemical, fertilizer, and power sectors with zero-rework track record on critical path items.'
    },
    color: '#3B7BDB'
  },
  {
    id: 'equipment-manufacturing',
    slug: 'equipment-manufacturing',
    num: '02',
    name: 'Equipment Manufacturing',
    shortName: 'Manufacturing',
    tagline: 'Precision fabrication for critical process equipment',
    description: 'ASME and API certified fabrication of pressure vessels, heat exchangers, reactors, storage tanks, and FRP equipment. From carbon steel to exotic alloys, our 80,000 m\u00B2 facility handles it all.',
    stats: [
      { num: '150+', label: 'Welding Procedures' },
      { num: '80K', label: 'm\u00B2 Shop Floor' }
    ],
    services: [
      { name: 'Steel Equipment', slug: 'steel-equipment' },
      { name: 'Plastic & FRP Equipment', slug: 'plastic-frp-equipment' }
    ],
    proof: {
      stat: '150+ welding procedures',
      detail: 'Qualified across carbon steel, stainless, duplex, Hastelloy, Inconel, and titanium. ASME Section VIII Div 1 & 2 certified.'
    },
    color: '#1B4B8F'
  },
  {
    id: 'corrosion-protection',
    slug: 'corrosion-protection',
    num: '03',
    name: 'Corrosion Protection',
    shortName: 'Corrosion',
    tagline: 'The crown jewel \u2014 protecting assets that can\u2019t afford to fail',
    description: 'Rubber linings, plastic linings, coatings, and resin systems applied by 150+ technicians deployed globally. Backed by HAW (Germany) and GBT (Turkey) heritage with 2,000+ proven formulations.',
    stats: [
      { num: '2,000+', label: 'Formulations' },
      { num: '150+', label: 'Field Technicians' }
    ],
    services: [
      { name: 'Rubber Linings', slug: 'rubber-linings' },
      { name: 'Plastic Linings', slug: 'plastic-linings' },
      { name: 'Coatings & Resin Systems', slug: 'coatings-resin-systems' },
      { name: 'Inspection & Repair', slug: 'inspection-repair' }
    ],
    proof: {
      stat: '97% reorder rate',
      detail: 'Clients return because our lining systems consistently outperform warranty periods. HAW and GBT bring 60+ years of combined European lining expertise.'
    },
    color: '#04E586'
  },
  {
    id: 'rubber-products',
    slug: 'rubber-products',
    num: '04',
    name: 'Rubber Products',
    shortName: 'Rubber',
    tagline: 'Engineered rubber compounds for extreme conditions',
    description: 'Custom rubber compounding and engineered products for industrial applications. Our R&D lab develops formulations tailored to specific chemical, thermal, and mechanical requirements.',
    stats: [
      { num: '9.5M', label: 'kg/year Capacity' },
      { num: '2,000+', label: 'Proven Compounds' }
    ],
    services: [
      { name: 'Custom Compounds', slug: 'custom-compounds' },
      { name: 'Engineered Products', slug: 'engineered-products' }
    ],
    proof: {
      stat: '9.5M kg annual capacity',
      detail: 'Natural rubber, neoprene, EPDM, nitrile, butyl, chlorobutyl, Hypalon, and specialty compounds. Each formulation tested against specific service conditions.'
    },
    color: '#3B7BDB'
  }
];

export const industries = [
  { name: 'Chemical', subtitle: 'Reactors, tanks, piping', icon: '\u2697' },
  { name: 'Petrochemical', subtitle: 'Refining & processing', icon: '\u26A2' },
  { name: 'Power', subtitle: 'Boilers, FGD, cooling', icon: '\u26A1' },
  { name: 'Water Treatment', subtitle: 'Filtration & purification', icon: '\uD83D\uDCA7' },
  { name: 'Fertilizer', subtitle: 'Acid plants, storage', icon: '\uD83C\uDF3E' },
  { name: 'Mining', subtitle: 'Leaching, flotation', icon: '\u26CF' },
  { name: 'Pharmaceutical', subtitle: 'Clean rooms, vessels', icon: '\uD83D\uDC8A' },
  { name: 'Food & Beverage', subtitle: 'Sanitary processing', icon: '\uD83C\uDFED' }
];

export const certifications = ['ASME', 'API', 'PED', 'ISO 9001', 'T\u00DCV', 'BV'];

export const facilities = [
  {
    flag: '\uD83C\uDDEE\uD83C\uDDF3',
    country: 'India',
    name: 'Jasmino HQ',
    area: '80,000 m\u00B2',
    capabilities: 'Engineering, Manufacturing, Rubber Products'
  },
  {
    flag: '\uD83C\uDDE9\uD83C\uDDEA',
    country: 'Germany',
    name: 'HAW Linings',
    area: '30,000 m\u00B2',
    capabilities: 'Rubber & Plastic Linings'
  },
  {
    flag: '\uD83C\uDDF9\uD83C\uDDF7',
    country: 'Turkey',
    name: 'GBT',
    area: '20,000 m\u00B2',
    capabilities: 'Linings & Coatings'
  }
];

export const companyStats = [
  { num: '40+', label: 'Years' },
  { num: '15+', label: 'Countries' },
  { num: '130K+', label: 'm\u00B2 Shop Floor' },
  { num: '97%', label: 'Reorder Rate' }
];
