import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Partners({ setCurrentPage }) {
  const { t } = useLanguage();

  const featuredPartners = [
    { name: 'Allianz', src: '/homepagelogobaru/GF allianz.webp?v=20260825', scale: 'scale-125' },
    { name: 'AXA', src: '/homepagelogobaru/7de axa.webp?v=20260825', scale: 'scale-130' },
    { name: 'MSIG', src: '/homepagelogobaru/9ef MSIG.webp?v=20260825', scale: 'scale-125' },
    { name: 'Mitsubishi', src: '/homepagelogobaru/7i mitsubishi.webp?v=20260825', scale: 'scale-135' },
    { name: 'Roche', src: '/homepagelogobaru/16j roche.webp?v=20260825', scale: 'scale-135' },
    { name: 'FWD', src: '/homepagelogobaru/6FGH fwd.webp?v=20260825', scale: 'scale-130' },
    { name: 'Avrist', src: '/homepagelogobaru/19r avrist.webp?v=20260825', scale: 'scale-130' },
    { name: 'DANA', src: '/homepagelogobaru/19 OP Dana-Logo.webp?v=20260825', scale: 'scale-130' },
    { name: 'HIS Travel', src: '/homepagelogobaru/UG his travel.webp?v=20260825', scale: 'scale-135' },
    { name: 'Henan Sekuritas', src: '/homepagelogobaru/16E henan sekuritas.webp?v=20260825', scale: 'scale-135' },
    { name: 'Huawei', src: '/homepagelogobaru/huawei.webp?v=20260825', scale: 'scale-125' },
    { name: 'Garuda TV', src: '/homepagelogobaru/GF B garuda.webp?v=20260825', scale: 'scale-115' },
  ];

  const handleCommunityClick = (e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage('companies');
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
            {t.partners.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-900 font-heading tracking-tight leading-tight">
            {t.partners.title}
          </h2>
        </div>

        
        {/* SOW Requirement: True Infinite Looping Marquee */}
        <div className="w-full overflow-hidden py-4 sm:py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-container">
            <div className="marquee-content gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14">
              {featuredPartners.map((brand, idx) => (
                <div
                  key={`track1-${brand.name}-${idx}`}
                  onClick={handleCommunityClick}
                  className="flex items-center justify-center h-28 sm:h-36 md:h-40 w-56 sm:w-72 md:w-80 shrink-0 px-2 cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={brand.src}
                    alt={brand.name}
                    className="h-24 sm:h-32 md:h-36 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] object-contain transition-opacity duration-300 opacity-95 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
            <div className="marquee-content gap-6 sm:gap-10 md:gap-14 pr-6 sm:pr-10 md:pr-14" aria-hidden="true">
              {featuredPartners.map((brand, idx) => (
                <div
                  key={`track2-${brand.name}-${idx}`}
                  onClick={handleCommunityClick}
                  className="flex items-center justify-center h-28 sm:h-36 md:h-40 w-56 sm:w-72 md:w-80 shrink-0 px-2 cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={brand.src}
                    alt={brand.name}
                    className="h-24 sm:h-32 md:h-36 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] object-contain transition-opacity duration-300 opacity-95 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="pt-2">
          <button
            id="btn-partners-explore-community"
            onClick={handleCommunityClick}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#EA8E18] hover:text-[#d88010] transition-colors group cursor-pointer"
          >
            <span>{t.partners.exploreBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
