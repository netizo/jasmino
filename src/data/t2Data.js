export const t2Data = {
    'engineering-design': {
        num: '01',
        hero: {
            title: 'Engineering',
            titleEm: 'Design',
            desc: 'From process simulation through detailed engineering — designs that account for fabrication, protection, and operational reality from day one.',
            stats: [
                { num: 500, suffix: '+', label: 'Projects delivered' },
                { num: 45, suffix: '+', label: 'Engineers' },
                { num: 12, suffix: '', label: 'Software platforms' }
            ],
            schematic: `
        <g opacity="0.65">
          <rect x="140" y="80" width="120" height="200" rx="60" stroke="var(--green)" stroke-width="1.2" class="line-anim"/>
          <line x1="140" y1="130" x2="260" y2="130" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="140" y1="230" x2="260" y2="230" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="200" y1="80" x2="200" y2="50" stroke="rgba(4,229,134,0.2)" stroke-width="1" class="line-anim" style="animation-delay:0.3s"/>
          <rect x="188" y="42" width="24" height="8" rx="2" stroke="rgba(4,229,134,0.2)" stroke-width="0.8"/>
          <line x1="260" y1="170" x2="310" y2="170" stroke="rgba(4,229,134,0.2)" stroke-width="1" class="line-anim" style="animation-delay:0.6s"/>
          <path d="M200 42 L200 25 L80 25 L80 170" stroke="rgba(4,229,134,0.15)" stroke-width="0.8" class="line-anim" style="animation-delay:0.9s"/>
          <path d="M310 170 L350 170 L350 320 L200 320 L200 280" stroke="rgba(4,229,134,0.15)" stroke-width="0.8" class="line-anim" style="animation-delay:1.2s"/>
          <circle cx="80" cy="185" r="18" stroke="rgba(4,229,134,0.2)" stroke-width="0.8" class="line-anim" style="animation-delay:1.5s"/>
          <rect x="60" y="260" width="80" height="30" rx="15" stroke="rgba(4,229,134,0.18)" stroke-width="0.8" class="line-anim" style="animation-delay:1.8s"/>
          <line x1="120" y1="85" x2="120" y2="275" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" stroke-dasharray="3 4"/>
        </g>
      `
        },
        advantage: {
            title: 'Design with fabrication',
            titleEm: 'built in',
            desc: "Most engineering firms design in isolation. Drawings arrive at the shop floor and don't account for manufacturing tolerances, lining requirements, or shipping constraints. We eliminated that gap.",
            list: [
                'Design decisions include manufacturing tolerances from day one',
                'Protection requirements inform wall thickness, nozzle placement, and weld access',
                '3D models validate against our actual fabrication capabilities',
                'Single engineering team — no re-work between design and production'
            ],
            diagram: `
        <g opacity="0.9">
          <rect x="20" y="20" width="100" height="48" rx="8" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="70" y="42" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">CONCEPT</text>
          <text x="70" y="56" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">P&ID · SIMULATION</text>
          <rect x="220" y="20" width="100" height="48" rx="8" stroke="rgba(59,123,219,0.35)" stroke-width="1.2" fill="rgba(59,123,219,0.04)"/>
          <text x="270" y="42" text-anchor="middle" fill="rgba(59,123,219,0.6)" font-family="monospace" font-size="8" font-weight="500">FEA ANALYSIS</text>
          <text x="270" y="56" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">ANSYS · PV ELITE</text>
          <rect x="20" y="120" width="100" height="48" rx="8" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="70" y="142" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">3D MODEL</text>
          <text x="70" y="156" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">SP3D · AVEVA E3D</text>
          <rect x="220" y="120" width="100" height="48" rx="8" stroke="rgba(59,123,219,0.35)" stroke-width="1.2" fill="rgba(59,123,219,0.04)"/>
          <text x="270" y="142" text-anchor="middle" fill="rgba(59,123,219,0.6)" font-family="monospace" font-size="8" font-weight="500">SHOP DRAWING</text>
          <text x="270" y="156" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">FABRICATION READY</text>
          <line x1="120" y1="44" x2="220" y2="44" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <line x1="270" y1="68" x2="270" y2="120" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <line x1="220" y1="144" x2="120" y2="144" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <path d="M70 168 L70 210 L270 210 L270 168" stroke="rgba(4,229,134,0.1)" stroke-width="0.8" stroke-dasharray="4 4" fill="none"/>
          <text x="170" y="230" text-anchor="middle" fill="rgba(4,229,134,0.25)" font-family="monospace" font-size="7">MANUFACTURING FEEDBACK LOOP</text>
        </g>
      `
        },
        gallery: {
            overlayTag: 'Engineering in Action',
            overlayTitle: 'Where precision lives',
            items: [
                { tag: 'Engineering Office', title: '3D Plant Modelling', sub: 'SmartPlant 3D · AVEVA E3D', img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop' },
                { tag: 'Design Review', title: 'FEA Validation', sub: 'ANSYS · Stress Analysis', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop' },
                { tag: 'Shop Floor', title: 'Design to Production', sub: 'Seamless handoff', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop' },
                { tag: 'Deliverables', title: 'Production Drawings', sub: 'GA · Fabrication · Isometric', img: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&h=800&fit=crop' }
            ]
        },
        services: {
            title: 'Four disciplines, one',
            titleEm: 'engineering team',
            desc: 'Each service feeds the next — process engineers brief equipment designers, equipment designers brief piping engineers, and every decision accounts for downstream fabrication.',
            items: [
                {
                    num: '01',
                    title: 'Process & Plant Design',
                    desc: 'P&IDs, heat & mass balance, process simulation, and complete plant layout. The blueprint that every other discipline builds from.',
                    evidence: ['P&ID development', 'Process simulation'],
                    tags: ['P&ID', 'HAZOP', 'Plant Layout', 'Simulation'],
                    schematic: `
            <rect x="20" y="20" width="80" height="80" rx="6" stroke="rgba(4,229,134,0.3)" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="20" y1="60" x2="100" y2="60" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <line x1="60" y1="20" x2="60" y2="100" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <circle cx="40" cy="40" r="8" stroke="rgba(4,229,134,0.25)" stroke-width="1"/>
            <circle cx="80" cy="40" r="6" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
            <line x1="48" y1="40" x2="74" y2="40" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                },
                {
                    num: '02',
                    title: 'Equipment Design',
                    desc: 'Vessel engineering, mechanical design, FEA analysis, and structural calculations. Every vessel designed with our manufacturing shop in mind.',
                    evidence: ['Mechanical design', 'FEA analysis'],
                    tags: ['ASME VIII', 'FEA / ANSYS', 'PV Elite', 'Compress'],
                    schematic: `
            <rect x="35" y="15" width="50" height="90" rx="25" stroke="rgba(4,229,134,0.3)" stroke-width="1"/>
            <line x1="35" y1="30" x2="85" y2="30" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <line x1="35" y1="90" x2="85" y2="90" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <circle cx="60" cy="60" r="12" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
            <line x1="85" y1="50" x2="105" y2="50" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                },
                {
                    num: '03',
                    title: 'Piping Design',
                    desc: 'Stress analysis, isometric generation, pipe rack design, and support engineering. Caesar II validated for every critical line.',
                    evidence: ['Pipe stress analysis', 'Isometrics'],
                    tags: ['CAESAR II', 'SP3D / E3D', 'Isometrics', 'Stress Analysis'],
                    schematic: `
            <path d="M20 80 L20 40 L60 40 L60 80 L100 80" stroke="rgba(4,229,134,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <circle cx="20" cy="80" r="5" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
            <circle cx="100" cy="80" r="5" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                },
                {
                    num: '04',
                    title: 'Water Treatment',
                    desc: 'Complete ETP/STP and desalination plant design. Process engineering through to installation support for water and wastewater systems.',
                    evidence: ['ETP / STP design', 'Desalination'],
                    tags: ['ETP / STP', 'Desalination', 'ZLD Systems'],
                    schematic: `
            <rect x="25" y="30" width="30" height="60" rx="4" stroke="rgba(4,229,134,0.3)" stroke-width="1"/>
            <rect x="70" y="40" width="25" height="40" rx="3" stroke="rgba(4,229,134,0.25)" stroke-width="0.75"/>
            <line x1="55" y1="55" x2="70" y2="55" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                }
            ]
        },
        capabilities: [
            {
                title: 'Software Platforms',
                items: [
                    { icon: 'SP3D', name: 'SmartPlant 3D', desc: '3D plant modelling & design' },
                    { icon: 'ANS', name: 'ANSYS', desc: 'Finite element analysis' },
                    { icon: 'C-II', name: 'CAESAR II', desc: 'Pipe stress analysis' },
                    { icon: 'PVE', name: 'PV Elite', desc: 'Pressure vessel design' },
                    { icon: 'E3D', name: 'AVEVA E3D', desc: '3D design & project management' }
                ]
            },
            {
                title: 'Design Standards',
                items: [
                    { icon: 'ASME', name: 'ASME Section VIII', desc: 'Pressure vessel design code' },
                    { icon: 'API', name: 'API 650 / 620', desc: 'Storage tank design' },
                    { icon: 'PED', name: 'PED 2014/68/EU', desc: 'European pressure directive' },
                    { icon: 'IS', name: 'IS 2825 / IS 803', desc: 'Indian standards' },
                    { icon: 'EN', name: 'EN 13445 / EN 13480', desc: 'European vessel & piping' }
                ]
            }
        ],
        flow: {
            title: 'How our services',
            titleEm: 'connect',
            desc: 'Each output feeds the next. Continuous feedback loops between disciplines ensure every decision is production-validated.',
            steps: [
                { num: '01', name: 'Process & Plant', desc: 'P&IDs, simulation, heat & mass balance' },
                { num: '02', name: 'Equipment', desc: 'Mechanical design, FEA, ASME calculations' },
                { num: '03', name: 'Piping', desc: 'Stress analysis, isometrics, supports' },
                { num: '04', name: 'Fabrication', desc: 'Shop drawings → manufacturing handoff' }
            ]
        },
        cta: {
            title: 'Ready to discuss your',
            titleEm: 'project?',
            desc: 'Share your requirements. Our engineering team will respond within 24 hours with a scope assessment.'
        }
    },
    'equipment-manufacturing': {
        num: '02',
        hero: {
            title: 'Equipment',
            titleEm: 'Manufacturing',
            desc: 'Steel, plastic, and FRP equipment fabricated to ASME, API, and PED standards. One of the largest integrated shop floors in the sector.',
            stats: [
                { num: 130, suffix: 'K+', label: 'm² shop floor' },
                { num: 150, suffix: 't', label: 'lifting capacity' },
                { num: 80, suffix: 't', label: 'max vessel weight' }
            ],
            schematic: `
        <g opacity="0.65">
          <rect x="120" y="100" width="160" height="220" rx="80" stroke="var(--green)" stroke-width="1.2" class="line-anim"/>
          <line x1="120" y1="150" x2="280" y2="150" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="120" y1="270" x2="280" y2="270" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="200" y1="100" x2="200" y2="60" stroke="rgba(4,229,134,0.2)" stroke-width="1" class="line-anim" style="animation-delay:0.4s"/>
          <rect x="185" y="50" width="30" height="10" rx="2" stroke="rgba(4,229,134,0.2)" stroke-width="0.8"/>
          <line x1="280" y1="200" x2="340" y2="200" stroke="rgba(4,229,134,0.2)" stroke-width="1" class="line-anim" style="animation-delay:0.8s"/>
          <circle cx="200" cy="210" r="25" stroke="rgba(4,229,134,0.15)" stroke-width="0.6"/>
          <path d="M100 340 Q120 360 140 340 Q160 320 180 340 Q200 360 220 340 Q240 320 260 340 Q280 360 300 340" stroke="rgba(4,229,134,0.08)" stroke-width="0.6" fill="none" class="line-anim" style="animation-delay:1.5s"/>
        </g>
      `
        },
        advantage: {
            title: 'Engineering intelligence on the',
            titleEm: 'shop floor',
            desc: 'Our fabrication team doesn\'t just receive drawings — they co-create them. Manufacturing constraints feed back into engineering from day one, eliminating the redesign cycles that plague traditional workflows.',
            list: [
                'Weld access and NDT requirements designed in from the start',
                'Material optimization based on real procurement data',
                'Lining surface preparation built into fabrication sequence',
                'In-house stress relief, PWHT, and hydrostatic testing'
            ],
            diagram: `
        <g opacity="0.9">
          <rect x="20" y="20" width="100" height="48" rx="8" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="70" y="42" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">MATERIAL</text>
          <text x="70" y="56" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">PROCUREMENT</text>
          <rect x="220" y="20" width="100" height="48" rx="8" stroke="rgba(59,123,219,0.35)" stroke-width="1.2" fill="rgba(59,123,219,0.04)"/>
          <text x="270" y="42" text-anchor="middle" fill="rgba(59,123,219,0.6)" font-family="monospace" font-size="8" font-weight="500">FABRICATION</text>
          <text x="270" y="56" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">WELDING · FORMING</text>
          <rect x="20" y="120" width="100" height="48" rx="8" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="70" y="142" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">NDT / QC</text>
          <text x="70" y="156" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">RT · UT · PMI</text>
          <rect x="220" y="120" width="100" height="48" rx="8" stroke="rgba(59,123,219,0.35)" stroke-width="1.2" fill="rgba(59,123,219,0.04)"/>
          <text x="270" y="142" text-anchor="middle" fill="rgba(59,123,219,0.6)" font-family="monospace" font-size="8" font-weight="500">DISPATCH</text>
          <text x="270" y="156" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">GLOBAL DELIVERY</text>
          <line x1="120" y1="44" x2="220" y2="44" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <line x1="270" y1="68" x2="270" y2="120" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <line x1="220" y1="144" x2="120" y2="144" stroke="rgba(4,229,134,0.2)" stroke-width="1"/>
          <path d="M70 168 L70 210 L270 210 L270 168" stroke="rgba(4,229,134,0.1)" stroke-width="0.8" stroke-dasharray="4 4" fill="none"/>
          <text x="170" y="230" text-anchor="middle" fill="rgba(4,229,134,0.25)" font-family="monospace" font-size="7">ENGINEERING FEEDBACK LOOP</text>
        </g>
      `
        },
        gallery: {
            overlayTag: 'Manufacturing in Action',
            overlayTitle: 'Precision at scale',
            items: [
                { tag: 'Fabrication Hall', title: 'Heavy Equipment Bay', sub: '150t overhead crane', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop' },
                { tag: 'Welding Bay', title: 'Certified Welding', sub: 'AWS · ASME IX qualified', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop' },
                { tag: 'NDT Inspection', title: 'Non-Destructive Testing', sub: 'RT · UT · MT · PT', img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1200&h=800&fit=crop' },
                { tag: 'Surface Prep', title: 'Blast & Prime', sub: 'SA 2.5 · SSPC-SP10', img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop' },
                { tag: 'Quality Control', title: 'Final Inspection', sub: 'Dimensional · NDE review', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop' }
            ]
        },
        services: {
            title: 'Two materials, one',
            titleEm: 'quality standard',
            desc: 'Steel and plastic/FRP equipment fabricated under the same management system. Both lines share engineering, quality, and project management resources.',
            items: [
                {
                    num: '01',
                    title: 'Steel Equipment',
                    desc: 'Pressure vessels, heat exchangers, columns, reactors, and storage tanks. ASME U/U2/R stamped. Carbon steel to exotic alloys.',
                    evidence: ['Pressure vessels', 'Heat exchangers'],
                    tags: ['Pressure Vessels', 'Heat Exchangers', 'Columns & Reactors', 'Storage Tanks'],
                    schematic: `
            <rect x="30" y="20" width="80" height="100" rx="40" stroke="rgba(4,229,134,0.3)" stroke-width="1.5"/>
            <line x1="30" y1="40" x2="110" y2="40" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <line x1="30" y1="100" x2="110" y2="100" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
            <circle cx="70" cy="70" r="15" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                },
                {
                    num: '02',
                    title: 'Plastic & FRP Equipment',
                    desc: 'Thermoplastic and fiberglass-reinforced plastic equipment for highly corrosive applications. Hand layup and filament winding.',
                    evidence: ['FRP vessels', 'Scrubbers'],
                    tags: ['FRP Vessels', 'PP/PVDF Lined', 'Duct Systems', 'Scrubbers'],
                    schematic: `
            <rect x="30" y="25" width="80" height="90" rx="8" stroke="rgba(4,229,134,0.3)" stroke-width="1.5"/>
            <rect x="38" y="33" width="64" height="74" rx="5" stroke="rgba(4,229,134,0.15)" stroke-width="0.75" stroke-dasharray="4 3"/>
            <circle cx="70" cy="70" r="20" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
          `
                }
            ]
        },
        capabilities: [
            {
                title: 'Manufacturing Stamps',
                items: [
                    { icon: 'U', name: 'ASME U Stamp', desc: 'Unfired pressure vessels' },
                    { icon: 'U2', name: 'ASME U2 Stamp', desc: 'High-pressure vessels' },
                    { icon: 'R', name: 'ASME R Stamp', desc: 'Repairs & alterations' },
                    { icon: 'PED', name: 'PED Module H/H1', desc: 'European pressure directive' },
                    { icon: 'ISO', name: 'ISO 9001:2015', desc: 'Quality management system' }
                ]
            },
            {
                title: 'Welding & NDT',
                items: [
                    { icon: 'SAW', name: 'Submerged Arc Welding', desc: 'Longitudinal & circumferential' },
                    { icon: 'TIG', name: 'GTAW / TIG', desc: 'Stainless, duplex, exotic alloys' },
                    { icon: 'RT', name: 'Radiographic Testing', desc: 'In-house X-ray & gamma' },
                    { icon: 'UT', name: 'Ultrasonic Testing', desc: 'Thickness & flaw detection' },
                    { icon: 'PMI', name: 'PMI / XRF', desc: 'Positive material identification' }
                ]
            }
        ],
        flow: {
            title: 'From material to',
            titleEm: 'dispatch',
            desc: 'Every stage has built-in quality gates. No vessel moves forward without inspection sign-off.',
            steps: [
                { num: '01', name: 'Material', desc: 'Procurement, testing, traceability' },
                { num: '02', name: 'Fabrication', desc: 'Rolling, welding, forming, machining' },
                { num: '03', name: 'Inspection', desc: 'NDT, hydro test, dimensional check' },
                { num: '04', name: 'Dispatch', desc: 'Documentation, packing, shipping' }
            ]
        },
        cta: {
            title: 'Need equipment',
            titleEm: 'fabricated?',
            desc: 'Share your GA drawings or specifications. We\'ll provide a manufacturing assessment and timeline within 48 hours.'
        }
    },
    'corrosion-protection': {
        num: '03',
        hero: {
            title: 'Corrosion',
            titleEm: 'Protection',
            desc: 'Rubber linings, plastic linings, coatings, and inspection services. HAW and GBT heritage — 40+ years protecting critical assets in the harshest chemical environments.',
            stats: [
                { num: 40, suffix: '+', label: 'Years expertise' },
                { num: 3, suffix: '', label: 'Global facilities' },
                { num: 98, suffix: '%', label: 'First-pass success' }
            ],
            schematic: `
        <g opacity="0.65">
          <rect x="100" y="100" width="200" height="200" rx="16" stroke="var(--green)" stroke-width="1.2" class="line-anim"/>
          <rect x="115" y="115" width="170" height="170" rx="12" stroke="rgba(4,229,134,0.15)" stroke-width="0.8" class="line-anim" style="animation-delay:0.4s"/>
          <rect x="130" y="130" width="140" height="140" rx="8" stroke="rgba(4,229,134,0.25)" stroke-width="1" class="line-anim" style="animation-delay:0.8s"/>
          <rect x="148" y="148" width="104" height="104" rx="4" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.03)" class="line-anim" style="animation-delay:1.2s"/>
          <line x1="300" y1="140" x2="350" y2="140" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/><text x="355" y="143" fill="rgba(255,255,255,0.15)" font-family="monospace" font-size="7">STEEL</text>
          <line x1="285" y1="170" x2="350" y2="170" stroke="rgba(255,255,255,0.1)" stroke-width="0.6"/><text x="355" y="173" fill="rgba(255,255,255,0.15)" font-family="monospace" font-size="7">PRIMER</text>
          <line x1="270" y1="200" x2="350" y2="200" stroke="rgba(4,229,134,0.15)" stroke-width="0.6"/><text x="355" y="203" fill="rgba(4,229,134,0.25)" font-family="monospace" font-size="7">ADHESIVE</text>
          <line x1="252" y1="230" x2="350" y2="230" stroke="rgba(4,229,134,0.2)" stroke-width="0.6"/><text x="355" y="233" fill="rgba(4,229,134,0.35)" font-family="monospace" font-size="7">LINING</text>
        </g>
      `
        },
        advantage: {
            title: 'Protection designed into the',
            titleEm: 'engineering',
            desc: 'We don\'t just apply linings — we design equipment that\'s optimized for lining from the start. Nozzle orientation, weld access, surface geometry — every detail accounts for protection requirements.',
            list: [
                'HAW (Germany) and GBT (Turkey) heritage — proven global expertise',
                'Equipment designed for optimal lining application from day one',
                'In-house compound development for exact chemical compatibility',
                'Spark testing and holiday detection on every square meter'
            ],
            diagram: `
        <g opacity="0.9">
          <rect x="40" y="30" width="260" height="50" rx="6" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="rgba(255,255,255,0.02)"/>
          <text x="170" y="55" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-family="monospace" font-size="8">STEEL SUBSTRATE</text>
          <text x="170" y="68" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-family="monospace" font-size="7">SA 2.5 BLAST · SURFACE PROFILE</text>
          <rect x="40" y="90" width="260" height="40" rx="6" stroke="rgba(180,160,80,0.25)" stroke-width="1" fill="rgba(180,160,80,0.03)"/>
          <text x="170" y="113" text-anchor="middle" fill="rgba(180,160,80,0.5)" font-family="monospace" font-size="8">PRIMER / ADHESIVE SYSTEM</text>
          <rect x="40" y="140" width="260" height="50" rx="6" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="170" y="165" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">RUBBER / PLASTIC LINING</text>
          <text x="170" y="180" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">AUTOCLAVE CURED · SPARK TESTED</text>
          <rect x="40" y="210" width="260" height="40" rx="6" stroke="rgba(4,229,134,0.2)" stroke-width="0.8" fill="rgba(4,229,134,0.02)"/>
          <text x="170" y="233" text-anchor="middle" fill="rgba(4,229,134,0.4)" font-family="monospace" font-size="8">INSPECTION & CERTIFICATION</text>
        </g>
      `
        },
        gallery: {
            overlayTag: 'Protection in Action',
            overlayTitle: 'Defending against corrosion',
            items: [
                { tag: 'Rubber Lining', title: 'Application Process', sub: 'Hand-applied natural rubber', img: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1200&h=800&fit=crop' },
                { tag: 'Surface Prep', title: 'Blast Finishing', sub: 'SA 2.5 white metal blast', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop' },
                { tag: 'Spark Testing', title: 'Quality Assurance', sub: 'Holiday detection at 15kV', img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop' },
                { tag: 'HAW Germany', title: 'European Facility', sub: '30,000 m² lining centre', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop' },
                { tag: 'Inspection', title: 'In-Service Assessment', sub: 'Thickness · adhesion · visual', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop' }
            ]
        },
        services: {
            title: 'Four layers of',
            titleEm: 'defence',
            desc: 'From rubber linings for the most aggressive acids to protective coatings for atmospheric exposure — complete corrosion protection under one roof.',
            items: [
                {
                    num: '01',
                    title: 'Rubber Linings',
                    desc: 'Soft and hard rubber lining systems for chemical resistance in the most aggressive environments. Autoclave and pressure cured.',
                    evidence: ['Natural rubber', 'Chlorobutyl'],
                    tags: ['Soft Rubber', 'Hard Rubber', 'Autoclave Cured', 'Ebonite'],
                    schematic: `
            <rect x="20" y="20" width="80" height="80" rx="6" stroke="rgba(4,229,134,0.3)" stroke-width="1"/>
            <rect x="28" y="28" width="64" height="64" rx="4" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/>
            <rect x="36" y="36" width="48" height="48" rx="3" stroke="rgba(4,229,134,0.35)" stroke-width="1" fill="rgba(4,229,134,0.04)"/>
          `
                },
                {
                    num: '02',
                    title: 'Plastic Linings',
                    desc: 'Thermoplastic linings including PP, PVDF, PTFE, and FEP for high-purity and ultra-corrosive applications.',
                    evidence: ['PP/PVDF', 'PTFE/FEP'],
                    tags: ['PP / PE', 'PVDF', 'PTFE / FEP', 'PFA'],
                    schematic: `
            <rect x="25" y="25" width="70" height="70" rx="4" stroke="rgba(4,229,134,0.3)" stroke-width="1"/>
            <rect x="33" y="33" width="54" height="54" rx="2" stroke="rgba(59,123,219,0.25)" stroke-width="0.75" stroke-dasharray="4 3"/>
          `
                },
                {
                    num: '03',
                    title: 'Coatings & Resin Systems',
                    desc: 'Protective coatings, flake glass systems, and resin mortars for atmospheric and immersion service.',
                    evidence: ['Epoxy systems', 'Vinyl ester'],
                    tags: ['Epoxy', 'Vinyl Ester', 'Flake Glass', 'Resin Mortar'],
                    schematic: `
            <rect x="20" y="30" width="80" height="60" rx="6" stroke="rgba(4,229,134,0.3)" stroke-width="1"/><line x1="20" y1="50" x2="100" y2="50" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/><line x1="20" y1="70" x2="100" y2="70" stroke="rgba(4,229,134,0.12)" stroke-width="0.5"/>
          `
                },
                {
                    num: '04',
                    title: 'Inspection & Repair',
                    desc: 'Scheduled inspections, diagnostic assessments, repair services, and re-lining. Extending asset life across all lining types.',
                    evidence: ['Spark testing', 'Visual inspection'],
                    tags: ['Spark Testing', 'Thickness Mapping', 'Repair', 'Re-lining'],
                    schematic: `
            <circle cx="60" cy="60" r="30" stroke="rgba(4,229,134,0.3)" stroke-width="1"/><path d="M40 60 L55 75 L80 45" stroke="rgba(4,229,134,0.4)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          `
                }
            ]
        },
        capabilities: [
            {
                title: 'Lining Materials',
                items: [
                    { icon: 'NR', name: 'Natural Rubber', desc: 'Sulphuric acid, phosphoric acid' },
                    { icon: 'CR', name: 'Chloroprene', desc: 'Moderate chemical resistance' },
                    { icon: 'IIR', name: 'Chlorobutyl', desc: 'HCl, HF, oxidizing acids' },
                    { icon: 'PP', name: 'Polypropylene', desc: 'Broad chemical compatibility' },
                    { icon: 'PVDF', name: 'PVDF', desc: 'High-purity, high-temp service' }
                ]
            },
            {
                title: 'Quality & Standards',
                items: [
                    { icon: 'DIN', name: 'DIN 28052', desc: 'Rubber lining standard' },
                    { icon: 'ASTM', name: 'ASTM D4060', desc: 'Abrasion resistance testing' },
                    { icon: 'ISO', name: 'ISO 9001:2015', desc: 'Quality management system' },
                    { icon: 'SP', name: 'Spark Test', desc: '100% holiday detection' },
                    { icon: 'TH', name: 'Thickness', desc: 'Ultrasonic verification' }
                ]
            }
        ],
        flow: {
            title: 'The protection',
            titleEm: 'sequence',
            desc: 'Every step has a hold point. No stage proceeds without inspection sign-off from the previous stage.',
            steps: [
                { num: '01', name: 'Surface Prep', desc: 'SA 2.5 blast, profile measurement' },
                { num: '02', name: 'Prime', desc: 'Adhesive system application' },
                { num: '03', name: 'Apply', desc: 'Rubber/plastic lining installation' },
                { num: '04', name: 'Cure & Test', desc: 'Autoclave cure, spark test, sign-off' }
            ]
        },
        cta: {
            title: 'Equipment needs',
            titleEm: 'protection?',
            desc: 'Send us your equipment drawings and chemical environment. We\'ll recommend the right lining system.'
        }
    },
    'rubber-products': {
        num: '04',
        hero: {
            title: 'Rubber',
            titleEm: 'Products',
            desc: 'Custom compounds and engineered rubber products. Four decades of formulation expertise — from natural rubber to advanced fluoroelastomers.',
            stats: [
                { num: 2000, suffix: '+', label: 'Proven formulations' },
                { num: 40, suffix: '+', label: 'Years R&D' },
                { num: 4, suffix: '', label: 'Compound labs' }
            ],
            schematic: `
        <g opacity="0.65">
          <circle cx="200" cy="180" r="40" stroke="var(--green)" stroke-width="1.2" class="line-anim"/>
          <circle cx="120" cy="240" r="25" stroke="rgba(4,229,134,0.18)" stroke-width="0.8" class="line-anim" style="animation-delay:0.4s"/>
          <circle cx="280" cy="240" r="30" stroke="rgba(4,229,134,0.2)" stroke-width="0.8" class="line-anim" style="animation-delay:0.7s"/>
          <circle cx="160" cy="310" r="20" stroke="rgba(4,229,134,0.15)" stroke-width="0.6" class="line-anim" style="animation-delay:1s"/>
          <circle cx="250" cy="320" r="22" stroke="rgba(4,229,134,0.18)" stroke-width="0.7" class="line-anim" style="animation-delay:1.3s"/>
          <line x1="200" y1="220" x2="145" y2="240" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="200" y1="220" x2="255" y2="240" stroke="rgba(4,229,134,0.12)" stroke-width="0.6"/>
          <line x1="130" y1="260" x2="155" y2="295" stroke="rgba(4,229,134,0.1)" stroke-width="0.5"/>
          <line x1="270" y1="265" x2="255" y2="300" stroke="rgba(4,229,134,0.1)" stroke-width="0.5"/>
          <line x1="175" y1="310" x2="230" y2="315" stroke="rgba(4,229,134,0.08)" stroke-width="0.5" stroke-dasharray="3 3"/>
        </g>
      `
        },
        advantage: {
            title: 'Formulations born from',
            titleEm: 'application',
            desc: 'Our compounds aren\'t developed in isolation. Forty years of lining and protection experience feeds directly into our R&D lab — every formulation is field-validated before it\'s offered.',
            list: [
                'In-house mixing, testing, and validation facilities',
                'Compounds optimized for specific chemical environments',
                'Direct feedback loop from lining application to compound R&D',
                'ASTM-compliant testing — tensile, elongation, hardness, aging'
            ],
            diagram: `
        <g opacity="0.9">
          <circle cx="170" cy="60" r="30" stroke="rgba(4,229,134,0.3)" stroke-width="1.2" fill="rgba(4,229,134,0.03)"/>
          <text x="170" y="57" text-anchor="middle" fill="rgba(4,229,134,0.5)" font-family="monospace" font-size="8" font-weight="500">R&D</text>
          <text x="170" y="70" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="7">FORMULATION</text>
          <circle cx="70" cy="170" r="30" stroke="rgba(59,123,219,0.3)" stroke-width="1.2" fill="rgba(59,123,219,0.03)"/>
          <text x="70" y="167" text-anchor="middle" fill="rgba(59,123,219,0.5)" font-family="monospace" font-size="8" font-weight="500">MIX</text>
          <text x="70" y="180" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="7">COMPOUND</text>
          <circle cx="270" cy="170" r="30" stroke="rgba(4,229,134,0.3)" stroke-width="1.2" fill="rgba(4,229,134,0.03)"/>
          <text x="270" y="167" text-anchor="middle" fill="rgba(4,229,134,0.5)" font-family="monospace" font-size="8" font-weight="500">TEST</text>
          <text x="270" y="180" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="7">VALIDATE</text>
          <circle cx="170" cy="240" r="30" stroke="rgba(4,229,134,0.35)" stroke-width="1.2" fill="rgba(4,229,134,0.04)"/>
          <text x="170" y="237" text-anchor="middle" fill="rgba(4,229,134,0.6)" font-family="monospace" font-size="8" font-weight="500">APPLY</text>
          <text x="170" y="250" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="7">FIELD USE</text>
          <line x1="145" y1="80" x2="95" y2="145" stroke="rgba(4,229,134,0.15)" stroke-width="0.8"/>
          <line x1="195" y1="80" x2="245" y2="145" stroke="rgba(4,229,134,0.15)" stroke-width="0.8"/>
          <line x1="95" y1="195" x2="145" y2="215" stroke="rgba(4,229,134,0.15)" stroke-width="0.8"/>
          <line x1="245" y1="195" x2="195" y2="215" stroke="rgba(4,229,134,0.15)" stroke-width="0.8"/>
        </g>
      `
        },
        gallery: {
            overlayTag: 'Compound Development',
            overlayTitle: 'The science of rubber',
            items: [
                { tag: 'R&D Lab', title: 'Compound Development', sub: 'Rheology · Physical testing', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=800&fit=crop' },
                { tag: 'Mixing', title: 'Banbury Mixing', sub: 'Precision batch processing', img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop' },
                { tag: 'Testing', title: 'Quality Control Lab', sub: 'ASTM · DIN · ISO testing', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop' },
                { tag: 'Products', title: 'Engineered Parts', sub: 'Custom moulded & extruded', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop' },
                { tag: 'Production', title: 'Sheet & Roll Stock', sub: 'Calendered compounds', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop' }
            ]
        },
        services: {
            title: 'Two capabilities, one',
            titleEm: 'compound lab',
            desc: 'Custom rubber compounds for lining applications and engineered rubber products for industrial OEMs. Both fed by the same R&D team.',
            items: [
                {
                    num: '01',
                    title: 'Custom Compounds',
                    desc: 'Proprietary rubber formulations for specific chemical environments. From natural rubber to advanced fluoroelastomers — 2,000+ proven recipes.',
                    evidence: ['Natural rubber', 'Fluoroelastomers'],
                    tags: ['NR', 'SBR', 'EPDM', 'FKM', 'Chlorobutyl'],
                    schematic: `
            <circle cx="60" cy="50" r="20" stroke="rgba(4,229,134,0.3)" stroke-width="1"/><circle cx="40" cy="85" r="12" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/><circle cx="80" cy="85" r="12" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/><line x1="48" y1="65" x2="44" y2="75" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/><line x1="72" y1="65" x2="76" y2="75" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
          `
                },
                {
                    num: '02',
                    title: 'Engineered Products',
                    desc: 'Rubber sheets, gaskets, expansion joints, wear-resistant parts, and custom-molded components for industrial applications.',
                    evidence: ['Gaskets', 'Expansion joints'],
                    tags: ['Rubber Sheets', 'Gaskets', 'Expansion Joints', 'Wear Parts'],
                    schematic: `
            <rect x="25" y="35" width="70" height="50" rx="6" stroke="rgba(4,229,134,0.3)" stroke-width="1"/><circle cx="45" cy="60" r="8" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/><circle cx="75" cy="60" r="8" stroke="rgba(4,229,134,0.2)" stroke-width="0.75"/><line x1="53" y1="60" x2="67" y2="60" stroke="rgba(4,229,134,0.15)" stroke-width="0.5"/>
          `
                }
            ]
        },
        capabilities: [
            {
                title: 'Compound Families',
                items: [
                    { icon: 'NR', name: 'Natural Rubber', desc: 'Excellent abrasion, moderate chemical' },
                    { icon: 'CR', name: 'Chloroprene', desc: 'Oil & weather resistance' },
                    { icon: 'EPDM', name: 'EPDM', desc: 'Steam, ozone, UV exposure' },
                    { icon: 'IIR', name: 'Butyl / Chlorobutyl', desc: 'Gas impermeability, acid resistance' },
                    { icon: 'FKM', name: 'Fluoroelastomer', desc: 'Extreme chemical & heat' }
                ]
            },
            {
                title: 'Testing Capabilities',
                items: [
                    { icon: 'TSL', name: 'Tensile Strength', desc: 'ASTM D412 pull testing' },
                    { icon: 'HRD', name: 'Hardness', desc: 'Shore A/D durometer' },
                    { icon: 'ABR', name: 'Abrasion', desc: 'DIN 53516 / ASTM D5963' },
                    { icon: 'AGE', name: 'Aging', desc: 'Heat, ozone, UV exposure' },
                    { icon: 'SWL', name: 'Swell', desc: 'Immersion in process chemicals' }
                ]
            }
        ],
        flow: {
            title: 'From request to',
            titleEm: 'delivery',
            desc: 'Every compound is developed against your specific chemical environment. No generic grades — only purpose-built formulations.',
            steps: [
                { num: '01', name: 'Brief', desc: 'Chemical env, temp, pressure spec' },
                { num: '02', name: 'Formulate', desc: 'R&D develops candidate compounds' },
                { num: '03', name: 'Test', desc: 'Lab validation against requirements' },
                { num: '04', name: 'Deliver', desc: 'Production batch + quality certificate' }
            ]
        },
        cta: {
            title: 'Need a custom',
            titleEm: 'compound?',
            desc: 'Tell us about your chemical environment and operating conditions. We\'ll recommend or develop the right formulation.'
        }
    }
};
