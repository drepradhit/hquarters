import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-white border-b border-slate-200/80 pt-24 sm:pt-28 md:pt-20">
      
      {/* Background image constrained strictly below the navbar with high contrast */}
      <div className="absolute inset-x-0 bottom-0 top-20 sm:top-24 md:top-28 overflow-hidden pointer-events-none">
        <img
          src="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825"
          srcSet="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-640.webp?v=20260825 640w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-800.webp?v=20260825 800w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825 1536w"
          sizes="100vw"
          alt="HQuarters Building"
          fetchPriority="high"
          className="w-full h-full object-cover object-top md:object-center scale-100 md:scale-115 md:translate-x-[6%] contrast-[1.18] saturate-[1.25] brightness-[0.98]"
        />

        {/* Desktop Gradient: Smooth transition from white to photo */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/88 via-38% via-white/20 via-62% to-transparent" />

        {/* Top protective fade: Soft blend into the solid white navbar area */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-[2]" />

        {/* Mobile & Tablet Scrim */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-white via-white/90 via-55% to-white/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-12 sm:py-20 md:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-[64px] font-medium text-slate-900 font-heading leading-[1.12] tracking-tight mb-4 sm:mb-6"
          >
            {t.hero.titlePrefix} <span className="text-[#EA8E18]"><br/>{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-lg leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 max-w-xs sm:max-w-none"
          >
            <button
              id="btn-hero-explore-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-hero-visit"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('find-space');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-800 text-slate-800 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98 shadow-xs"
            >
              {t.hero.visitBtn}
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium"
          >
            <div className="flex items-center gap-1 text-[#EA8E18]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="truncate sm:overflow-visible font-semibold text-slate-800">{t.hero.trusted}</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
