/* Animated SVG icons for material/capability cards on T3 pages.
   Each icon uses a simple CSS stroke-draw or pulse animation. */

const S = { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

const icons = {
  /* ── Rubber / Polymer types ── */
  NR: ( // Natural rubber — elastic stretch
    <svg {...S}>
      <path className="mi-draw" d="M6 20c4-8 8 8 12 0s8 8 12 0" />
      <circle className="mi-pulse" cx="16" cy="12" r="4" />
    </svg>
  ),
  IIR: ( // Butyl rubber — gas barrier / shield
    <svg {...S}>
      <path className="mi-draw" d="M16 4v24M8 8h16M8 24h16" />
      <rect className="mi-draw" x="10" y="11" width="12" height="10" rx="2" />
    </svg>
  ),
  CSM: ( // Hypalon — chemical shield
    <svg {...S}>
      <path className="mi-draw" d="M16 4l10 6v12l-10 6-10-6V10z" />
      <path className="mi-draw" d="M16 10v12" />
    </svg>
  ),
  EPDM: ( // EPDM — weather/ozone resistance, cloud
    <svg {...S}>
      <path className="mi-draw" d="M8 22a6 6 0 0112 0" />
      <circle className="mi-pulse" cx="14" cy="16" r="5" />
      <circle className="mi-pulse" cx="20" cy="17" r="4" />
    </svg>
  ),
  FKM: ( // Fluoroelastomer — flame/heat
    <svg {...S}>
      <path className="mi-draw" d="M16 4c0 6-6 8-6 14a6 6 0 0012 0c0-6-6-8-6-14z" />
      <path className="mi-draw" d="M13 22a3 3 0 006 0c0-3-3-4-3-7" />
    </svg>
  ),
  EP: ( // EPDM or Epoxy — molecule bond
    <svg {...S}>
      <circle className="mi-pulse" cx="10" cy="10" r="3" />
      <circle className="mi-pulse" cx="22" cy="10" r="3" />
      <circle className="mi-pulse" cx="16" cy="22" r="3" />
      <line className="mi-draw" x1="12" y1="12" x2="15" y2="20" />
      <line className="mi-draw" x1="20" y1="12" x2="17" y2="20" />
      <line className="mi-draw" x1="13" y1="10" x2="19" y2="10" />
    </svg>
  ),

  /* ── Engineering / Process ── */
  PFD: ( // Process flow — flow arrows
    <svg {...S}>
      <path className="mi-draw" d="M4 16h24" />
      <path className="mi-draw" d="M22 10l6 6-6 6" />
      <rect className="mi-draw" x="10" y="12" width="8" height="8" rx="1" />
    </svg>
  ),
  'P&ID': ( // P&ID — schematic with valve
    <svg {...S}>
      <path className="mi-draw" d="M4 16h8M20 16h8" />
      <path className="mi-draw" d="M12 10l8 6-8 6z" />
      <line className="mi-draw" x1="16" y1="6" x2="16" y2="10" />
    </svg>
  ),
  '3D': ( // 3D modelling — isometric cube
    <svg {...S}>
      <path className="mi-draw" d="M16 4l12 7v10l-12 7L4 21V11z" />
      <path className="mi-draw" d="M16 18l12-7" />
      <path className="mi-draw" d="M16 18L4 11" />
      <path className="mi-draw" d="M16 18v10" />
    </svg>
  ),
  HAZ: ( // Hazard / safety — warning triangle
    <svg {...S}>
      <path className="mi-draw" d="M16 4L2 28h28z" />
      <line className="mi-draw" x1="16" y1="12" x2="16" y2="20" />
      <circle className="mi-pulse" cx="16" cy="24" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  σ: ( // Stress analysis — force arrows
    <svg {...S}>
      <path className="mi-draw" d="M4 16h24" />
      <path className="mi-draw" d="M10 10l-6 6 6 6" />
      <path className="mi-draw" d="M22 10l6 6-6 6" />
    </svg>
  ),
  ISO: ( // Isometric drawing — grid lines
    <svg {...S}>
      <path className="mi-draw" d="M4 24l12-8 12 8" />
      <path className="mi-draw" d="M4 18l12-8 12 8" />
      <path className="mi-draw" d="M16 10v14" />
    </svg>
  ),
  SUP: ( // Support design — bracket
    <svg {...S}>
      <path className="mi-draw" d="M8 4v20h16" />
      <path className="mi-draw" d="M8 18l10-10" />
      <circle className="mi-pulse" cx="22" cy="24" r="3" />
    </svg>
  ),

  /* ── Fabrication / Equipment ── */
  PV: ( // Pressure vessel — cylinder
    <svg {...S}>
      <ellipse className="mi-draw" cx="16" cy="7" rx="8" ry="3" />
      <path className="mi-draw" d="M8 7v18c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
      <path className="mi-draw" d="M12 14h8" />
    </svg>
  ),
  HX: ( // Heat exchanger — tubes with flow
    <svg {...S}>
      <rect className="mi-draw" x="6" y="6" width="20" height="20" rx="2" />
      <path className="mi-draw" d="M10 10c4 4 8-4 12 0" />
      <path className="mi-draw" d="M10 16c4 4 8-4 12 0" />
      <path className="mi-draw" d="M10 22c4 4 8-4 12 0" />
    </svg>
  ),
  TK: ( // Storage tank — flat-bottom tank
    <svg {...S}>
      <path className="mi-draw" d="M8 8h16v18H8z" />
      <path className="mi-draw" d="M6 8h20" />
      <path className="mi-draw" d="M12 26v2M20 26v2" />
      <path className="mi-draw" d="M10 18h12" />
    </svg>
  ),
  RX: ( // Reactor — vessel with agitator
    <svg {...S}>
      <ellipse className="mi-draw" cx="16" cy="6" rx="8" ry="3" />
      <path className="mi-draw" d="M8 6v20c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <line className="mi-draw" x1="16" y1="3" x2="16" y2="22" />
      <path className="mi-draw" d="M12 18l4 4 4-4" />
    </svg>
  ),
  SP: ( // Pipe spools — pipes
    <svg {...S}>
      <path className="mi-draw" d="M4 12h10v8H4zM18 12h10v8H18z" />
      <path className="mi-draw" d="M14 14h4M14 18h4" />
    </svg>
  ),

  /* ── Plastic / Composite materials ── */
  FRP: ( // FRP — layered composite
    <svg {...S}>
      <path className="mi-draw" d="M6 10h20M6 16h20M6 22h20" />
      <path className="mi-draw" d="M8 10v12M24 10v12" />
    </svg>
  ),
  PP: ( // Polypropylene — pellet/molecule
    <svg {...S}>
      <circle className="mi-pulse" cx="16" cy="16" r="6" />
      <circle className="mi-pulse" cx="8" cy="8" r="3" />
      <circle className="mi-pulse" cx="24" cy="8" r="3" />
      <line className="mi-draw" x1="12" y1="12" x2="10" y2="10" />
      <line className="mi-draw" x1="20" y1="12" x2="22" y2="10" />
    </svg>
  ),
  PVDF: ( // PVDF — crystalline structure
    <svg {...S}>
      <path className="mi-draw" d="M16 4l8 6v12l-8 6-8-6V10z" />
      <circle className="mi-pulse" cx="16" cy="16" r="4" />
    </svg>
  ),
  DL: ( // Dual laminate — two layers
    <svg {...S}>
      <rect className="mi-draw" x="6" y="6" width="20" height="10" rx="2" />
      <rect className="mi-draw" x="6" y="16" width="20" height="10" rx="2" />
      <path className="mi-draw" d="M10 11h12M10 21h12" />
    </svg>
  ),

  /* ── Fluoropolymer linings ── */
  PFA: ( // PFA rotolining — rotating/seamless
    <svg {...S}>
      <circle className="mi-draw mi-spin" cx="16" cy="16" r="10" />
      <path className="mi-draw" d="M16 6a10 10 0 010 20" strokeDasharray="4 4" />
      <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" className="mi-pulse" />
    </svg>
  ),
  PTFE: ( // PTFE — sheet/layer
    <svg {...S}>
      <path className="mi-draw" d="M6 12h20v2H6zM6 18h20v2H6z" />
      <path className="mi-draw" d="M10 8v4M22 8v4M10 20v4M22 20v4" />
    </svg>
  ),
  ECTFE: ( // ECTFE — spray/mist
    <svg {...S}>
      <path className="mi-draw" d="M16 4v8" />
      <path className="mi-draw" d="M12 14c0 6-4 10-4 14M16 12c0 6 0 10 0 16M20 14c0 6 4 10 4 14" />
      <circle className="mi-pulse" cx="10" cy="22" r="1" fill="currentColor" stroke="none" />
      <circle className="mi-pulse" cx="22" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),

  /* ── Coatings ── */
  VE: ( // Vinyl ester — brush/trowel
    <svg {...S}>
      <path className="mi-draw" d="M8 26l4-4 12-12 4 4-12 12z" />
      <path className="mi-draw" d="M20 10l4 4" />
    </svg>
  ),
  PU: ( // Polyurethane — spray gun
    <svg {...S}>
      <path className="mi-draw" d="M6 20l8-8 6 6-8 8z" />
      <path className="mi-draw" d="M14 12l6-6h6v6l-6 6" />
    </svg>
  ),
  CER: ( // Ceramic — kiln/high-temp
    <svg {...S}>
      <path className="mi-draw" d="M8 28h16M10 28V16l6-12 6 12v12" />
      <path className="mi-draw" d="M14 20h4" />
    </svg>
  ),

  /* ── Water treatment ── */
  ETP: ( // Effluent treatment — water drop
    <svg {...S}>
      <path className="mi-draw" d="M16 4c-6 10-10 14-10 20a10 10 0 0020 0c0-6-4-10-10-20z" />
      <path className="mi-draw" d="M12 22c2-2 6-2 8 0" />
    </svg>
  ),
  RO: ( // Reverse osmosis — membrane filter
    <svg {...S}>
      <rect className="mi-draw" x="4" y="8" width="24" height="16" rx="2" />
      <line className="mi-draw" x1="16" y1="8" x2="16" y2="24" strokeDasharray="3 2" />
      <path className="mi-draw" d="M8 16h6M18 16h6" />
      <path className="mi-draw" d="M12 13l2 3-2 3M20 13l-2 3 2 3" />
    </svg>
  ),
  DM: ( // Demineralisation — ion exchange
    <svg {...S}>
      <circle className="mi-pulse" cx="10" cy="10" r="4" />
      <circle className="mi-pulse" cx="22" cy="10" r="4" />
      <path className="mi-draw" d="M8 18v8h16v-8" />
      <path className="mi-draw" d="M10 14v4M22 14v4" />
      <line className="mi-draw" x1="12" y1="22" x2="20" y2="22" />
    </svg>
  ),
  ZLD: ( // Zero liquid discharge — evaporation
    <svg {...S}>
      <path className="mi-draw" d="M6 24h20" />
      <path className="mi-draw" d="M10 24V14h12v10" />
      <path className="mi-draw" d="M10 18c2-3 4 0 6-3s4 0 6-3" />
      <path className="mi-draw" d="M14 8v-4M16 10v-6M18 8v-4" />
    </svg>
  ),

  /* ── Inspection / QA ── */
  '⚡': ( // Holiday detection — spark
    <svg {...S}>
      <path className="mi-draw" d="M18 4l-6 12h8l-6 12" />
    </svg>
  ),
  '📏': ( // Condition assessment — gauge
    <svg {...S}>
      <path className="mi-draw" d="M4 26h24M8 26V10M24 26V10" />
      <path className="mi-draw" d="M12 26V16M16 26V12M20 26V18" />
    </svg>
  ),
  '🔧': ( // On-site repair — wrench
    <svg {...S}>
      <path className="mi-draw" d="M20 4a8 8 0 00-7 12L4 25l3 3 9-9a8 8 0 0012-7l-4 4-3-3 4-4a8 8 0 00-5-2z" />
    </svg>
  ),
  '🚨': ( // Emergency — siren
    <svg {...S}>
      <path className="mi-draw" d="M8 20h16v6H8z" />
      <path className="mi-draw" d="M12 20v-6a4 4 0 018 0v6" />
      <line className="mi-draw" x1="16" y1="8" x2="16" y2="4" />
      <line className="mi-draw" x1="8" y1="10" x2="5" y2="8" />
      <line className="mi-draw" x1="24" y1="10" x2="27" y2="8" />
      <circle className="mi-pulse" cx="16" cy="23" r="2" />
    </svg>
  ),

  /* ── Rubber Products ── */
  EJ: ( // Expansion joints — bellows
    <svg {...S}>
      <path className="mi-draw" d="M4 16h4M24 16h4" />
      <path className="mi-draw" d="M8 10v12M24 10v12" />
      <path className="mi-draw" d="M8 12l4 4-4 4M12 12l4 4-4 4M16 12l4 4-4 4M20 12l4 4-4 4" />
    </svg>
  ),
  GS: ( // Gaskets — ring seal
    <svg {...S}>
      <circle className="mi-draw" cx="16" cy="16" r="10" />
      <circle className="mi-draw" cx="16" cy="16" r="5" />
    </svg>
  ),
  WL: ( // Wear liners — abrasion shield
    <svg {...S}>
      <rect className="mi-draw" x="6" y="8" width="20" height="16" rx="2" />
      <path className="mi-draw" d="M6 14h20" />
      <path className="mi-draw" d="M10 18l3-2 3 2 3-2 3 2" />
    </svg>
  ),
  VM: ( // Vibration mounts — spring
    <svg {...S}>
      <path className="mi-draw" d="M8 6h16" />
      <path className="mi-draw" d="M8 26h16" />
      <path className="mi-draw" d="M16 6l-5 4 10 4-10 4 10 4-5 4" />
    </svg>
  ),
};

export default function MatIcon({ symbol }) {
  const icon = icons[symbol];
  if (!icon) {
    // Fallback: render the text symbol
    return <span className="mat-icon-text">{symbol}</span>;
  }
  return <span className="mat-icon-svg">{icon}</span>;
}
