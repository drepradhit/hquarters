import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDownRight, ArrowDown, CheckCircle2, Check, X, ChevronRight, ChevronLeft, Home, Maximize2, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FindSpaceSection from '../components/FindSpaceSection.jsx';

export default function SpaceSohoDuplexPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsApp: '',
    profession: '',
    purpose: 'Work + Live',
    budget: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [facilityActiveImg, setFacilityActiveImg] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [isFacilityPaused, setIsFacilityPaused] = useState(false);

  const thumbContainerRef = useRef(null);
  const facilityThumbContainerRef = useRef(null);

  const facilitiesGallery = [
    {
      id: 1,
      src: '/BUILDING/gym 01.webp?v=20260825',
      title: 'State-of-the-Art Fitness Center',
    },
    {
      id: 2,
      src: '/BUILDING/gym 5_4.webp?v=20260825',
      title: 'Fitness & Conditioning Studio',
    },
    {
      id: 3,
      src: '/BUILDING/sauna 5_4.webp?v=20260825',
      title: 'Recovery & Relaxation Suite',
    },
    {
      id: 4,
      src: '/BUILDING/kolam renang 5_4.webp?v=20260825',
      title: 'Swimming Pool & Leisure Area',
    },
  ];

  const galleryImages = [
    {
      src: '/SPACES/SOHO/SOHO 01.webp?v=20260823',
      title: 'SOHO Interior View',
      category: 'Architecture',
      desc: 'High-ceiling architectural split between professional work deck and private living.',
    },
    {
      src: '/SPACES/SOHO/SOHO 02.webp?v=20260823',
      title: 'Primary Workspace',
      category: 'Work Area',
      desc: 'Ergonomic team setup designed for focus, high productivity, and natural daylight.',
    },
    {
      src: '/SPACES/SOHO/SOHO 08.webp?v=20260823',
      title: 'Private Living Quarters',
      category: 'Living Space',
      desc: 'Seamless transition to rest and unwind without leaving your unit.',
    },
  ];

  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Smooth, non-blinking auto-play with pause on hover
  useEffect(() => {
    if (isLightboxOpen || isGalleryPaused) return;
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isLightboxOpen, isGalleryPaused, galleryImages.length]);

  useEffect(() => {
    if (isFacilityPaused) return;
    const timer = setInterval(() => {
      setFacilityActiveImg((prev) => (prev + 1) % facilitiesGallery.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isFacilityPaused, facilitiesGallery.length]);

  
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

  
  useEffect(() => {
    if (facilityThumbContainerRef.current) {
      const container = facilityThumbContainerRef.current;
      const activeThumb = container.children[facilityActiveImg];
      if (activeThumb) {
        const leftPos = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
        container.scrollTo({ left: leftPos, behavior: 'smooth' });
      }
    }
  }, [facilityActiveImg]);

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sohoLives = [
    { title: 'STARTUP MODE', desc: 'Workspace, meeting corner, pantry — for a small team.' },
    { title: 'HOME OFFICE MODE', desc: 'Professional workspace in front, private living behind.' },
    { title: 'PROFESSIONAL MODE', desc: 'Reception, meeting room, private office.' },
    { title: 'LIVING MODE', desc: 'Transform into a private living environment as needed.*' },
  ];

  const targetPills = [
    'Startup Founders',
    'Entrepreneurs',
    'Consultants',
    'Designers',
    'Architects',
    'Lawyers',
    'Financial Professionals',
    'Digital Agencies',
    'Family Businesses',
  ];

  const comparisonRows = [
    { feature: 'Living', apt: '?', office: '—', soho: '?' },
    { feature: 'Professional Workspace', apt: 'Limited', office: '?', soho: '?' },
    { feature: 'Business Environment', apt: '—', office: '?', soho: '?' },
    { feature: 'Business Address*', apt: 'Limited', office: '?', soho: '?' },
    { feature: 'Lifestyle Facilities', apt: '?', office: 'Limited', soho: '?' },
    { feature: '24/7 Access & Flexibility', apt: '?', office: '—', soho: '?' },
    { feature: 'Ownership', apt: '?', office: 'Varies', soho: '?' },
    { feature: 'Work + Live', apt: 'Limited', office: '—', soho: '?' },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="spaces" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36 bg-white flex-1">
        
        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <button
              id="btn-soho-breadcrumb-home"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('home');
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-1.5 hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              id="btn-soho-breadcrumb-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              Spaces
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">SOHO</span>
          </nav>

          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wider uppercase flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-slate-400 inline-block"></span>
                <span>HQUARTERS — CBD BANDUNG</span>
              </div>

              {/* Product Name as the MAIN HIGHLIGHT (SOHO large, Small Office Home Office smaller) */}
              <h1 className="tracking-tight font-heading leading-tight space-y-1">
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-[#EA8E18]">
                  SOHO
                </span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-medium text-slate-800">
                  (Small Office Home Office)
                </span>
              </h1>

              {/* Description constrained so it aligns with headline width */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[440px] font-normal pt-1 [text-wrap:pretty]">
                Multifunctional unit that flexibly functions as both a professional workspace and residential living, specifically designed for modern founders to elevate their business presence.
              </p>

              {/* Button & Trust Badge */}
              <div className="pt-2 flex flex-col items-start gap-3">
                <button
                  id="btn-soho-hero-check-avail"
                  onClick={() => {
                    const formElem = document.getElementById("find-space");
                    if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                >
                  <span>Inquire unit details</span>
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium pt-1">
                  <span>Strata Title (Freehold)*</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#EA8E18]" /> Real-time pricing & availability</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full shadow-sm group bg-slate-100">
                <img
                  src="/SPACES/SOHO/SOHO 01.webp?v=20260825"
                  alt="HQuarters SOHO Unit"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Specs / Highlights Strip (Matches Client Mockup) */}
          <div className="mt-4 bg-[#F8F8F7] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-200">
            <div className="pt-2 sm:pt-0 lg:px-4 first:lg:pl-2">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                2 Functions in 1 Unit
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                INTEGRATED OFFICE & RESIDENCE
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Floors 3-16
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                PREMIUM FLOOR SELECTION
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Jl. Asia Afrika
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                PRESTIGIOUS BANDUNG CBD ADDRESS
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <button
                onClick={() => {
                  const formElem = document.getElementById("find-space");
                  if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left group cursor-pointer w-full"
              >
                <div className="text-slate-900 group-hover:text-[#EA8E18] font-bold font-heading text-base sm:text-lg transition-colors flex items-center justify-between">
                  <span>Check Unit & Rates</span>
                  <ArrowRight className="w-4 h-4 text-[#EA8E18] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                  LATEST AVAILABILITY VIA WHATSAPP
                </div>
              </button>
            </div>
          </div>
        </section>

        
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Life Changes. Business Changes. <br />
            <span className="text-[#EA8E18]">Your Space Should Change Too.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal [text-wrap:balance]">
            Today a startup office. Tomorrow a home office. Later a private living space.<br className="hidden sm:inline" />
            Or all of it at once. Why buy a property that can only do one thing?
          </p>
          <div className="font-bold text-[#EA8E18] text-lg font-heading pt-2">
            One Space. Many Possibilities.
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              SOHO <span className="text-[#EA8E18]">Details</span>
            </h2>
          </div>

          
          <div className="relative">
            
            <div
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] rounded-[24px] sm:rounded-2xl overflow-hidden bg-slate-950 group shadow-xl"
            >
              {galleryImages.map((img, idx) => (
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
                id="btn-soho-gallery-prev"
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="btn-soho-gallery-next"
                onClick={() => setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    id={`btn-soho-gallery-dot-${idx}`}
                    onClick={() => setActiveImgIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeImgIndex ? 'bg-white w-6 shadow-md' : 'bg-white/50 hover:bg-white/80 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-start mt-6">
              <div ref={thumbContainerRef} className="flex items-center gap-3 overflow-x-auto scroll-smooth scrollbar-none no-scrollbar pb-2 pt-1 max-w-full">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    id={`btn-soho-gallery-thumb-${idx}`}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
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

        </section>

        
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
                    HQuarters SOHO Lightbox
                  </span>
                  <div className="text-sm font-semibold text-slate-300">
                    {activeImgIndex + 1} / {galleryImages.length} — {galleryImages[activeImgIndex].title}
                  </div>
                </div>

                <button
                  id="btn-soho-lightbox-close"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-3 rounded-full bg-white/10 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              
              <div className="relative max-w-[1200px] w-full mx-auto my-auto flex items-center justify-center h-[72vh]">
                <img
                  src={galleryImages[activeImgIndex].src}
                  alt={galleryImages[activeImgIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />

                
                <button
                  id="btn-soho-lightbox-prev"
                  onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-soho-lightbox-next"
                  onClick={() => setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              
              <div className="max-w-xl mx-auto text-center space-y-1 pb-2">
                <h4 className="text-lg font-medium font-heading text-white">
                  {galleryImages[activeImgIndex].title}
                </h4>
                <p className="text-xs text-slate-400 font-normal">
                  {galleryImages[activeImgIndex].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#EA8E18] uppercase tracking-widest inline-block">
              SIGNATURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              One SOHO. Different Lives.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sohoLives.map((item) => (
              <div
                key={item.title}
                className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-sm hover:border-[#EA8E18]/40 hover:shadow-xl transition-all space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[#EA8E18]">
                  {item.title}
                </div>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Facilities
            </h2>
          </div>

          
          <div className="relative">
            <div
              onMouseEnter={() => setIsFacilityPaused(true)}
              onMouseLeave={() => setIsFacilityPaused(false)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] rounded-[24px] sm:rounded-2xl overflow-hidden bg-slate-950 shadow-xl group"
            >
              {facilitiesGallery.map((img, idx) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                    idx === facilityActiveImg ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                />
              ))}

              <button
                id="btn-soho-facility-prev"
                onClick={() =>
                  setFacilityActiveImg((prev) =>
                    prev === 0 ? facilitiesGallery.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Previous facility image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="btn-soho-facility-next"
                onClick={() =>
                  setFacilityActiveImg((prev) =>
                    prev === facilitiesGallery.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Next facility image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                {facilitiesGallery.map((_, idx) => (
                  <button
                    key={idx}
                    id={`btn-soho-facility-dot-${idx}`}
                    onClick={() => setFacilityActiveImg(idx)}
                    aria-label={`Facility Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === facilityActiveImg ? 'bg-white w-6 shadow-md' : 'bg-white/50 hover:bg-white/80 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-start mt-6">
              <div ref={facilityThumbContainerRef} className="flex items-center gap-3 overflow-x-auto scroll-smooth scrollbar-none no-scrollbar pb-2 pt-1 max-w-full">
                {facilitiesGallery.map((img, idx) => (
                  <button
                    key={idx}
                    id={`btn-soho-facility-thumb-${idx}`}
                    onClick={() => setFacilityActiveImg(idx)}
                    className={`relative shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      idx === facilityActiveImg
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
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 text-center border border-slate-200/80 max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight [text-wrap:balance]">
              Start Small. Look Professional.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto [text-wrap:balance]">
              Your company may be just starting out. That doesn't mean it has to look small.<br className="hidden sm:inline" />
              Meet clients in a representative business environment and build your business image from day one.
            </p>
            <div className="font-bold text-slate-900 text-base font-heading">
              Big companies started small too.
            </div>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight [text-wrap:balance]">
                Not Just A Home Address. <br />
                <span className="text-[#EA8E18]">This Can Be Your Business Address.</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-normal [text-wrap:pretty]">
                One thing that sets SOHO apart from a regular apartment: the unit can be used as a business address, workspace, home office, and private base, subject to applicable regulations.
              </p>
              <button
                id="btn-soho-ask-domicile"
                onClick={() => {
                  const formElem = document.getElementById('find-space');
                  if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 font-bold text-[#EA8E18] hover:text-[#d88010] text-base font-heading group cursor-pointer transition-colors pt-1"
              >
                <span>Ask About Business Domicile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-6 bg-[#FAF8F5] p-8 sm:p-10 rounded-2xl border border-slate-200/80 space-y-5 text-center shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                Why Pay For Two Places?
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base font-normal max-w-lg mx-auto">
                Office (rent, utilities, commute) + Home (rent/mortgage, utilities, commute)
              </p>

              <div className="py-1">
                <ArrowDown className="w-5 h-5 text-[#EA8E18] mx-auto" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  HQuarters SOHO — Work + Live
                </h4>
                <p className="text-slate-600 text-sm sm:text-base font-normal">
                  One space. One location. One asset. #FleksibelAja
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-[40px] p-8 sm:p-14 text-center border border-slate-800 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-white tracking-tight">
              Why Keep Renting Your Space?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
              HQuarters SOHO gives you the chance to own a space that works for both your life and your business.
            </p>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
              COMPARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Apartment? Office? SOHO?
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-slate-200/80 text-xs sm:text-sm font-bold text-slate-800">
                    <th className="py-3 px-4 sm:py-3.5 sm:px-5 font-normal"></th>
                    <th className="py-3 px-4 sm:py-3.5 sm:px-5 text-center font-bold text-slate-800">Apartment</th>
                    <th className="py-3 px-4 sm:py-3.5 sm:px-5 text-center font-bold text-slate-800">Conventional Office</th>
                    <th className="py-3 px-4 sm:py-3.5 sm:px-5 text-center font-bold text-[#EA8E18] bg-[#FEF3E2]/40">HQuarters SOHO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 sm:py-3.5 sm:px-5 text-slate-900 font-normal">{row.feature}</td>
                      
                      
                      <td className="py-3 px-4 sm:py-3.5 sm:px-5 text-center">
                        {row.apt === '?' ? (
                          <Check className="w-4 h-4 text-slate-700 mx-auto" />
                        ) : row.apt === '—' ? (
                          <span className="text-slate-400 font-normal">—</span>
                        ) : (
                          <span className="text-slate-600 font-normal">{row.apt}</span>
                        )}
                      </td>

                      
                      <td className="py-3 px-4 sm:py-3.5 sm:px-5 text-center">
                        {row.office === '?' ? (
                          <Check className="w-4 h-4 text-slate-700 mx-auto" />
                        ) : row.office === '—' ? (
                          <span className="text-slate-400 font-normal">—</span>
                        ) : (
                          <span className="text-slate-600 font-normal">{row.office}</span>
                        )}
                      </td>

                      
                      <td className="py-3 px-4 sm:py-3.5 sm:px-5 text-center bg-[#FEF3E2]/30 font-bold text-[#EA8E18]">
                        {row.soho === '?' ? (
                          <Check className="w-4 h-4 text-[#EA8E18] mx-auto stroke-[2.5]" />
                        ) : (
                          <span className="text-[#EA8E18] font-bold">{row.soho}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-4 px-6 bg-[#FAF8F5] text-center border-t border-slate-200/80 font-bold text-slate-900 text-sm sm:text-base font-heading">
              Why fit your life into one category?
            </div>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
              WHO IT'S FOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Built For People Building Something.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {targetPills.map((pill) => (
              <div
                key={pill}
                className="py-2.5 sm:py-3 px-6 sm:px-7 rounded-full bg-white border border-slate-200/80 text-slate-800 font-medium text-xs sm:text-sm shadow-sm"
              >
                {pill}
              </div>
            ))}
          </div>
        </section>

        
        <FindSpaceSection initialSpace="SOHO" />

        
        <section className="!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-tight">
              Work Here. Live Here. <br /><span className="text-[#EA8E18]">Own Here.</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              HQuarters SOHO — #FleksibelAja
            </p>
          </div>
        </section>

      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}