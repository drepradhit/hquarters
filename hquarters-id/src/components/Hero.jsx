import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] md:h-auto md:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950 md:bg-white border-b-0 md:border-b border-slate-200/80 pt-20 sm:pt-28 md:pt-20 pb-8 sm:pb-12 md:pb-0">
      
      {/* Background image: full-screen dimmed on mobile, strictly below navbar on desktop */}
      <div className="absolute inset-0 md:top-28 overflow-hidden pointer-events-none">
        <img
          src="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825"
          srcSet="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-640.webp?v=20260825 640w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-800.webp?v=20260825 800w, /BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-1536.webp?v=20260825 1536w"
          sizes="100vw"
          alt="HQuarters Building"
          fetchPriority="high"
          className="w-full h-full object-cover object-top md:object-center scale-100 md:scale-115 md:translate-x-[6%] contrast-[1.05] md:contrast-[1.18] saturate-[1.1] md:saturate-[1.25] brightness-[0.88] md:brightness-[0.98]"
        />

        {/* Desktop Gradient: Smooth transition from white to photo */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white via-white/88 via-38% via-white/20 via-62% to-transparent" />

        {/* Top protective fade for Desktop */}
        <div className="hidden md:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-[2]" />

        {/* Mobile Dimmed Scrim: Soft elegant dark tint ensuring crystal-clear text contrast across full mobile viewport */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 via-55% to-slate-950/35 pointer-events-none" />

        {/* Mobile top gradient blend: Seamless fade from white navbar area into dimmed photo */}
        <div className="md:hidden absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white via-white/40 via-45% to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-6 sm:py-20 md:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Main Headline (compact on mobile, expansive on desktop) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-[27px] sm:text-4xl md:text-5xl lg:text-[64px] font-medium text-white md:text-slate-900 font-heading leading-[1.16] tracking-tight mb-3 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] md:drop-shadow-none"
          >
            {t.hero.titlePrefix} <span className="text-[#FBA93C] md:text-[#EA8E18]"><br/>{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-slate-100 md:text-slate-600 text-[13px] sm:text-base md:text-lg leading-relaxed font-normal mb-3 sm:mb-4 max-w-sm md:max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] md:drop-shadow-none"
          >
            {t.hero.description}
          </motion.p>

          {/* Punchy Hero Tagline */}
          {t.hero.tagline && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="font-bold text-[#FBA93C] md:text-[#EA8E18] text-sm sm:text-base md:text-lg mb-5 sm:mb-8 drop-shadow-xs md:drop-shadow-none"
            >
              {t.hero.tagline}
            </motion.p>
          )}

          {/* CTA Buttons (sleeker, more proportional padding on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8 max-w-[300px] sm:max-w-none"
          >
            <button
              id="btn-hero-explore-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-xs sm:text-base shadow-lg shadow-orange-500/25 active:scale-98 transition-all duration-200 cursor-pointer text-center shrink-0"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            {t.hero.visitBtn?.toLowerCase().includes('whatsapp') ? (
              <a
                id="btn-hero-whatsapp"
                href="https://wa.me/628111908319?text=Halo%20HQuarters%20Bandung%2C%20saya%20ingin%20berkonsultasi%20mengenai%20ruang%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/15 md:bg-white hover:bg-white/25 md:hover:bg-slate-50 border border-white/30 md:border-slate-300 hover:border-white md:hover:border-slate-800 text-white md:text-slate-800 font-semibold text-xs sm:text-base backdrop-blur-md md:backdrop-blur-none transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98 shadow-xs"
              >
                <span>{t.hero.visitBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80" />
              </a>
            ) : (
              <button
                id="btn-hero-visit"
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('find-space');
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center justify-center px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/15 md:bg-white hover:bg-white/25 md:hover:bg-slate-50 border border-white/30 md:border-slate-300 hover:border-white md:hover:border-slate-800 text-white md:text-slate-800 font-semibold text-xs sm:text-base backdrop-blur-md md:backdrop-blur-none transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98 shadow-xs"
              >
                {t.hero.visitBtn}
              </button>
            )}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-slate-200 md:text-slate-700 font-medium"
          >
            <div className="flex items-center gap-1 text-[#FBA93C] md:text-[#EA8E18] shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              ))}
            </div>
            <span className="font-medium text-slate-100 md:text-slate-800 leading-snug drop-shadow-xs md:drop-shadow-none">{t.hero.trusted}</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
