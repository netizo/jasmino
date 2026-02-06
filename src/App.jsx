import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatWeDoOverview from './pages/WhatWeDoOverview';
import DivisionLanding from './pages/DivisionLanding';
import ServicePage from './pages/ServicePage';
import InnerPage from './pages/InnerPage';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-we-do" element={<WhatWeDoOverview />} />
        <Route path="/what-we-do/:divisionSlug" element={<DivisionLanding />} />
        <Route path="/what-we-do/:divisionSlug/:serviceSlug" element={<ServicePage />} />
        <Route path="/about/our-story" element={<InnerPage page="our-story" />} />
        <Route path="/about/jasmino-group" element={<InnerPage page="jasmino-group" />} />
        <Route path="/industries" element={<InnerPage page="industries" />} />
        <Route path="/infrastructure" element={<InnerPage page="infrastructure" />} />
        <Route path="/news" element={<InnerPage page="news" />} />
        <Route path="/contact" element={<InnerPage page="contact" />} />
      </Routes>
      <Footer />
    </>
  );
}
