import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import InsightsSection from '../components/InsightsSection.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function InsightsPage({ setCurrentPage, setSelectedArticleId }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="insights" setCurrentPage={setCurrentPage} />
      <main className="pt-24 sm:pt-28">
        <InsightsSection setCurrentPage={setCurrentPage} setSelectedArticleId={setSelectedArticleId} />
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={t.insightsPage.ctaTitlePrefix}
          titleHighlight={t.insightsPage.ctaTitleHighlight}
          description={t.insightsPage.ctaDesc}
          buttonText={t.insightsPage.ctaButton}
          pageTarget="find-space"
        />
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
