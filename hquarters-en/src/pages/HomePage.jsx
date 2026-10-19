import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Partners from '../components/Partners.jsx';
import AddressStatement from '../components/AddressStatement.jsx';
import BusinessJourney from '../components/BusinessJourney.jsx';
import BuildingHighlights from '../components/BuildingHighlights.jsx';
import Features from '../components/Features.jsx';
import InteractiveDemo from '../components/InteractiveDemo.jsx';
import StatsSection from '../components/StatsSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage({ setCurrentPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="home" setCurrentPage={setCurrentPage} />
      <main>
        <Hero setCurrentPage={setCurrentPage} />
        <BusinessJourney setCurrentPage={setCurrentPage} />
        <AddressStatement setCurrentPage={setCurrentPage} />
        <Partners setCurrentPage={setCurrentPage} />
        <BuildingHighlights setCurrentPage={setCurrentPage} />
        
        
        
        <CTA setCurrentPage={setCurrentPage} />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
