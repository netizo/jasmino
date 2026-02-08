import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoWhite from '../assets/logo-white.png';
import { divisions } from '../data/divisions';
import { services } from '../data/services';

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWWD, setMobileWWD] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const megaRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    setMegaOpen(false);
    setAboutOpen(false);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <nav className="navbar" style={scrolled ? { boxShadow: '0 4px 24px rgba(0,0,0,0.3)' } : {}}>
        <Link to="/" className="navbar-logo">
          <img
            src={scrolled ? logo : logoWhite}
            alt="Jasmino"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        <ul className="navbar-links">
          <li style={{ position: 'relative' }} ref={aboutRef}>
            <button
              className={`nav-trigger ${aboutOpen ? 'active' : ''}`}
              onClick={() => { setAboutOpen(!aboutOpen); setMegaOpen(false); }}
            >
              About
              <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className={`about-dropdown ${aboutOpen ? 'open' : ''}`}>
              <Link to="/about/our-story">Our Story</Link>
              <Link to="/about/jasmino-group">Jasmino Group</Link>
            </div>
          </li>
          <li ref={megaRef}>
            <button
              className={`nav-trigger ${megaOpen ? 'active' : ''}`}
              onClick={() => { setMegaOpen(!megaOpen); setAboutOpen(false); }}
            >
              What We Do
              <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </li>
          <li><Link to="/industries">Industries</Link></li>
          <li><Link to="/infrastructure">Infrastructure</Link></li>
          <li><Link to="/news">News</Link></li>
          <li className="navbar-cta">
            <Link to="/contact" className="btn btn-primary" style={{ padding: '9px 20px', fontSize: '12px' }}>Contact Us</Link>
          </li>
        </ul>
        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mega-menu ${megaOpen ? 'open' : ''}`} ref={megaRef}>
        <div className="mega-menu-grid">
          {divisions.map((div) => (
            <div className="mega-col" key={div.id}>
              <h5>{div.shortName}</h5>
              {div.services.map((svc) => (
                <Link key={svc.slug} to={`/what-we-do/${div.slug}/${svc.slug}`}>
                  {svc.name}
                </Link>
              ))}
              <Link to={`/what-we-do/${div.slug}`} className="view-division">
                View Division →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-section">
          <button className={`mobile-menu-toggle ${mobileAbout ? 'open' : ''}`} onClick={() => setMobileAbout(!mobileAbout)}>
            About
            <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={`mobile-submenu ${mobileAbout ? 'open' : ''}`}>
            <Link to="/about/our-story">Our Story</Link>
            <Link to="/about/jasmino-group">Jasmino Group</Link>
          </div>
        </div>
        <div className="mobile-menu-section">
          <button className={`mobile-menu-toggle ${mobileWWD ? 'open' : ''}`} onClick={() => setMobileWWD(!mobileWWD)}>
            What We Do
            <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={`mobile-submenu ${mobileWWD ? 'open' : ''}`}>
            <Link to="/what-we-do" style={{ color: 'var(--green)', fontWeight: 600 }}>Overview</Link>
            {divisions.map((div) => (
              <div key={div.id}>
                <h6>{div.shortName}</h6>
                {div.services.map((svc) => (
                  <Link key={svc.slug} to={`/what-we-do/${div.slug}/${svc.slug}`}>{svc.name}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mobile-menu-section">
          <Link to="/industries">Industries</Link>
        </div>
        <div className="mobile-menu-section">
          <Link to="/infrastructure">Infrastructure</Link>
        </div>
        <div className="mobile-menu-section">
          <Link to="/news">News</Link>
        </div>
        <div className="mobile-menu-section" style={{ paddingTop: 24 }}>
          <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Contact Us</Link>
        </div>
      </div>
    </>
  );
}
