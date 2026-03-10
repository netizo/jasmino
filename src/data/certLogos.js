/**
 * Certification logo paths for monochrome display.
 * Logos live in /logos/certs/ and use currentColor for theme compatibility.
 */
export const certLogoMap = {
  ASME: '/logos/certs/asme.svg',
  API: '/logos/certs/api.svg',
  PED: '/logos/certs/ped.svg',
  'ISO 9001': '/logos/certs/iso9001.svg',
  ISO: '/logos/certs/iso9001.svg',
  TÜV: '/logos/certs/tuv.svg',
  TUV: '/logos/certs/tuv.svg',
  'Bureau Veritas': '/logos/certs/bureau-veritas.svg',
  BV: '/logos/certs/bureau-veritas.svg',
};

/** Check if we have a logo for this cert key */
export function hasCertLogo(key) {
  return key in certLogoMap;
}

/** Certifications to show in hero/footer strips (with logo keys) */
export const heroCerts = [
  { key: 'ASME', label: 'ASME' },
  { key: 'API', label: 'API' },
  { key: 'PED', label: 'PED' },
  { key: 'ISO 9001', label: 'ISO 9001' },
  { key: 'TÜV', label: 'TÜV' },
  { key: 'Bureau Veritas', label: 'Bureau Veritas' },
];
