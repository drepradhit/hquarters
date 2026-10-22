import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDownRight, CheckCircle2, Building2, Shield, Wifi, MapPin, Users, HeartHandshake, ChevronRight, ChevronLeft, Home, Sparkles, Maximize2, X } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FindSpaceSection from '../components/FindSpaceSection.jsx';

export default function SpacePremiumOfficePage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    companyName: '',
    yourName: '',
    whatsApp: '',
    employees: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [teamSizeNote, setTeamSizeNote] = useState('');
  const [facilityActiveImg, setFacilityActiveImg] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [isFacilityPaused, setIsFacilityPaused] = useState(false);

  const thumbContainerRef = useRef(null);
  const facilityThumbContainerRef = useRef(null);

  const facilitiesGallery = [
    {
      id: 1,
      src: '/BUILDING/gym 01.webp?v=20260825',
      title: 'Pusat Kebugaran & Gym Modern',
    },
    {
      id: 2,
      src: '/BUILDING/gym 5_4.webp?v=20260825',
      title: 'Studio Kebugaran & Conditioning',
    },
    {
      id: 3,
      src: '/BUILDING/sauna 5_4.webp?v=20260825',
      title: 'Ruang Sauna Relaksasi Eksklusif',
    },
    {
      id: 4,
      src: '/BUILDING/kolam renang 5_4.webp?v=20260825',
      title: 'Rooftop Heated Swimming Pool',
    },
  ];

  const handleTeamSizeClick = (item) => {
    setTeamSizeNote(`Estimasi kapasitas tim: ${item.size} (${item.desc})`);
    const formElem = document.getElementById('find-space');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const galleryImages = [
    {
      src: '/SPACES/PREMIUM OFFICE/Premium Office.webp?v=20260823',
      title: 'Lantai Kerja Eksekutif Terbuka',
      category: 'Tata Ruang Korporat',
      desc: 'Denah lantai terbuka luas berstandar Grade A yang fleksibel untuk penataan workstation dan partisi ruang divisi.',
    },
    {
      src: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp?v=20260823',
      title: 'Ruang Rapat Direksi & Presentasi',
      category: 'Meeting Suite',
      desc: 'Area rapat formal dilengkapi instalasi konektivitas dan peredam suara untuk kelancaran presentasi klien.',
    },
    {
      src: '/SPACES/PREMIUM OFFICE/Premium Office 03.webp?v=20260823',
      title: 'Ruang Kerja Pimpinan Sudut (Corner Office)',
      category: 'Private Suite',
      desc: 'Ruang kerja pimpinan privat dengan bukaan jendela panorama ke arah lanskap kota CBD Bandung.',
    },
    {
      src: '/SPACES/PREMIUM OFFICE/Premium Office 04.webp?v=20260823',
      title: 'Area Kolaborasi & Workstation Tim',
      category: 'Workstation',
      desc: 'Penataan meja kerja tim yang ergonomis dengan pencahayaan alami untuk menjaga kenyamanan kerja harian.',
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const teamSizes = [
    { size: '10 — 20 Orang', desc: 'Format kantor korporat kompak & efisien' },
    { size: '20 — 40 Orang', desc: 'Tata ruang fleksibel untuk beberapa divisi kerja' },
    { size: '40 — 80 Orang', desc: 'Konfigurasi sayap lantai luas terintegrasi' },
    { size: '80 — 150+ Orang', desc: 'Solusi satu lantai penuh (full floor plate)' },
  ];

  const features = [
    {
      title: 'Lobi & Resepsionis Utama',
      desc: 'Menyambut tamu, klien, dan mitra bisnis dengan standar gedung komersial profesional.',
      icon: Building2,
    },
    {
      title: 'Tata Ruang Fleksibel',
      desc: 'Denah lantai terbuka mudah dibagi untuk ruang divisi, ruang meeting, dan area kerja.',
      icon: Users,
    },
    {
      title: 'Koneksi Internet Cepat',
      desc: 'Didukung instalasi fiber optik berkecepatan tinggi dengan berbagai opsi provider.',
      icon: Wifi,
    },
    {
      title: 'Lokasi Strategis CBD',
      desc: 'Berada di koridor Asia Afrika, dekat pusat perbankan, perkantoran, dan akses tol.',
      icon: MapPin,
    },
    {
      title: 'Keamanan & Akses 24 Jam',
      desc: 'Kartu akses lift, pantauan CCTV, dan petugas keamanan profesional berjaga 24/7.',
      icon: Shield,
    },
    {
      title: 'Gym & Kolam Renang',
      desc: 'Akses fasilitas kebugaran dan rooftop pool di gedung untuk relaksasi tim kerja.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="spaces" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36 bg-white flex-1">
        
        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <button
              id="btn-premium-breadcrumb-home"
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
              id="btn-premium-breadcrumb-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              Spaces
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">Premium Office</span>
          </nav>

          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wider uppercase flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-slate-400 inline-block"></span>
                <span>HQUARTERS — CBD BANDUNG</span>
              </div>

              {/* Product Name as the MAIN HIGHLIGHT */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-[#EA8E18] tracking-tight leading-[1.08]">
                PREMIUM OFFICE
              </h1>

              {/* Description constrained so it aligns with headline width */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[440px] font-normal pt-1 [text-wrap:pretty]">
                Lantai kantor open-plan fleksibel di CBD Asia Afrika Bandung. Pilihan luasan mulai dari setengah hingga satu lantai penuh untuk menaikan citra bisnis korporasi Anda.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  id="btn-premium-hero-check-avail"
                  onClick={() => {
                    const formElem = document.getElementById("find-space");
                    if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                >
                  <span>Tanya detail kantor</span>
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full shadow-sm group bg-slate-100">
                <img
                  src="/SPACES/PREMIUM OFFICE/Premium Office.webp?v=20260825"
                  alt="HQuarters Premium Office Suite"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Specs / Highlights Strip */}
          <div className="mt-4 bg-[#F8F8F7] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-200">
            <div className="pt-2 sm:pt-0 lg:px-4 first:lg:pl-2">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Semi Gross 77–342 m²
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                OPSI LUASAN RUANG KANTOR
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Lantai Korporat
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                LOBBY & AKSES EKSKLUSIF
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Jl. Asia Afrika
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                CBD STRATEGIS KOTA BANDUNG
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
                  <span>Cek Unit & Layout</span>
                  <ArrowRight className="w-4 h-4 text-[#EA8E18] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                  KONSULTASI RUANG VIA WHATSAPP
                </div>
              </button>
            </div>
          </div>
        </section>

        
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Spesifikasi Ruang & Tata Letak
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal [text-wrap:balance]">
            Bandingkan ukuran ruang dan kapasitas tim sesuai kebutuhan bisnis Anda.
          </p>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Detail & Tata Ruang <span className="text-[#EA8E18]">Premium Office</span>
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
                id="btn-premium-gallery-prev"
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="btn-premium-gallery-next"
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
                    id={`btn-premium-gallery-dot-${idx}`}
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
                    id={`btn-premium-gallery-thumb-${idx}`}
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
                    HQuarters Premium Office Gallery
                  </span>
                  <div className="text-sm font-semibold text-slate-300">
                    {activeImgIndex + 1} / {galleryImages.length} — {galleryImages[activeImgIndex].title}
                  </div>
                </div>

                <button
                  id="btn-premium-lightbox-close"
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
                  id="btn-premium-lightbox-prev"
                  onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-premium-lightbox-next"
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

        
        {/* Premium Office Highlights: Spesifikasi, Kapasitas, Fasilitas */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Spesifikasi Teknis */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#EA8E18]/40 hover:shadow-md transition-all">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
                  SPESIFIKASI TEKNIS
                </span>
                <h3 className="text-xl font-medium font-heading text-slate-900 tracking-tight">
                  Denah Lantai Fleksibel
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Denah lantai terbuka Grade A dengan efisiensi tata ruang tinggi, modul partisi bebas, dan instalasi utilitas modern.
                </p>
              </div>
              <button
                id="btn-premium-inquire-specs"
                onClick={() => {
                  const formElem = document.getElementById("find-space");
                  if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#EA8E18] hover:text-[#d88010] font-heading group cursor-pointer transition-colors pt-2"
              >
                <span>Tanya spesifikasi denah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 2. Pilihan Luas Lantai */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#EA8E18]/40 hover:shadow-md transition-all">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
                  PILIHAN RUANG
                </span>
                <h3 className="text-xl font-medium font-heading text-slate-900 tracking-tight">
                  Sayap Hingga Full Floor
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Pilihan konfigurasi unit mulai dari sayap lantai terintegrasi hingga satu lantai penuh (full floor plate) dengan panorama CBD.
                </p>
              </div>
              <button
                onClick={() => {
                  const formElem = document.getElementById("find-space");
                  if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#EA8E18] hover:text-[#d88010] font-heading group cursor-pointer transition-colors pt-2"
              >
                <span>Cek ketersediaan unit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 3. Fasilitas & Keamanan */}
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#EA8E18]/40 hover:shadow-md transition-all">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
                  FASILITAS GEDUNG
                </span>
                <h3 className="text-xl font-medium font-heading text-slate-900 tracking-tight">
                  Standar Gedung Grade A
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Lobi utama eksekutif, lift kartu akses berkecepatan tinggi, keamanan 24/7, gym, rooftop pool, dan parkir luas.
                </p>
              </div>
              <button
                onClick={() => {
                  const formElem = document.getElementById("find-space");
                  if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 font-bold text-sm text-[#EA8E18] hover:text-[#d88010] font-heading group cursor-pointer transition-colors pt-2"
              >
                <span>Jadwalkan survei lokasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">Fasilitas Gedung di <span className="text-[#EA8E18]">HQuarters</span></h2>
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
                id="btn-premium-facility-prev"
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
                id="btn-premium-facility-next"
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
                    id={`btn-premium-facility-dot-${idx}`}
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
                    id={`btn-premium-facility-thumb-${idx}`}
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

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
              FASILITAS OPERASIONAL LENGKAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Fasilitas pendukung kelancaran kerja harian
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FEF3E2] text-[#B86807] group-hover:bg-[#EA8E18] group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900 font-heading group-hover:text-[#EA8E18] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 border border-slate-200/80 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#EA8E18]">
                PILIHAN KAPASITAS
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
                Pilih kapasitas sesuai jumlah tim Anda
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {teamSizes.map((item) => (
                <div
                  key={item.size}
                  onClick={() => handleTeamSizeClick(item)}
                  className="bg-white py-5 sm:py-6 px-4 rounded-2xl border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center space-y-1.5 hover:border-[#EA8E18] hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="text-xl sm:text-2xl font-medium text-slate-900 font-heading group-hover:text-[#EA8E18] transition-colors">
                    {item.size}
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight">
              Sewa Fleksibel, <span className="text-[#EA8E18]"><br />Modal Kerja Tetap Efisien</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
              Tanpa belanja modal besar di awal. Alokasikan modal untuk ekspansi pasar dan operasional utama bisnis Anda.
            </p>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-xl sm:rounded-2xl py-10 sm:py-14 px-6 sm:px-12 border border-slate-200/80 text-center space-y-3 shadow-sm max-w-4xl mx-auto">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EA8E18]">
              TENANT KORPORASI
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium font-heading text-slate-900 leading-snug">
              Pilihan kantor Garuda Indonesia dan berbagai korporasi nasional di Bandung.
            </p>
          </div>
        </section>

        
        <FindSpaceSection initialSpace="Premium Office" initialNotes={teamSizeNote} />

        
        <section className="!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-tight">
              Alamat kantor representatif untuk bisnis Anda di Bandung
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              HQuarters Premium Office — Jl. Asia Afrika No. 158, CBD Bandung
            </p>
          </div>
        </section>

      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
