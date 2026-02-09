import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { divisions } from '../data/divisions';
import logo from '../assets/logo.png';
import logoWhite from '../assets/logo-white.png';

/* ─── Hover-intent timing (ms) ─── */
const DELAY_IN = 80;
const DELAY_OUT = 220;

/* ─── Inline SVG helpers ─── */
const Chevron = () => (
  <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const ArrowSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

/* ─── Division icons for mega menu ─── */
const divIcons = {
  'engineering-design': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 20h20M5 20V9l7-5 7 5v11"/><rect x="9" y="13" width="6" height="7" rx="0.5"/><line x1="12" y1="9" x2="12" y2="11"/>
    </svg>
  ),
  'equipment-manufacturing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="6" width="18" height="12" rx="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="10" y1="3" x2="10" y2="6"/><line x1="14" y1="3" x2="14" y2="6"/>
    </svg>
  ),
  'corrosion-protection': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2C12 2 4 10 4 15a8 8 0 0016 0C20 10 12 2 12 2z"/><path d="M8 16a4 4 0 008 0" opacity="0.4"/>
    </svg>
  ),
  'rubber-products': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
    </svg>
  )
};

/* ─── About dropdown items ─── */
const aboutItems = [
  {
    to: '/about/our-story',
    name: 'Our Story',
    desc: '40+ years of heritage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>
      </svg>
    )
  },
  {
    to: '/about/jasmino-group',
    name: 'Jasmino Group',
    desc: 'Companies & structure',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a15 15 0 010 18 15 15 0 010-18"/>
      </svg>
    )
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWWD, setMobileWWD] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const location = useLocation();

  const wwdTimer = useRef(null);
  const aboutTimer = useRef(null);

  const anyOpen = megaOpen || aboutOpen;

  /* ─── Close everything ─── */
  const closeAll = useCallback(() => {
    clearTimeout(wwdTimer.current);
    clearTimeout(aboutTimer.current);
    setMegaOpen(false);
    setAboutOpen(false);
  }, []);

  /* ─── Route change → close ─── */
  useEffect(() => {
    closeAll();
    setMobileOpen(false);
    setMobileWWD(false);
    setMobileAbout(false);
  }, [location, closeAll]);

  /* ─── Scroll listener ─── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Escape key ─── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  /* ─── Body overflow lock for mobile ─── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ─── Resize: close desktop dropdowns below mobile breakpoint ─── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth <= 900) closeAll(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [closeAll]);

  /* ═══════════════════════════════════════════════════════
     HOVER-INTENT: What We Do (mega menu)
     ═══════════════════════════════════════════════════════ */
  const openMega = useCallback(() => {
    clearTimeout(wwdTimer.current);
    clearTimeout(aboutTimer.current);
    setAboutOpen(false);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
  }, []);

  const onWWDEnter = useCallback(() => {
    clearTimeout(wwdTimer.current);
    wwdTimer.current = setTimeout(openMega, DELAY_IN);
  }, [openMega]);

  const onWWDLeave = useCallback(() => {
    clearTimeout(wwdTimer.current);
    wwdTimer.current = setTimeout(closeMega, DELAY_OUT);
  }, [closeMega]);

  const onMegaEnter = useCallback(() => {
    clearTimeout(wwdTimer.current);
  }, []);

  const onMegaLeave = useCallback(() => {
    clearTimeout(wwdTimer.current);
    wwdTimer.current = setTimeout(closeMega, DELAY_OUT);
  }, [closeMega]);

  /* ═══════════════════════════════════════════════════════
     HOVER-INTENT: About (compact dropdown)
     ═══════════════════════════════════════════════════════ */
  const openAbout = useCallback(() => {
    clearTimeout(aboutTimer.current);
    clearTimeout(wwdTimer.current);
    setMegaOpen(false);
    setAboutOpen(true);
  }, []);

  const closeAbout = useCallback(() => {
    setAboutOpen(false);
  }, []);

  const onAboutEnter = useCallback(() => {
    clearTimeout(aboutTimer.current);
    aboutTimer.current = setTimeout(openAbout, DELAY_IN);
  }, [openAbout]);

  const onAboutLeave = useCallback(() => {
    clearTimeout(aboutTimer.current);
    aboutTimer.current = setTimeout(closeAbout, DELAY_OUT);
  }, [closeAbout]);

  /* ─── Mobile toggle ─── */
  const toggleMobile = () => setMobileOpen(v => !v);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileWWD(false);
    setMobileAbout(false);
  };

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  // Home and What We Do have white/light heroes; all other pages have dark heroes
  const isDarkHero = !['/', '/what-we-do'].includes(location.pathname);

  const navCls = ['nav'];
  if (scrolled) navCls.push('scrolled');
  if (anyOpen) navCls.push('mega-active');
  if (isDarkHero) navCls.push('nav-dark');

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className={navCls.join(' ')}>
        <div className="nav-inner">
          {/* Brand — two images, CSS toggles visibility */}
          <Link to="/" className="nav-brand" onClick={closeAll}>
            <img src={logo} alt="Jasmino" className="nav-logo nav-logo-dark" />
            <img src={logoWhite} alt="Jasmino" className="nav-logo nav-logo-white" />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            <li
              className={`nav-item${aboutOpen ? ' open' : ''}`}
              onMouseEnter={onAboutEnter}
              onMouseLeave={onAboutLeave}
            >
              <span className="nav-link" role="button" tabIndex={0}>
                About
                <Chevron />
              </span>
              {/* About dropdown (inside nav-item for hover zone) */}
              <div className="about-drop">
                {aboutItems.map((item, i) => (
                  <div key={item.to}>
                    {i > 0 && <div className="about-drop-divider" />}
                    <Link to={item.to} className="about-drop-item" onClick={closeAll}>
                      <div className="about-drop-icon">{item.icon}</div>
                      <div>
                        <div className="about-drop-name">{item.name}</div>
                        <div className="about-drop-desc">{item.desc}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </li>
            <li
              className={`nav-item${megaOpen ? ' open' : ''}`}
              onMouseEnter={onWWDEnter}
              onMouseLeave={onWWDLeave}
            >
              <span className="nav-link" role="button" tabIndex={0}>
                What We Do
                <Chevron />
              </span>
            </li>
            <li className="nav-item">
              <Link to="/industries" className="nav-link">Industries</Link>
            </li>
            <li className="nav-item">
              <Link to="/infrastructure" className="nav-link">Infrastructure</Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link">News</Link>
            </li>
          </ul>

          {/* Desktop CTA */}
          <Link to="/contact" className="nav-cta nav-cta-desktop" onClick={closeAll}>
            Contact Us
            <Arrow />
          </Link>

          {/* Burger */}
          <button
            className={`burger${mobileOpen ? ' active' : ''}`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </nav>

      {/* ─── MEGA MENU (full-width panel) ─── */}
      <div
        className={`mega-wrap${megaOpen ? ' open' : ''}`}
        onMouseEnter={onMegaEnter}
        onMouseLeave={onMegaLeave}
      >
        <div className="mega-panel">
          <div className="mega-inner">
            {/* Top bar */}
            <div className="mega-top">
              <span className="mega-top-title">Our Four Divisions</span>
              <Link to="/what-we-do" className="mega-overview-link" onClick={closeAll}>
                What We Do — Overview
                <ArrowSmall />
              </Link>
            </div>

            {/* 4-column grid */}
            <div className="mega-divisions">
              {divisions.map((div) => (
                <div className="mega-col" key={div.id}>
                  <Link
                    to={`/what-we-do/${div.slug}`}
                    className="mega-col-header"
                    onClick={closeAll}
                  >
                    <div className="mega-col-icon">
                      {divIcons[div.id]}
                    </div>
                    <div>
                      <div className="mega-col-num">Division {div.num}</div>
                      <div className="mega-col-name">{div.name}</div>
                    </div>
                  </Link>
                  {div.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/what-we-do/${div.slug}/${svc.slug}`}
                      className="mega-service"
                      onClick={closeAll}
                    >
                      <span className="mega-service-dot" />
                      <span className="mega-service-name">{svc.name}</span>
                      <span className="mega-service-arrow"><ArrowSmall /></span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Stat row */}
            <div className="mega-stat-row">
              <div className="mega-stat">
                <span className="mega-stat-num">12</span>
                <span className="mega-stat-label">Service Areas</span>
              </div>
              <div className="mega-stat-divider" />
              <div className="mega-stat">
                <span className="mega-stat-num">4</span>
                <span className="mega-stat-label">Integrated Divisions</span>
              </div>
              <div className="mega-stat-divider" />
              <div className="mega-stat">
                <span className="mega-stat-num">1</span>
                <span className="mega-stat-label">Point of Accountability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BACKDROP ─── */}
      <div
        className={`mega-backdrop${anyOpen ? ' active' : ''}`}
        onClick={closeAll}
      />

      {/* ─── MOBILE OVERLAY ─── */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-nav-inner">
          {/* About accordion */}
          <a
            className={`mobile-nav-link${mobileAbout ? ' active' : ''}`}
            onClick={(e) => { e.preventDefault(); setMobileAbout(v => !v); }}
            role="button"
          >
            About
            <Chevron />
          </a>
          <div className={`mobile-divisions${mobileAbout ? ' open' : ''}`}>
            <div className="mobile-divisions-inner">
              {aboutItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="mobile-service"
                  style={{ paddingLeft: 12 }}
                  onClick={closeMobile}
                >
                  <span className="mobile-service-dot" />
                  <span className="mobile-service-name" style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* What We Do accordion */}
          <a
            className={`mobile-nav-link${mobileWWD ? ' active' : ''}`}
            onClick={(e) => { e.preventDefault(); setMobileWWD(v => !v); }}
            role="button"
          >
            What We Do
            <Chevron />
          </a>
          <div className={`mobile-divisions${mobileWWD ? ' open' : ''}`}>
            <div className="mobile-divisions-inner">
              {divisions.map((div) => (
                <div className="mobile-div-group" key={div.id}>
                  <Link to={`/what-we-do/${div.slug}`} className="mobile-div-header" onClick={closeMobile}>
                    <span className="mobile-div-num">{div.num}</span>
                    <span className="mobile-div-name">{div.name}</span>
                  </Link>
                  {div.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/what-we-do/${div.slug}/${svc.slug}`}
                      className="mobile-service"
                      onClick={closeMobile}
                    >
                      <span className="mobile-service-dot" />
                      <span className="mobile-service-name">{svc.name}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Link to="/industries" className="mobile-nav-link" onClick={closeMobile}>Industries</Link>
          <Link to="/infrastructure" className="mobile-nav-link" onClick={closeMobile}>Infrastructure</Link>

          <Link to="/news" className="mobile-nav-link" onClick={closeMobile}>News</Link>

          <div className="mobile-nav-cta">
            <Link to="/contact" onClick={closeMobile}>
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="mobile-nav-footer">
            <span className="mobile-nav-footer-item">info@jasmino.com</span>
            <span className="mobile-nav-footer-item">+91 XXX XXX XXXX</span>
          </div>
        </div>
      </div>
    </>
  );
}
