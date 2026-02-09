export const infrastructureData = {
  hero: {
    badge: 'Three continents \u00B7 One quality system',
    title_html: '130,000 m\u00B2 of <em>integrated</em><br/>manufacturing capacity',
    description: 'Purpose-built facilities in India, Germany, and Turkey \u2014 each engineered for a specific role in the design-to-delivery chain, all governed by one quality system.',
    fallback_image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop&crop=center',
    stats: [
      { value: '3', label: 'Countries' },
      { value: '130K+', label: 'm\u00B2 Total Capacity' },
      { value: '150+', label: 'Field Technicians' },
      { value: '15+', label: 'Countries Served' }
    ]
  },

  facilityNav: [
    { id: 'india', flag: '\uD83C\uDDEE\uD83C\uDDF3', label: 'India \u2014 HQ' },
    { id: 'germany', flag: '\uD83C\uDDE9\uD83C\uDDEA', label: 'Germany \u2014 HAW' },
    { id: 'turkey', flag: '\uD83C\uDDF9\uD83C\uDDF7', label: 'Turkey \u2014 GBT' }
  ],

  overview: {
    overline: 'Our Infrastructure',
    title_html: 'Three sites, one <em>supply chain</em>',
    description: 'Each facility is purpose-built for a specific link in the chain. India handles engineering and heavy fabrication. Germany provides European rubber and plastic lining expertise. Turkey bridges the two with coating and lining services for the Middle East and Africa.',
    stats: [
      { value: '80K', label: 'm\u00B2 India' },
      { value: '30K', label: 'm\u00B2 Germany' },
      { value: '20K', label: 'm\u00B2 Turkey' },
      { value: 'ISO', label: '9001 \u00B7 14001 \u00B7 45001', noCount: true }
    ],
    mapPins: [
      { id: 'india', cx: 545, cy: 210, name: 'Jasmino HQ', meta: '80,000 m\u00B2 \u00B7 India', labelX: 545, labelY: 238, labelText: 'INDIA', pulseR: 14, pulseDur: '2.5s' },
      { id: 'germany', cx: 430, cy: 135, name: 'HAW Linings', meta: '30,000 m\u00B2 \u00B7 Germany', labelX: 415, labelY: 122, labelText: 'GERMANY', pulseR: 11, pulseDur: '2.8s' },
      { id: 'turkey', cx: 445, cy: 155, name: 'GBT', meta: '20,000 m\u00B2 \u00B7 Turkey', labelX: 462, labelY: 172, labelText: 'TURKEY', pulseR: 11, pulseDur: '2.2s' }
    ]
  },

  facilities: [
    {
      id: 'india',
      num: '01',
      flag: '\uD83C\uDDEE\uD83C\uDDF3',
      country: 'India',
      name: 'Jasmino',
      nameAccent: 'Headquarters',
      description: 'The nerve centre \u2014 engineering, heavy fabrication, rubber compounding, and project management under one roof. Over 80,000 m\u00B2 of integrated capacity with direct access to Nhava Sheva port for global shipping.',
      capacity: { num: '80,000', label: 'm\u00B2 total capacity' },
      alt: false,
      gallery: [
        { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&h=600&fit=crop&crop=center', alt: 'Main fabrication hall', caption: 'Main Fabrication Hall', sub: 'Heavy Vessel Bay', span2: true },
        { src: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&h=400&fit=crop&crop=center', alt: 'Engineering', caption: 'Engineering', sub: '3D Design Office' },
        { src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop&crop=center', alt: 'Welding', caption: 'Welding', sub: 'SAW Station' },
        { src: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop&crop=center', alt: 'QA', caption: 'QA/QC', sub: 'Metallurgy Lab' }
      ],
      specs: [
        {
          icon: 'fabrication',
          title: 'Heavy Fabrication',
          description: 'Pressure vessels, columns, reactors, and heat exchangers up to 120 tonnes single lift capacity.',
          stat: { value: '120', label: 'tonne lift capacity' }
        },
        {
          icon: 'engineering',
          title: 'Engineering Centre',
          description: 'Full-service design office \u2014 SP3D, ANSYS, CAESAR II, PV Elite. 50+ engineers across process, mechanical, and piping disciplines.',
          stat: { value: '50+', label: 'engineers' }
        },
        {
          icon: 'rubber',
          title: 'Rubber Compounding',
          description: 'In-house mixing, calendering, and curing. Over 2,000 proven formulations from natural rubber to advanced fluoroelastomers.',
          stat: { value: '2,000+', label: 'proven formulations' }
        }
      ],
      equipment: [
        'CNC Plasma Cutting',
        'Submerged Arc Welding',
        'Plate Rolling (40mm \u00D7 3m)',
        'Hydraulic Press (2000T)',
        'Shot Blasting Chamber',
        'Rubber Autoclave (6m \u00D7 3m)',
        'Coordinate Measuring',
        'RT / UT / MT / PT NDT'
      ]
    },
    {
      id: 'germany',
      num: '02',
      flag: '\uD83C\uDDE9\uD83C\uDDEA',
      country: 'Germany',
      name: 'HAW',
      nameAccent: 'Linings',
      description: 'The European corrosion protection arm \u2014 acquired in 2008, bringing 30+ years of German rubber and plastic lining expertise into the Jasmino network. ISO 9001 and PED certified.',
      capacity: { num: '30,000', label: 'm\u00B2 lining capacity' },
      alt: true,
      gallery: [
        { src: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=900&h=600&fit=crop&crop=center', alt: 'Rubber lining', caption: 'Rubber Lining Bay', sub: 'Vessel Interior', span2: true },
        { src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&crop=center', alt: 'R&D', caption: 'R&D Lab', sub: 'Compound Testing' },
        { src: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop&crop=center', alt: 'Surface prep', caption: 'Surface Prep', sub: 'Blast Cleaning' },
        { src: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=600&h=400&fit=crop&crop=center', alt: 'Autoclave', caption: 'Curing', sub: 'Autoclave Bay' }
      ],
      specs: [
        {
          icon: 'clock',
          title: 'Rubber Linings',
          description: 'Soft and hard rubber lining systems for chemical resistance. Autoclave-cured and vulcanized solutions for vessels, pipes, and tanks.',
          stat: { value: '30+', label: 'years German expertise' }
        },
        {
          icon: 'grid',
          title: 'Plastic Linings',
          description: 'PVDF, PP, PE, and PTFE lining systems. Dual-laminate construction for combined corrosion and structural performance.',
          stat: { value: '6', label: 'polymer systems' }
        },
        {
          icon: 'check',
          title: 'On-Site Service',
          description: 'Mobile lining crews deployed across Europe, Middle East, and Africa. Turnaround and shutdown lining services with 24/7 availability.',
          stat: { value: '40+', label: 'countries served' }
        }
      ],
      equipment: [
        'Autoclave (8m \u00D7 4m)',
        'Rubber Calendering Line',
        'PVDF Welding Systems',
        'Spark Test (Holiday) Detection',
        'Surface Profile Measurement',
        'Adhesion Pull-Off Testing',
        'Mobile Blast & Coat Units',
        'Thermal Spray Systems'
      ]
    },
    {
      id: 'turkey',
      num: '03',
      flag: '\uD83C\uDDF9\uD83C\uDDF7',
      country: 'Turkey',
      name: 'GBT',
      nameAccent: 'Linings & Coatings',
      description: 'The regional bridge \u2014 strategically positioned to serve the Middle East, North Africa, and Central Asian markets. Full rubber lining, plastic lining, and coating capabilities with rapid response for shutdown and turnaround services.',
      capacity: { num: '20,000', label: 'm\u00B2 service capacity' },
      alt: false,
      gallery: [
        { src: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&h=600&fit=crop&crop=center', alt: 'Application bay', caption: 'Application Bay', sub: 'Epoxy Coating System', span2: true },
        { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&crop=center', alt: 'Workshop', caption: 'Workshop', sub: 'Pipe Lining' },
        { src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop&crop=center', alt: 'Field service', caption: 'Field Service', sub: 'On-Site Lining' },
        { src: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=600&h=400&fit=crop&crop=center', alt: 'QC', caption: 'QC', sub: 'Holiday Testing' }
      ],
      specs: [
        {
          icon: 'location',
          title: 'Strategic Location',
          description: 'Istanbul hub provides 4-hour flight access to the Middle East, North Africa, Central Asia, and all of Europe.',
          stat: { value: '4hr', label: 'to 20+ countries', noCount: true }
        },
        {
          icon: 'document',
          title: 'Coatings & Resin Systems',
          description: 'Epoxy, vinyl ester, and polyurethane coating systems. GRP/FRP laminates and flake glass linings.',
          stat: { value: '12+', label: 'coating systems' }
        },
        {
          icon: 'team',
          title: 'Field Crews',
          description: 'Dedicated mobile teams for on-site lining and coating during plant shutdowns. 24/7 availability with rapid mobilization.',
          stat: { value: '48hr', label: 'mobilization time', noCount: true }
        }
      ],
      equipment: [
        'Rubber Autoclave (5m \u00D7 2.5m)',
        'Airless Spray Systems',
        'GRP Lamination Bay',
        'Blast Cleaning Chamber',
        'Mobile Lining Units',
        'Holiday / Spark Testing',
        'DFT Measurement',
        'Adhesion Testing'
      ]
    }
  ],

  quality: {
    overline: 'Quality Infrastructure',
    title_html: 'One system.<br/>Three <em>locations.</em>',
    description: 'Every facility operates under the same integrated quality management system. Same procedures, same documentation, same audit trail \u2014 regardless of geography.',
    pillars: [
      { num: '01', title: 'Unified Documentation', description: 'Shared QMS, work instructions, and weld procedures across all sites. A document revised in India is live in Turkey the same day.' },
      { num: '02', title: 'Cross-Site Audits', description: 'Regular internal audits between facilities. India audits HAW, HAW audits GBT, GBT audits India \u2014 circular accountability.' },
      { num: '03', title: 'Digital Traceability', description: 'Material test reports, inspection records, and project documentation tracked from raw material to final delivery across all locations.' }
    ],
    certifications: [
      { logo: 'ASME', name: 'U, U2, R Stamps' },
      { logo: 'ISO', name: '9001:2015' },
      { logo: 'ISO', name: '14001:2015' },
      { logo: 'ISO', name: '45001:2018' },
      { logo: 'PED', name: '2014/68/EU' },
      { logo: 'API', name: '650 \u00B7 620' },
      { logo: 'T\u00DCV', name: 'Certified' },
      { logo: 'BV', name: 'Bureau Veritas' },
      { logo: 'NACE', name: 'Coating Inspector' }
    ]
  },

  cta: {
    title_html: 'Plan a <em>facility visit</em>',
    description: 'See our infrastructure firsthand. We host facility tours for prospective clients, inspectors, and engineering teams.'
  }
};
