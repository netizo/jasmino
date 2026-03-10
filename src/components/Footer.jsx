import { Link } from 'react-router-dom';
import logoWhite from '../assets/logo-white.png';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { to: '/about/our-story', label: 'Our Story' },
      { to: '/about/jasmino-group', label: 'Jasmino Group' },
      { to: '/industries', label: 'Industries' },
    ],
  },
  {
    title: 'What We Do',
    links: [
      { to: '/what-we-do', label: 'Overview' },
      { to: '/what-we-do/engineering-design', label: 'Engineering Design' },
      { to: '/what-we-do/equipment-manufacturing', label: 'Equipment Manufacturing' },
      { to: '/what-we-do/corrosion-protection', label: 'Corrosion Protection' },
      { to: '/what-we-do/rubber-products', label: 'Rubber Products' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/news', label: 'News' },
      { to: '/case-studies', label: 'Case Studies' },
      { to: '/infrastructure', label: 'Infrastructure' },
      { to: '/design-system', label: 'Design System' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Sitemap' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { to: '/contact', label: 'Contact' },
      { href: 'https://linkedin.com', label: 'LinkedIn' },
      { href: 'https://x.com', label: 'X (Twitter)' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer footer-five-col">
      <div className="footer-header">
        <Link to="/" className="footer-logo">
          <img src={logoWhite} alt="Jasmino" />
        </Link>
        <div className="footer-header-right">
          <p className="footer-tagline">
            Design, build, and protect industrial process equipment under one roof.
          </p>
          <Link to="/contact" className="footer-cta">
            Start the Conversation
          </Link>
        </div>
      </div>
      <div className="footer-divider" />
      <div className="footer-grid">
        {COLUMNS.map((col, i) => (
          <div key={col.title} className="footer-col">
            <h5>{col.title}</h5>
            <nav className="footer-links">
              {col.links.map((item) =>
                item.to ? (
                  <Link key={item.label} to={item.to}>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.href === '#' && { onClick: (e) => e.preventDefault(), 'aria-disabled': true, tabIndex: -1, className: 'footer-link-placeholder' })}
                    {...(item.href?.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Jasmino Corporation. All rights reserved.</p>
      </div>
    </footer>
  );
}
