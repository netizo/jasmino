import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h5>Jasmino Corporation</h5>
          <p style={{ marginBottom: 16 }}>
            The only company that designs, manufactures, and protects industrial process equipment under one roof.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
            40+ YEARS · 15+ COUNTRIES · 130,000+ m²
          </p>
        </div>
        <div className="footer-col">
          <h5>What We Do</h5>
          <Link to="/what-we-do">Overview</Link>
          <Link to="/what-we-do/engineering-design">Engineering Design</Link>
          <Link to="/what-we-do/equipment-manufacturing">Equipment Manufacturing</Link>
          <Link to="/what-we-do/corrosion-protection">Corrosion Protection</Link>
          <Link to="/what-we-do/rubber-products">Rubber Products</Link>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <Link to="/about/our-story">Our Story</Link>
          <Link to="/about/jasmino-group">Jasmino Group</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/infrastructure">Infrastructure</Link>
          <Link to="/news">News</Link>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <p style={{ marginBottom: 4 }}>info@jasmino.com</p>
          <p style={{ marginBottom: 12 }}>+91 22 6789 0000</p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '11px' }}>
            Get in Touch
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Jasmino Corporation. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
