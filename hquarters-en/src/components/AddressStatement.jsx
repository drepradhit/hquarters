import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AddressStatement({ setCurrentPage }) {
  const { t } = useLanguage();

  const handleLocationClick = (e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage('location');
      window.scrollTo(0, 0);
    }
  };

  return (
    <section id="address-statement" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] inline-block">
            {t.address.badge}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-slate-900 font-heading tracking-tight leading-[1.15]">
            {t.address.titlePrefix} <br className="hidden md:inline" />
            <span className="text-[#B45309]">{t.address.titleHighlight}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.address.desc}
          </p>

          <div className="pt-2">
            <button
              id="btn-address-explore"
              onClick={handleLocationClick}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#B45309] hover:text-[#92400e] transition-colors group cursor-pointer"
            >
              <span>{t.address.exploreBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3.5"
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-900 aspect-[16/9] sm:aspect-[21/9] group">
            <img loading="lazy"
              src="/addressstatement/21;9.webp?v=20260825"
              alt="HQuarters Business Residence Asia Afrika"
              className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
            />

            {/* Desktop Overlay (hidden on mobile) */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent hidden sm:flex items-end p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA8E18] animate-pulse" />
                  <span className="text-xs sm:text-sm font-extrabold tracking-wide sm:tracking-wider font-heading uppercase leading-tight">
                    {t.address.buildingLabel}
                  </span>
                </div>
                <button
                  id="btn-address-view-location"
                  onClick={handleLocationClick}
                  className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-slate-900 font-bold text-xs uppercase tracking-wider transition-all self-start sm:self-auto shadow-md hover:scale-105 cursor-pointer"
                >
                  {t.address.viewLocationBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Info & View Map Button BELOW the photo */}
          <div className="sm:hidden flex flex-col gap-2.5 px-0.5 pt-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EA8E18] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold tracking-wider font-heading uppercase text-slate-700">
                {t.address.buildingLabel}
              </span>
            </div>
            <button
              id="btn-address-view-location-mobile"
              onClick={handleLocationClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer text-center"
            >
              <span>{t.address.viewLocationBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EA8E18]" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl sm:rounded-[44px] p-8 sm:p-14 lg:p-16 bg-white text-center max-w-4xl mx-auto space-y-4"
        >
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-5xl font-medium text-slate-900 font-heading tracking-tight leading-tight">
              {t.address.closingTitlePrefix} <br /><span className="text-[#B45309]">{t.address.closingTitleHighlight}</span>
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              {t.address.closingStatement}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
