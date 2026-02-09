import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const WhatWeDoPage = lazy(() => import('./pages/WhatWeDoPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DivisionLanding = lazy(() => import('./pages/DivisionLanding'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const InnerPage = lazy(() => import('./pages/InnerPage'));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
          <Route path="/about/jasmino-group" element={<InnerPage page="jasmino-group" />} />
          <Route path="/industries" element={<InnerPage page="industries" />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/news" element={<InnerPage page="news" />} />
          <Route path="/contact" element={<InnerPage page="contact" />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
