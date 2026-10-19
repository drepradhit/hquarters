import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import LocationSection from '../components/LocationSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LocationPage({ setCurrentPage }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="location" setCurrentPage={setCurrentPage} />
      <main className="pt-24 sm:pt-28">
        <LocationSection setCurrentPage={setCurrentPage} />
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={t.locationPage?.ctaTitlePrefix || 'A Better Business Address '}
          titleHighlight={t.locationPage?.ctaTitleHighlight || 'Starts With Location.'}
          description=""
          buttonText={t.locationPage?.ctaButton || 'Get Directions & Contact'}
          pageTarget="find-space"
        />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
