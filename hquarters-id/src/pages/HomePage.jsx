import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';

// Below-the-fold components lazy loaded on idle / first scroll for instant initial paint
const BusinessJourney = lazy(() => import('../components/BusinessJourney.jsx'));
const AddressStatement = lazy(() => import('../components/AddressStatement.jsx'));
const Partners = lazy(() => import('../components/Partners.jsx'));
const BuildingHighlights = lazy(() => import('../components/BuildingHighlights.jsx'));
const CTA = lazy(() => import('../components/CTA.jsx'));
const Footer = lazy(() => import('../components/Footer.jsx'));

export default function HomePage({ setCurrentPage }) {
  const [loadBelowFold, setLoadBelowFold] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const trigger = () => setLoadBelowFold(true);

    // Load below-the-fold content after initial hero paint or immediately on first scroll
    const onScroll = () => {
      trigger();
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true, once: true });

    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(trigger, { timeout: 1500 });
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(trigger, 1200);
      return () => {
        window.removeEventListener('scroll', onScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="home" setCurrentPage={setCurrentPage} />
      <main className="flex-1 bg-white">
        <Hero setCurrentPage={setCurrentPage} />
        {loadBelowFold && (
          <Suspense fallback={null}>
            <BusinessJourney setCurrentPage={setCurrentPage} />
            <AddressStatement setCurrentPage={setCurrentPage} />
            <Partners setCurrentPage={setCurrentPage} />
            <BuildingHighlights setCurrentPage={setCurrentPage} />
            <CTA setCurrentPage={setCurrentPage} />
          </Suspense>
        )}
      </main>
      {loadBelowFold && (
        <Suspense fallback={null}>
          <Footer setCurrentPage={setCurrentPage} />
        </Suspense>
      )}
    </div>
  );
}
