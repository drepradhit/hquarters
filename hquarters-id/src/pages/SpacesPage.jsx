import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import SpacesSection from '../components/SpacesSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SpacesPage({ setCurrentPage }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="spaces" setCurrentPage={setCurrentPage} />
      <main className="pt-24 sm:pt-28">
        <SpacesSection setCurrentPage={setCurrentPage} />
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={t.spacesHub?.ctaTitlePrefix || 'Ready to Claim Your '}
          titleHighlight={t.spacesHub?.ctaTitleHighlight || 'Ideal Workspace?'}
          description={t.spacesHub?.ctaDesc || 'Whether you need a prestigious virtual address, a turnkey serviced desk, a SOHO, or a premium corporate floor — our team is ready to guide your selection.'}
          buttonText={t.spacesHub?.ctaButton || 'Schedule a Private Tour'}
          pageTarget="find-space"
        />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
