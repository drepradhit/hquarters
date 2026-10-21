import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import BuildingSection from '../components/BuildingSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function BuildingPage({ setCurrentPage }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="building" setCurrentPage={setCurrentPage} />
      <main className="pt-24 sm:pt-28 flex-1 bg-white">
        <BuildingSection setCurrentPage={setCurrentPage} />
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={isId ? 'Sedang mencari ruang ' : 'Looking for space '}
          titleHighlight={isId ? 'untuk bisnis?' : 'for your business?'}
          description={isId ? 'Sampaikan jenis ruang yang Anda butuhkan. Tim HQuarters dapat membantu memberikan informasi tentang pilihan yang tersedia.' : ''}
          buttonText={isId ? 'Hubungi HQuarters' : t.buildingPage.ctaButton}
          pageTarget="find-space"
        />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
