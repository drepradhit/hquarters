import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function BuildingSection({ setCurrentPage }) {
  const { t, language } = useLanguage();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const thumbContainerRef = useRef(null);

  const gallerySources = [
    { src: '/BUILDING/gym 5_4.webp', category: 'gym' },
    { src: '/BUILDING/sauna 5_4 new.webp?v=20260824', category: 'sauna' },
    { src: '/BUILDING/kolam renang 5_4 new.webp?v=20260824', category: 'pool' },
    { src: '/BUILDING/lounge.webp?v=20260824', category: 'lounge' },
    { src: '/BUILDING/teras-g.webp?v=20260824', category: 'terrace' },
    { src: '/BUILDING/teras-ug.webp?v=20260824', category: 'terrace' },
  ];

  const wellnessGallery = gallerySources.map((item, idx) => ({
    ...item,
    title: t.buildingPage?.gallery?.[idx]?.title || '',
    categoryLabel: t.buildingPage?.gallery?.[idx]?.categoryLabel || '',
    desc: t.buildingPage?.gallery?.[idx]?.desc || '',
  }));

  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImgIndex((prev) => (prev === 0 ? wellnessGallery.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev === wellnessGallery.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, wellnessGallery.length]);

  // Smooth, non-blinking auto-play with pause on hover
  useEffect(() => {
    if (isLightboxOpen || isPaused) return;
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % wellnessGallery.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isLightboxOpen, isPaused, wellnessGallery.length]);

  useEffect(() => {
    if (thumbContainerRef.current) {
      const container = thumbContainerRef.current;
      const activeThumb = container.children[activeImgIndex];
      if (activeThumb) {
        const leftPos = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
        container.scrollTo({ left: leftPos, behavior: 'smooth' });
      }
    }
  }, [activeImgIndex]);

  const buildingFeatures = [
    {
      id: 'infrastructure',
      badge: language === 'en' ? 'Infrastructure & Arrival' : 'Infrastruktur & Akses',
      title: (t.buildingPage?.infrastructure?.titlePrefix || '') + (t.buildingPage?.infrastructure?.titleHighlight || ''),
      titleAccented: <>{t.buildingPage?.infrastructure?.titlePrefix}<span className="text-[#EA8E18]">{t.buildingPage?.infrastructure?.titleHighlight}</span></>,
      description: null,
      items: t.buildingPage?.infrastructure?.items || [],
      image: '/BUILDING/lobby-utama.webp?v=20260824',
      imageLeft: false,
    },
    {
      id: 'security',
      badge: language === 'en' ? 'Security & Engineering' : 'Keamanan & Rekayasa',
      title: (t.buildingPage?.security?.titlePrefix || '') + (t.buildingPage?.security?.titleHighlight || ''),
      titleAccented: <>{t.buildingPage?.security?.titlePrefix}<span className="text-[#EA8E18]">{t.buildingPage?.security?.titleHighlight}</span></>,
      description: null,
      items: t.buildingPage?.security?.items || [],
      footnote: t.buildingPage?.security?.footnote || '',
      image: '/BUILDING/security-new.webp?v=20260824',
      imageLeft: true,
    },
    {
      id: 'parking',
      badge: language === 'en' ? 'Automated Mechanical Parking' : 'Parkir Mekanikal Otomatis',
      title: (t.buildingPage?.parking?.titlePrefix || '') + (t.buildingPage?.parking?.titleHighlight || ''),
      titleAccented: <>{t.buildingPage?.parking?.titlePrefix}<span className="text-[#EA8E18]">{t.buildingPage?.parking?.titleHighlight}</span></>,
      description: t.buildingPage?.parking?.desc || '',
      items: [],
      image: '/LOGO/parking-lift.webp?v=20260825',
      imageLeft: false,
    },
    {
      id: 'wellness',
      badge: language === 'en' ? 'Wellness & Facilities' : 'Fasilitas & Gaya Hidup',
      title: (t.buildingPage?.wellness?.titlePrefix || '') + (t.buildingPage?.wellness?.titleHighlight || ''),
      titleAccented: <>{t.buildingPage?.wellness?.titlePrefix}<span className="text-[#EA8E18]">{t.buildingPage?.wellness?.titleHighlight}</span></>,
      description: '',
      items: t.buildingPage?.wellness?.items || [],
      image: '/BUILDING/teras-ug.webp?v=20260824',
      imageLeft: true,
    },
  ];

  return (
    <section id="building" className="pt-4 sm:pt-6 pb-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        
        
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-slate-900 font-heading tracking-tight leading-[1.12]">
            <span>{t.buildingPage.heroTitlePrefix}</span><br />
            <span className="text-[#EA8E18]">{t.buildingPage.heroTitleHighlight}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
            {t.buildingPage.heroDesc}
          </p>
        </div>

        
        
        
        {/* Building Feature Cards - Clean Architectural Design */}
        <div className="space-y-10 sm:space-y-12">
          {buildingFeatures.map((block) => (
            <div
              key={block.id}
              id={block.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 hover:border-[#EA8E18]/40 shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center group/card scroll-mt-28"
            >
              <div className={`lg:col-span-6 ${block.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] bg-slate-900">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover object-bottom group-hover/card:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover/card:opacity-10 transition-opacity" />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-5 ${block.imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-[#EA8E18] uppercase tracking-wider inline-block">
                    {block.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 leading-[1.18] tracking-tight">
                    {block.titleAccented}
                  </h2>
                  {block.description && (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
                      {block.description}
                    </p>
                  )}
                </div>

                {block.items.length > 0 && (
                  <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA8E18] shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-slate-700 group-hover/item:text-[#EA8E18] transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {block.footnote && (
                  <div className="pt-3 border-t border-slate-100">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5">
                      <span className="w-1 h-5 bg-[#EA8E18] rounded-full shrink-0 inline-block" />
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">
                        {block.footnote}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Facilities Gallery Card - Clean Architectural Design */}
        <div id="building-amenities" className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 space-y-6 shadow-xs scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#EA8E18] uppercase tracking-wider inline-block">
                {language === 'en' ? 'Building Facilities' : 'Fasilitas Gedung'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                {wellnessGallery[activeImgIndex]?.title || (language === 'en' ? 'Facilities' : 'Fasilitas')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md sm:text-right font-normal">
              {wellnessGallery[activeImgIndex]?.desc}
            </p>
          </div>

          <div className="relative">
            {/* Main Image with zero-blink layered crossfade */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 group shadow-md"
            >
              {wellnessGallery.map((img, idx) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                    idx === activeImgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                />
              ))}

              <button
                id="btn-building-gallery-prev"
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? wellnessGallery.length - 1 : prev - 1))}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all z-20 cursor-pointer shadow-md"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                id="btn-building-gallery-next"
                onClick={() => setActiveImgIndex((prev) => (prev === wellnessGallery.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all z-20 cursor-pointer shadow-md"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                {wellnessGallery.map((_, idx) => (
                  <button
                    key={idx}
                    id={`btn-building-gallery-dot-${idx}`}
                    onClick={() => setActiveImgIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeImgIndex ? 'bg-white w-6 shadow-md' : 'bg-white/50 hover:bg-white/80 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-start mt-4 sm:mt-5">
              <div ref={thumbContainerRef} className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-none no-scrollbar pb-2 pt-1 max-w-full">
                {wellnessGallery.map((img, idx) => (
                  <button
                    key={idx}
                    id={`btn-building-gallery-thumb-${idx}`}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      idx === activeImgIndex
                        ? 'border-[#EA8E18] opacity-100 ring-2 ring-[#EA8E18]/30 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        {isLightboxOpen && createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 text-white h-screen w-screen overflow-hidden"
            >
              
              <div className="flex items-center justify-between max-w-[1440px] w-full mx-auto">
                <div className="space-y-0.5">
                  <span className="text-xs text-[#EA8E18] font-bold uppercase tracking-wider">
                    HQuarters Building Facilities
                  </span>
                  <div className="text-sm font-semibold text-slate-300">
                    {activeImgIndex + 1} / {wellnessGallery.length} — {wellnessGallery[activeImgIndex].title}
                  </div>
                </div>

                <button
                  id="btn-building-lightbox-close"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-3 rounded-full bg-white/10 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              
              <div className="relative max-w-[1200px] w-full mx-auto my-auto flex items-center justify-center h-[72vh]">
                <img loading="lazy"
                  src={wellnessGallery[activeImgIndex].src}
                  alt={wellnessGallery[activeImgIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />

                
                <button
                  id="btn-building-lightbox-prev"
                  onClick={() => setActiveImgIndex((prev) => (prev === 0 ? wellnessGallery.length - 1 : prev - 1))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-building-lightbox-next"
                  onClick={() => setActiveImgIndex((prev) => (prev === wellnessGallery.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              
              <div className="max-w-xl mx-auto text-center space-y-1 pb-2">
                <h4 className="text-lg font-medium font-heading text-white">
                  {wellnessGallery[activeImgIndex].title}
                </h4>
                <p className="text-xs text-slate-400 font-normal">
                  {wellnessGallery[activeImgIndex].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
