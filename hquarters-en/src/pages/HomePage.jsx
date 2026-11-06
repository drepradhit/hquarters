import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { usePageBlocks } from '../hooks/usePageBlocks.js';

// Below-the-fold components lazy loaded on idle / first scroll for instant initial paint
const BusinessJourney = lazy(() => import('../components/BusinessJourney.jsx'));
const AddressStatement = lazy(() => import('../components/AddressStatement.jsx'));
const Partners = lazy(() => import('../components/Partners.jsx'));
const BuildingHighlights = lazy(() => import('../components/BuildingHighlights.jsx'));
const CTA = lazy(() => import('../components/CTA.jsx'));
const Footer = lazy(() => import('../components/Footer.jsx'));

export default function HomePage({ setCurrentPage }) {
  const [loadBelowFold, setLoadBelowFold] = useState(false);
  const { cms, language } = useLanguage();
  const slug = language === 'en' ? 'home-en' : 'hquarters-home';
  const { blocks } = usePageBlocks(slug);

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
      const handle = window.requestIdleCallback(trigger, { timeout: 2500 });
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(trigger, 2200);
      return () => {
        window.removeEventListener('scroll', onScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const renderSectionBlock = (block, idx) => {
    switch (block.name) {
      case 'hq/business-journey':
        return <BusinessJourney key={idx} setCurrentPage={setCurrentPage} {...block.attrs} />;
      case 'hq/address-statement':
        return <AddressStatement key={idx} setCurrentPage={setCurrentPage} {...block.attrs} />;
      case 'hq/partners':
        if (block.attrs?.enabled === false || cms?.sec_partners_enabled === '0') return null;
        return <Partners key={idx} setCurrentPage={setCurrentPage} {...block.attrs} />;
      case 'hq/building-highlights':
        if (block.attrs?.enabled === false || cms?.sec_highlights_enabled === '0') return null;
        return <BuildingHighlights key={idx} setCurrentPage={setCurrentPage} {...block.attrs} />;
      case 'hq/cta':
        if (cms?.sec_cta_enabled === '0') return null;
        return (
          <CTA
            key={idx}
            setCurrentPage={setCurrentPage}
            titlePrefix={block.attrs?.titlePrefix}
            titleHighlight={block.attrs?.titleHighlight}
            description={block.attrs?.description}
            buttonText={block.attrs?.buttonText}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="home" setCurrentPage={setCurrentPage} />
      <main className="flex-1 bg-white">
        <Hero setCurrentPage={setCurrentPage} />
        {loadBelowFold && (
          <Suspense fallback={null}>
            {blocks && blocks.length > 0 ? (
              blocks.map(renderSectionBlock)
            ) : (
              <>
                <BusinessJourney setCurrentPage={setCurrentPage} />
                <AddressStatement setCurrentPage={setCurrentPage} />
                {cms?.sec_partners_enabled !== '0' && <Partners setCurrentPage={setCurrentPage} />}
                {cms?.sec_highlights_enabled !== '0' && <BuildingHighlights setCurrentPage={setCurrentPage} />}
                {cms?.sec_cta_enabled !== '0' && <CTA setCurrentPage={setCurrentPage} />}
              </>
            )}
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
