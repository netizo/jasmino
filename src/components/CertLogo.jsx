import { certLogoMap } from '../data/certLogos';

/**
 * Renders a monochrome certification logo.
 * SVGs use currentColor so they inherit text color (works on dark/light backgrounds).
 */
export default function CertLogo({ certKey, alt, width = 48, height = 28, className = '', style = {} }) {
  const src = certLogoMap[certKey] || certLogoMap[certKey?.replace(/[^\w\s]/g, '')];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt ?? certKey}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain', color: 'inherit', ...style }}
      loading="lazy"
    />
  );
}
