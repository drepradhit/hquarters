import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero({ setCurrentPage }) {
  const { t, language } = useLanguage();
  const isId = language === 'id';

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-white border-b border-slate-200/80 pt-20 sm:pt-28 md:pt-20 pb-10 sm:pb-16 md:pb-0">
      
      {/* Desktop Background: Clean split view with building on the right (hidden on mobile) */}
      <div className="hidden md:block absolute inset-x-0 bottom-0 top-20 sm:top-24 md:top-28 overflow-hidden pointer-events-none">
        <img
          src="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825"
          srcSet="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-640.webp?v=20260825 640w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-800.webp?v=20260825 800w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825 1536w"
          sizes="100vw"
          alt="HQuarters Building"
          fetchPriority="high"
          className="w-full h-full object-cover md:object-center scale-100 md:scale-115 md:translate-x-[6%] contrast-[1.18] saturate-[1.25] brightness-[0.98]"
        />

        {/* Desktop Gradient: Smooth transition from white to photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 via-38% via-white/20 via-62% to-transparent" />

        {/* Top protective fade */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-6 sm:py-16 md:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Mobile Luxury Location Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[#B86807] text-xs font-semibold mb-4 tracking-wide shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA8E18]" />
            <span>CBD Asia Afrika • Bandung</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-[32px] sm:text-5xl lg:text-[64px] font-medium text-slate-900 font-heading leading-[1.14] tracking-tight mb-4 sm:mb-6"
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <button
              id="btn-hero-explore-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-md shadow-orange-500/20 active:scale-98 transition-all duration-200 cursor-pointer text-center shrink-0"
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
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-800 text-slate-800 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98 shadow-xs"
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
            <div className="flex items-center gap-1 text-[#EA8E18] shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-slate-800 leading-snug">{t.hero.trusted}</span>
          </motion.div>

          {/* Mobile Dedicated Building Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="block md:hidden mt-7 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg shadow-slate-900/5 aspect-[16/10] bg-slate-100"
          >
            <img
              src="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-800.webp?v=20260825"
              alt="HQuarters Business Residence Building"
              className="w-full h-full object-cover object-center contrast-[1.08] saturate-[1.12]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-1.5 font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#EA8E18]" />
                <span>{isId ? '19 Lantai • Grade-A CBD Bandung' : '19 Floors • Grade-A CBD Bandung'}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
