import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import CompaniesSection from '../components/CompaniesSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CompaniesPage({ setCurrentPage }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="companies" setCurrentPage={setCurrentPage} />
      <main className="pt-24 sm:pt-28 flex-1 bg-white">
        <CompaniesSection setCurrentPage={setCurrentPage} />
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={t.companiesPage?.ctaTitlePrefix || 'Your Company Belongs '}
          titleHighlight={t.companiesPage?.ctaTitleHighlight || 'In Good Company.'}
          description=""
          buttonText={t.companiesPage?.ctaButton || 'Find Your Space'}
          pageTarget="find-space"
        />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
