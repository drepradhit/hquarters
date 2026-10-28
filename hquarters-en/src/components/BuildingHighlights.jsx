import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoogleIcon from './GoogleIcon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function BuildingHighlights({ setCurrentPage }) {
  const { t } = useLanguage();

  const handleHighlightClick = (page = 'building', anchor) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      if (anchor) {
        setTimeout(() => {
          const elem = document.querySelector(anchor);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const highlights = [
    {
      id: 'premium-arrival',
      title: t.highlights.items.arrival.title,
      desc: t.highlights.items.arrival.desc,
      iconName: 'corporate_fare',
      targetPage: 'building',
      targetAnchor: '#infrastructure',
    },
    {
      id: 'business-ready',
      title: t.highlights.items.business.title,
      desc: t.highlights.items.business.desc,
      iconName: 'business_center',
      targetPage: 'building',
      targetAnchor: '#infrastructure',
    },
    {
      id: 'security',
      title: t.highlights.items.security.title,
      desc: t.highlights.items.security.desc,
      iconName: 'verified_user',
      targetPage: 'building',
      targetAnchor: '#security',
    },
    {
      id: 'easy-parking',
      title: t.highlights.items.parking.title,
      desc: t.highlights.items.parking.desc,
      iconName: 'local_parking',
      targetPage: 'building',
      targetAnchor: '#parking',
    },
    {
      id: 'health-wellness',
      title: t.highlights.items.wellness.title,
      desc: t.highlights.items.wellness.desc,
      iconName: 'fitness_center',
      targetPage: 'building',
      targetAnchor: '#building-amenities',
    },
    {
      id: 'connected',
      title: t.highlights.items.connected.title,
      desc: t.highlights.items.connected.desc,
      iconName: 'near_me',
      targetPage: 'location',
      targetAnchor: null,
    },
  ];

  return (
    <section id="building-highlights" className="py-24 sm:py-32 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] inline-block">
            {t.highlights.badge}
          </span>

          <h2 className="text-4xl sm:text-5xl font-medium text-slate-900 font-heading tracking-tight">
            {t.highlights.titlePrefix} <br />
            <span className="text-[#B45309]">{t.highlights.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-[#EA8E18] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => handleHighlightClick(item.targetPage, item.targetAnchor)}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#EA8E18] border border-amber-500/20 flex items-center justify-center group-hover:bg-[#EA8E18] group-hover:border-[#EA8E18] group-hover:text-white transition-all duration-300 mb-6 shadow-2xs">
                  <GoogleIcon name={item.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-medium text-slate-900 font-heading group-hover:text-[#E8860B] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#B45309] group-hover:text-[#92400e]">
                <span>{t.highlights.featureLink}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            id="btn-building-highlights-explore"
            onClick={() => handleHighlightClick('building')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#B45309] hover:text-[#92400e] transition-colors group cursor-pointer"
          >
            <span>{t.highlights.exploreBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
