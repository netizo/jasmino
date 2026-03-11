import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AssetManager from './components/AssetManager';

const WhatWeDoPage = lazy(() => import('./pages/WhatWeDoPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DivisionLanding = lazy(() => import('./pages/DivisionLanding'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const JasminoGroupPage = lazy(() => import('./pages/JasminoGroupPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const DesignComparison = lazy(() => import('./pages/DesignComparison'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // Disable browser scroll restoration so it doesn't fight us
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // 'instant' overrides CSS scroll-behavior: smooth so it jumps immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Repeat after a frame so lazy-loaded content doesn't shift us back down
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  useEffect(() => {
    // Refresh ScrollTrigger after lazy components have mounted.
    // Single rAF is too early — lazy chunks need time to load & render.
    // Staggered refreshes cover both fast and slow loads.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 800);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 2500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/what-we-do/:divisionSlug" element={<DivisionLanding />} />
          <Route path="/what-we-do/:divisionSlug/:serviceSlug" element={<ServicePage />} />
          <Route path="/about/our-story" element={<AboutPage />} />
          <Route path="/about/jasmino-group" element={<JasminoGroupPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:caseId" element={<CaseStudyDetail />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/design-comparison" element={<DesignComparison />} />
        </Routes>
      </Suspense>
      <Footer />
      {/* DEV ONLY — remove when done managing assets */}
      <AssetManager />
    </>
  );
}
