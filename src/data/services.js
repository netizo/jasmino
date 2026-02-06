export const services = {
  'engineering-design': {
    'process-plant-design': {
      name: 'Process & Plant Design',
      division: 'Engineering Design',
      divisionSlug: 'engineering-design',
      tagline: 'Conceptual through detailed engineering for complete process plants.',
      intro: 'Our process and plant design team delivers end-to-end engineering from feasibility studies through construction-ready documentation. We combine process simulation, 3D plant modelling, and multi-discipline coordination to eliminate costly rework and compress project schedules.',
      capabilities: {
        scope: ['Feasibility studies & techno-economic analysis', 'Process simulation (Aspen, HYSYS)', 'PFD and P&ID development', 'Equipment sizing & specification', '3D plant modelling & clash detection', 'Construction support documentation'],
        tools: ['Aspen Plus / HYSYS', 'AutoCAD Plant 3D', 'AVEVA E3D', 'HTRI for thermal design', 'Caesar II for stress analysis', 'SmartPlant Foundation'],
        deliverables: ['Process Design Basis', 'Heat & Material Balances', 'PFDs and P&IDs', 'Equipment Datasheets', '3D Plant Model', 'Construction Isometrics']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['equipment-design', 'piping-design']
    },
    'equipment-design': {
      name: 'Equipment Design',
      division: 'Engineering Design',
      divisionSlug: 'engineering-design',
      tagline: 'Mechanical design of pressure vessels, heat exchangers, and storage tanks to international codes.',
      intro: 'We engineer individual pieces of process equipment — pressure vessels, columns, heat exchangers, reactors, and storage tanks. Every design is code-compliant (ASME, PED, IS 2825) and optimized for manufacturability because the same company that designs it will build it.',
      capabilities: {
        scope: ['Pressure vessel design (ASME VIII Div 1 & 2)', 'Heat exchanger design (TEMA)', 'Column & reactor internals', 'Storage tank design (API 650/620)', 'Finite Element Analysis (FEA)', 'Seismic & wind load analysis'],
        tools: ['PV Elite', 'Compress', 'HTRI / BJAC', 'ANSYS FEA', 'Solid Edge / SolidWorks', 'MathCAD'],
        deliverables: ['GA Drawings', 'Fabrication Drawings', 'Design Calculations', 'Material Requisitions', 'Welding Procedure Specifications', 'QA/QC Plans']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['steel-equipment', 'process-plant-design']
    },
    'piping-design': {
      name: 'Piping Design',
      division: 'Engineering Design',
      divisionSlug: 'engineering-design',
      tagline: 'Stress-analyzed piping systems from utility headers to critical process lines.',
      intro: 'Complete piping engineering covering routing, stress analysis, support design, and isometric generation. Our piping engineers work within the same 3D plant model as the process team, eliminating interdisciplinary gaps that cause field rework.',
      capabilities: {
        scope: ['Piping layout & routing in 3D', 'Flexibility & stress analysis (ASME B31.3)', 'Support design & standard selection', 'Material take-off & procurement support', 'Tie-in engineering for brownfield projects', 'As-built survey integration'],
        tools: ['Caesar II', 'AutoCAD Plant 3D', 'AVEVA E3D', 'Navisworks for review', 'SmartPlant P&ID', 'Hexagon PPM'],
        deliverables: ['Piping Plans & Sections', 'Isometric Drawings', 'Stress Analysis Reports', 'Support Location Drawings', 'Material Take-Offs', 'Line Lists & Valve Lists']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['process-plant-design', 'steel-equipment']
    },
    'water-treatment': {
      name: 'Water Treatment',
      division: 'Engineering Design',
      divisionSlug: 'engineering-design',
      tagline: 'Process design for industrial water and wastewater treatment systems.',
      intro: 'We design water treatment systems for industrial applications — raw water, demineralization, effluent treatment, zero liquid discharge, and cooling water chemistry. Our treatment designs are integrated with the equipment we manufacture and the linings we apply.',
      capabilities: {
        scope: ['Raw water treatment (clarification, filtration)', 'DM plant design (IX, RO, EDI)', 'Effluent treatment (ETP) design', 'Zero Liquid Discharge (ZLD) systems', 'Cooling water treatment', 'Condensate polishing'],
        tools: ['WAVE (Dow/DuPont)', 'IMS Design (Purolite)', 'Proprietary sizing tools', 'Process simulation', 'Hydraulic modelling', 'Water chemistry analysis'],
        deliverables: ['Water Balance Diagrams', 'Treatment Scheme Proposals', 'Equipment Specifications', 'Chemical Dosing Calculations', 'O&M Manuals', 'Performance Guarantees']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['plastic-frp-equipment', 'rubber-linings']
    }
  },
  'equipment-manufacturing': {
    'steel-equipment': {
      name: 'Steel Equipment',
      division: 'Equipment Manufacturing',
      divisionSlug: 'equipment-manufacturing',
      tagline: 'ASME and API certified fabrication of pressure vessels, columns, heat exchangers, and storage tanks.',
      intro: 'Our 80,000 m\u00B2 facility fabricates critical process equipment in carbon steel, stainless steel, duplex, and exotic alloys. With 150+ qualified welding procedures and ASME U/U2/S stamps, we handle everything from standard vessels to code-critical reactors.',
      capabilities: {
        scope: ['Pressure vessels (up to 200 tonnes)', 'Shell & tube heat exchangers', 'Process columns & reactors', 'Storage tanks (API 650/620)', 'Agitators & internals', 'Modular skid packages'],
        tools: ['CNC plasma & oxy-fuel cutting', 'Hydraulic plate rolling (up to 100mm)', 'Submerged arc welding (SAW)', 'Automated TIG orbital welding', 'PWHT furnaces (in-house)', 'NDE: RT, UT, MT, PT, TOFD'],
        deliverables: ['Fabricated Equipment', 'MDR (Manufacturer Data Report)', 'As-Built Drawings', 'Material Test Certificates', 'NDE Reports', 'Hydrostatic Test Reports']
      },
      hasSpecs: true,
      specs: [
        { parameter: 'Max Vessel Weight', value: '200 tonnes', code: 'ASME VIII' },
        { parameter: 'Max Shell Thickness', value: '100 mm', code: 'ASME VIII' },
        { parameter: 'Max Diameter', value: '6,000 mm', code: 'ASME/API' },
        { parameter: 'Max Length', value: '40,000 mm', code: 'ASME VIII' },
        { parameter: 'Design Pressure', value: 'Vacuum to 350 bar', code: 'ASME VIII Div 2' },
        { parameter: 'Design Temperature', value: '-196\u00B0C to 900\u00B0C', code: 'ASME VIII' }
      ],
      hasMaterials: false,
      integrations: ['equipment-design', 'rubber-linings']
    },
    'plastic-frp-equipment': {
      name: 'Plastic & FRP Equipment',
      division: 'Equipment Manufacturing',
      divisionSlug: 'equipment-manufacturing',
      tagline: 'Corrosion-resistant FRP and thermoplastic equipment for aggressive chemical environments.',
      intro: 'We manufacture fiberglass reinforced plastic (FRP) and thermoplastic equipment for applications where metallic construction is impractical. Tanks, scrubbers, ducts, and piping in vinyl ester, polyester, and engineered thermoplastics.',
      capabilities: {
        scope: ['FRP tanks & vessels (hand layup & filament winding)', 'FRP scrubbers & absorbers', 'FRP ducting & piping', 'Thermoplastic (PP/PE/PVC/PVDF) fabrication', 'Dual laminate construction', 'FRP structural shapes'],
        tools: ['Filament winding machines', 'Hand layup with vacuum bagging', 'CNC trimming & drilling', 'Thermoplastic butt fusion & extrusion welding', 'Barcol hardness testing', 'Burnout test (glass content)'],
        deliverables: ['Fabricated FRP/Plastic Equipment', 'Laminate Schedule Documentation', 'QC Test Reports', 'Material Certificates', 'Installation Drawings', 'O&M Manuals']
      },
      hasSpecs: true,
      specs: [
        { parameter: 'Max FRP Tank Diameter', value: '5,000 mm', code: 'BS 4994 / ASME RTP-1' },
        { parameter: 'Max FRP Pressure', value: '10 bar', code: 'BS 4994' },
        { parameter: 'Temperature Range (VE)', value: '-30\u00B0C to 120\u00B0C', code: 'ASTM C581' },
        { parameter: 'Resin Systems', value: 'Polyester, Vinyl Ester, Epoxy', code: 'ASTM' }
      ],
      hasMaterials: false,
      integrations: ['water-treatment', 'coatings-resin-systems']
    }
  },
  'corrosion-protection': {
    'rubber-linings': {
      name: 'Rubber Linings',
      division: 'Corrosion Protection',
      divisionSlug: 'corrosion-protection',
      tagline: 'Shop-applied and field-applied rubber lining systems for chemical resistance and abrasion protection.',
      intro: 'Rubber lining is the cornerstone of our corrosion protection capability. Applied in our shops or on-site by 150+ trained technicians, our lining systems protect critical assets in the harshest chemical and abrasive environments. Backed by 2,000+ proven compound formulations.',
      capabilities: {
        scope: ['Natural rubber linings (soft & hard)', 'Synthetic rubber linings (neoprene, butyl, EPDM, nitrile)', 'Autoclave-cured linings (shop)', 'Self-cure / site-cure linings (field)', 'Brick & tile lining systems', 'Expansion joint & flue gas duct lining'],
        tools: ['Autoclave curing (shop)', 'Self-vulcanizing systems (field)', 'Surface preparation (Sa 2.5 / Sa 3)', 'Holiday detection (spark testing)', 'Adhesion testing', 'Shore hardness verification'],
        deliverables: ['Lining Application Report', 'Holiday Test Certificate', 'Material & Batch Traceability', 'Adhesion Test Results', 'Photographic Documentation', 'Warranty Certificate']
      },
      hasSpecs: true,
      specs: [
        { parameter: 'Lining Thickness', value: '3 mm to 12 mm', code: 'ISO 6504' },
        { parameter: 'Operating Temperature', value: '-20\u00B0C to 120\u00B0C', code: 'DIN 28053' },
        { parameter: 'Chemical Resistance', value: 'Acids, alkalis, salts to 98% H\u2082SO\u2084', code: 'DIN 28061' },
        { parameter: 'Abrasion Resistance', value: 'DIN 53516 < 100 mm\u00B3', code: 'DIN 53516' },
        { parameter: 'Bonding Strength', value: '> 4 N/mm (peel test)', code: 'DIN 53507' }
      ],
      hasMaterials: true,
      materials: [
        { type: 'Natural Rubber (Soft)', tempRange: '-20 to 80\u00B0C', resistance: 'Dilute acids, alkalis' },
        { type: 'Natural Rubber (Hard/Ebonite)', tempRange: '-20 to 90\u00B0C', resistance: 'Conc. acids, FGD environments' },
        { type: 'Neoprene (CR)', tempRange: '-30 to 100\u00B0C', resistance: 'Moderate acids, weathering' },
        { type: 'Butyl (IIR)', tempRange: '-40 to 120\u00B0C', resistance: 'Hot acids, oxidizing chemicals' },
        { type: 'EPDM', tempRange: '-50 to 120\u00B0C', resistance: 'Steam, ozone, alkalis' },
        { type: 'Nitrile (NBR)', tempRange: '-30 to 100\u00B0C', resistance: 'Oils, fuels, solvents' },
        { type: 'Chlorobutyl (CIIR)', tempRange: '-40 to 120\u00B0C', resistance: 'Hot conc. H\u2082SO\u2084, HCl' }
      ],
      integrations: ['steel-equipment', 'inspection-repair']
    },
    'plastic-linings': {
      name: 'Plastic Linings',
      division: 'Corrosion Protection',
      divisionSlug: 'corrosion-protection',
      tagline: 'Thermoplastic lining systems for extreme chemical and thermal environments.',
      intro: 'When rubber reaches its limits, plastic linings take over. We apply PP, PE, PFA, PVDF, ECTFE, and FEP linings to steel vessels and piping for environments that demand the ultimate in chemical resistance — including hot concentrated acids and ultra-pure applications.',
      capabilities: {
        scope: ['Loose-liner (drop-in) plastic linings', 'Welded sheet linings (PP, PE, PVDF)', 'Fluoropolymer linings (PFA, ECTFE, FEP)', 'Dual laminate construction', 'Rotolining', 'Piping & fitting lining'],
        tools: ['Hot air & extrusion welding', 'Spark testing (holiday detection)', 'Infrared thermography', 'Ultrasonic thickness measurement', 'Welding qualification (DVS 2212)', 'Pressure / vacuum testing'],
        deliverables: ['Lining Application Report', 'Holiday Test Certificate', 'Weld Test Results', 'Material Certificates', 'Installation Report', 'Warranty Certificate']
      },
      hasSpecs: true,
      specs: [
        { parameter: 'Lining Thickness', value: '2 mm to 6 mm', code: 'DVS 2205' },
        { parameter: 'Max Temperature (PVDF)', value: '140\u00B0C', code: 'DVS 2205' },
        { parameter: 'Max Temperature (PFA)', value: '260\u00B0C', code: 'ASTM' },
        { parameter: 'Chemical Resistance', value: 'Virtually all chemicals incl. HF', code: 'DIN 8075' }
      ],
      hasMaterials: true,
      materials: [
        { type: 'PP (Polypropylene)', tempRange: '0 to 100\u00B0C', resistance: 'Acids, alkalis, solvents' },
        { type: 'PE (Polyethylene)', tempRange: '-50 to 80\u00B0C', resistance: 'Dilute acids, water treatment' },
        { type: 'PVDF', tempRange: '-30 to 140\u00B0C', resistance: 'Strong acids, halogens, oxidizers' },
        { type: 'PFA', tempRange: '-200 to 260\u00B0C', resistance: 'Virtually all chemicals' },
        { type: 'ECTFE (Halar)', tempRange: '-75 to 150\u00B0C', resistance: 'Strong acids, chlorine' },
        { type: 'FEP', tempRange: '-200 to 200\u00B0C', resistance: 'Virtually all chemicals' }
      ],
      integrations: ['steel-equipment', 'coatings-resin-systems']
    },
    'coatings-resin-systems': {
      name: 'Coatings & Resin Systems',
      division: 'Corrosion Protection',
      divisionSlug: 'corrosion-protection',
      tagline: 'High-performance coating and resin flooring systems for industrial environments.',
      intro: 'For surfaces where linings aren\u2019t practical \u2014 structural steel, concrete floors, secondary containment, and atmospheric zones \u2014 we apply engineered coating systems. Epoxy, polyurethane, vinyl ester, and novolac systems selected for the specific corrosive environment.',
      capabilities: {
        scope: ['Epoxy coating systems (tank internals)', 'Vinyl ester / novolac flake linings', 'Polyurethane topcoats', 'Concrete protection & resin flooring', 'Secondary containment coatings', 'Fireproofing systems'],
        tools: ['Airless spray application', 'Surface preparation (Sa 2.5)', 'DFT measurement', 'Adhesion testing (pull-off)', 'Holiday / pinhole detection', 'Environmental monitoring (dew point, RH)'],
        deliverables: ['Coating Application Report', 'DFT Records', 'Adhesion Test Results', 'Environmental Logs', 'Product Data Sheets', 'Warranty Certificate']
      },
      hasSpecs: false,
      hasMaterials: true,
      materials: [
        { type: 'Epoxy (amine-cured)', tempRange: '-30 to 90\u00B0C', resistance: 'Dilute acids, alkalis, water' },
        { type: 'Novolac Epoxy', tempRange: '-30 to 150\u00B0C', resistance: 'Strong acids, solvents' },
        { type: 'Vinyl Ester Flake', tempRange: '-30 to 120\u00B0C', resistance: 'Strong acids, chlorine, FGD' },
        { type: 'Polyurethane', tempRange: '-40 to 120\u00B0C', resistance: 'UV, weathering, abrasion' }
      ],
      integrations: ['rubber-linings', 'inspection-repair']
    },
    'inspection-repair': {
      name: 'Inspection & Repair',
      division: 'Corrosion Protection',
      divisionSlug: 'corrosion-protection',
      tagline: 'Condition assessment, planned maintenance, and emergency repair for lined and coated equipment.',
      intro: 'We don\u2019t just apply linings \u2014 we maintain them. Our inspection teams assess lining condition, identify failure modes, and execute planned or emergency repairs. Extend asset life and avoid unplanned shutdowns with our condition monitoring programs.',
      capabilities: {
        scope: ['Visual & spark test inspection', 'Thickness measurement (UT)', 'Lining condition assessment', 'Root cause failure analysis', 'Planned shutdown lining repair', 'Emergency on-site repair'],
        tools: ['High-voltage holiday detector', 'Ultrasonic thickness gauge', 'Shore hardness tester', 'Infrared thermography', 'Photographic documentation', 'Drone inspection (confined spaces)'],
        deliverables: ['Inspection Report', 'Condition Assessment Report', 'Repair Scope & Estimate', 'Repair Completion Report', 'Remaining Life Estimate', 'Maintenance Schedule']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['rubber-linings', 'plastic-linings']
    }
  },
  'rubber-products': {
    'custom-compounds': {
      name: 'Custom Compounds',
      division: 'Rubber Products',
      divisionSlug: 'rubber-products',
      tagline: 'Application-specific rubber compounds engineered for your exact service conditions.',
      intro: 'Our compounding lab develops rubber formulations tailored to specific chemical, thermal, and mechanical requirements. With 2,000+ proven formulations and 9.5M kg annual capacity, we compound for lining systems, engineered products, and OEM supply.',
      capabilities: {
        scope: ['Custom formulation development', 'Compound matching & reverse engineering', 'Accelerated aging testing', 'Chemical immersion testing', 'Physical property optimization', 'Production scale-up'],
        tools: ['Banbury internal mixers', 'Two-roll mixing mills', 'Rheometer (MDR/ODR)', 'Tensile testing (Instron)', 'DIN abrasion tester', 'Chemical immersion baths'],
        deliverables: ['Compound Data Sheet', 'Test Reports (physical & chemical)', 'Batch Traceability Records', 'Shelf Life Certification', 'MSDS Documentation', 'Production Compound Supply']
      },
      hasSpecs: false,
      hasMaterials: true,
      materials: [
        { type: 'Natural Rubber (NR)', tempRange: '-50 to 80\u00B0C', resistance: 'Abrasion, tear, dynamic load' },
        { type: 'Neoprene (CR)', tempRange: '-40 to 100\u00B0C', resistance: 'Oil, weathering, flame' },
        { type: 'EPDM', tempRange: '-55 to 130\u00B0C', resistance: 'Steam, ozone, chemicals' },
        { type: 'Nitrile (NBR)', tempRange: '-40 to 120\u00B0C', resistance: 'Oil, fuel, hydraulic fluid' },
        { type: 'Butyl (IIR)', tempRange: '-45 to 130\u00B0C', resistance: 'Gas impermeability, chemicals' },
        { type: 'Hypalon (CSM)', tempRange: '-30 to 130\u00B0C', resistance: 'Ozone, UV, chemicals, color stability' }
      ],
      integrations: ['rubber-linings', 'engineered-products']
    },
    'engineered-products': {
      name: 'Engineered Products',
      division: 'Rubber Products',
      divisionSlug: 'rubber-products',
      tagline: 'Precision-molded and fabricated rubber products for industrial OEM and replacement markets.',
      intro: 'From expansion joints to roller coverings, from pump liners to screen panels \u2014 we manufacture precision rubber products for industrial applications. Each product is compounded specifically for the service it will see.',
      capabilities: {
        scope: ['Expansion joints (fabric & rubber)', 'Rubber roller coverings', 'Pump liners & impellers', 'Vibrating screen panels', 'Rubber-to-metal bonded parts', 'Gaskets & seals'],
        tools: ['Compression molding presses', 'Injection molding', 'Autoclave vulcanization', 'CNC lathe (roller grinding)', 'Rubber-to-metal bonding', 'Dynamic balancing'],
        deliverables: ['Finished Rubber Products', 'Material Test Certificates', 'Dimensional Inspection Reports', 'Dynamic Balance Reports', 'Installation Instructions', 'Warranty Documentation']
      },
      hasSpecs: false,
      hasMaterials: false,
      integrations: ['custom-compounds', 'steel-equipment']
    }
  }
};

export function getServiceBySlug(divisionSlug, serviceSlug) {
  const divServices = services[divisionSlug];
  if (!divServices) return null;
  return divServices[serviceSlug] || null;
}

export function getAllServicesFlat() {
  const flat = [];
  Object.entries(services).forEach(([divSlug, divServices]) => {
    Object.entries(divServices).forEach(([svcSlug, svc]) => {
      flat.push({ ...svc, serviceSlug: svcSlug, divisionSlug: divSlug });
    });
  });
  return flat;
}

export function getSiblingServices(divisionSlug) {
  const divServices = services[divisionSlug];
  if (!divServices) return [];
  return Object.entries(divServices).map(([slug, svc]) => ({
    slug,
    name: svc.name,
    divisionSlug
  }));
}
