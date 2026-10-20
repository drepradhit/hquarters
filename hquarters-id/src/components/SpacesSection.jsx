import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SpacesSection({ setCurrentPage }) {
  const { t } = useLanguage();

  const spacesConfig = [
    {
      id: 'soho',
      pageTarget: 'space-soho-duplex',
      badge: 'SOHO',
      isPopular: true,
      image: '/SPACES/SOHO/SOHO 01.webp?v=20260825',
    },
    {
      id: 'premium',
      pageTarget: 'space-premium-office',
      badge: 'PREMIUM OFFICE',
      image: '/SPACES/PREMIUM OFFICE/Premium Office.webp?v=20260825',
    },
    {
      id: 'serviced',
      pageTarget: 'space-serviced-office',
      badge: 'SERVICED OFFICE',
      image: '/SPACES/SERVICED OFFICE/1.webp?v=20260825',
    },
    {
      id: 'virtual',
      pageTarget: 'space-virtual-office',
      badge: 'VIRTUAL OFFICE',
      image: '/SPACES/SERVICED OFFICE/6.webp?v=20260825',
    },
  ];

  const handleGoToDetail = (pageTarget) => {
    if (setCurrentPage && pageTarget) {
      setCurrentPage(pageTarget);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section id="spaces" className="pt-4 sm:pt-6 pb-16 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 font-heading tracking-tight leading-[1.15]">
            {t.spacesHub.titlePrefix} <br />
            <span className="text-[#EA8E18]">{t.spacesHub.titleHighlight}</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {t.spacesHub.description}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            {spacesConfig.map((space) => {
              const cardData = t.spacesHub.cards?.[space.id] || {};
              const title = cardData.title || '';
              const desc = cardData.desc || '';
              const bestFor = cardData.bestFor || '';
              const ctaText = cardData.cta || `${t.spacesHub.explorePrefix || 'Jelajahi'} ${space.badge}`;

              return (
                <div
                  key={space.id}
                  id={`card-space-${space.id}`}
                  onClick={() => handleGoToDetail(space.pageTarget)}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-[#EA8E18]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  <div>
                    {/* Clean Architectural Photo - Compact aspect ratio */}
                    <div className="relative aspect-[16/9] max-h-[250px] sm:max-h-[280px] w-full overflow-hidden bg-slate-100">
                      <img 
                        loading="lazy"
                        src={space.image}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
                    </div>

                    {/* Content Body: Product Name as the largest headline */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl sm:text-2xl lg:text-[26px] font-semibold font-heading text-slate-900 group-hover:text-[#EA8E18] tracking-tight transition-colors">
                          {space.badge}
                        </h2>
                        {space.isPopular && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shrink-0 shadow-xs">
                            {t.spacesHub.popularTag || 'TERPOPULER'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-[15px] font-medium text-slate-700 leading-snug">
                        {title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal line-clamp-2">
                        {desc}
                      </p>

                      <div className="pt-2.5 border-t border-slate-100 text-[11px] sm:text-xs leading-relaxed text-slate-500">
                        <span className="font-semibold text-slate-700">{t.spacesHub.bestFor} </span>
                        <span className="text-slate-600">{bestFor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Bottom Action Bar */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#EA8E18] transition-colors pt-2.5 border-t border-slate-100">
                      <span>{ctaText}</span>
                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#EA8E18] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
