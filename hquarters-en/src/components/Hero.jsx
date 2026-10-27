import React from "react";
import { Star, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

function Hero({ setCurrentPage }) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] md:h-auto md:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950 md:bg-white border-b-0 md:border-b border-slate-200/80 pt-20 sm:pt-28 md:pt-20 pb-8 sm:pb-12 md:pb-0">
      
      {/* Background image: full-screen dimmed on mobile, strictly below navbar on desktop */}
      <div className="absolute inset-0 md:top-28 overflow-hidden pointer-events-none">
        <img
          src="https://hquarters.co.id/BUILDING/hero-building-1536.webp?v=20260825"
          srcSet="https://hquarters.co.id/BUILDING/hero-building-640.webp?v=20260825 640w, https://hquarters.co.id/BUILDING/hero-building-800.webp?v=20260825 800w, https://hquarters.co.id/BUILDING/hero-building-1536.webp?v=20260825 1536w"
          sizes="100vw"
          alt="HQuarters Building"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="1536"
          height="1024"
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
          
          {/* Main Headline (Instant Zero-Delay Paint for 95+ LCP score) */}
          <h1
            className="text-[25px] sm:text-3xl md:text-5xl lg:text-[58px] font-medium text-white md:text-slate-900 font-heading leading-[1.18] tracking-tight mb-3 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] md:drop-shadow-none"
          >
            {t.hero.headlineParts ? (
              t.hero.headlineParts.map((part, idx) => {
                if (part.br) return <br key={idx} />;
                if (part.isOrange) {
                  return (
                    <span key={idx} className="text-[#FBA93C] md:text-[#EA8E18]">
                      {part.text}
                    </span>
                  );
                }
                return <span key={idx}>{part.text}</span>;
              })
            ) : (
              <>
                {t.hero.titlePrefix} <span className="text-[#FBA93C] md:text-[#EA8E18]"><br/>{t.hero.titleHighlight}</span>
              </>
            )}
          </h1>

          {/* Subtitle Description */}
          <p
            className="text-slate-100 md:text-slate-600 text-[13px] sm:text-base md:text-lg leading-relaxed font-normal mb-3 sm:mb-4 max-w-sm md:max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] md:drop-shadow-none"
          >
            {t.hero.description}
          </p>

          {/* Punchy Hero Tagline */}
          {t.hero.tagline && (
            <p
              className="font-bold text-[#FBA93C] md:text-[#EA8E18] text-sm sm:text-base md:text-lg mb-5 sm:mb-8 drop-shadow-xs md:drop-shadow-none"
            >
              {t.hero.tagline}
            </p>
          )}

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8 max-w-[300px] sm:max-w-none"
          >
            <button
              id="btn-hero-explore-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage("spaces");
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-xs sm:text-base shadow-lg shadow-orange-500/25 active:scale-98 transition-all duration-200 cursor-pointer text-center shrink-0"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            {t.hero.visitBtn?.toLowerCase().includes("whatsapp") ? (
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
                  if (setCurrentPage) setCurrentPage("find-space");
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center justify-center px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/15 md:bg-white hover:bg-white/25 md:hover:bg-slate-50 border border-white/30 md:border-slate-300 hover:border-white md:hover:border-slate-800 text-white md:text-slate-800 font-semibold text-xs sm:text-base backdrop-blur-md md:backdrop-blur-none transition-all duration-200 cursor-pointer text-center shrink-0 active:scale-98 shadow-xs"
              >
                {t.hero.visitBtn}
              </button>
            )}
          </div>

          {/* Social Proof */}
          <div
            className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-slate-200 md:text-slate-700 font-medium"
          >
            <div className="flex -space-x-1 sm:-space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-400/90 md:bg-amber-100 border border-white/40 md:border-white flex items-center justify-center text-amber-900 md:text-amber-600 shadow-xs">
                  <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" />
                </div>
              ))}
            </div>
            <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] md:drop-shadow-none">
              {t.hero.socialProof}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);
