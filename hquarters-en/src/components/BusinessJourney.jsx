import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function BusinessJourney({ setCurrentPage }) {
  const { t } = useLanguage();

  const journeys = [
    {
      id: 'virtual-office',
      category: t.journey.virtualOffice.cat,
      title: t.journey.virtualOffice.title,
      description: t.journey.virtualOffice.desc,
      page: 'space-virtual-office',
      cta: t.journey.virtualOffice.cta,
      image: '/SPACES/SERVICED OFFICE/6.webp?v=20260823',
    },
    {
      id: 'serviced-office',
      category: t.journey.servicedOffice.cat,
      title: t.journey.servicedOffice.title,
      description: t.journey.servicedOffice.desc,
      page: 'space-serviced-office',
      cta: t.journey.servicedOffice.cta,
      image: '/SPACES/SERVICED OFFICE/1.webp?v=20260823',
    },
    {
      id: 'soho',
      category: t.journey.soho.cat,
      title: t.journey.soho.title,
      description: t.journey.soho.desc,
      page: 'space-soho-duplex',
      cta: t.journey.soho.cta,
      image: '/SPACES/SOHO/SOHO 01.webp?v=20260823',
    },
    {
      id: 'premium-office',
      category: t.journey.premiumOffice.cat,
      title: t.journey.premiumOffice.title,
      description: t.journey.premiumOffice.desc,
      page: 'space-premium-office',
      cta: t.journey.premiumOffice.cta,
      image: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp?v=20260823',
    },
  ];

  return (
    <section id="business-journey" className="py-24 sm:py-32 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#EA8E18]">
            <span>{t.journey.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 font-heading tracking-tight leading-tight">
            <span>{t.journey.titlePrefix}</span><br />
            <span className="text-[#EA8E18]">{t.journey.titleHighlight}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            {t.journey.description}
          </p>
        </div>

        {/* Editorial Architecture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeys.map((item, index) => (
            <div
              key={item.id}
              id={`card-journey-${item.id}`}
              onClick={() => setCurrentPage && setCurrentPage(item.page)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-900/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Full-bleed Architectural Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Content Body: Product Name as the LARGEST headline below photo */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight group-hover:text-[#EA8E18] transition-colors">
                      {item.category}
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 font-mono tracking-wider shrink-0">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-[#EA8E18] leading-snug tracking-tight">
                    {item.title}
                  </p>

                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Clean Footer Link */}
              <div className="px-5 pb-5 pt-0">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-[#EA8E18] transition-colors pt-3 border-t border-slate-100">
                  <span>{item.cta}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#EA8E18] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
