import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Home, Maximize2, X, User, Users, Building2, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FindSpaceSection from '../components/FindSpaceSection.jsx';

export default function SpaceServicedOfficePage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    desks: '',
    whatsApp: '',
    email: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [selectedCapacityNote, setSelectedCapacityNote] = useState('');
  const thumbContainerRef = useRef(null);

  const handleCapacityClick = (item) => {
    setSelectedCapacityNote(`Serviced Office: ${item.title} (${item.capacity})`);
    const formElem = document.getElementById('find-space');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const galleryImages = [
    {
      src: '/SPACES/SERVICED OFFICE/1.webp?v=20260823',
      title: 'Kantor Privat Siap Pakai',
      category: 'Suite Kerja Privat',
      desc: 'Ruang kerja berperabot lengkap dengan koneksi internet cepat, siap langsung ditempati tanpa repot setup.',
    },
    {
      src: '/SPACES/SERVICED OFFICE/2.webp?v=20260823',
      title: 'Zona Meja Kerja Tim',
      category: 'Workstation Ergonomis',
      desc: 'Penataan meja kerja ergonomis bermandikan cahaya alami untuk fokus kerja optimal dan produktivitas tinggi.',
    },
    {
      src: '/SPACES/SERVICED OFFICE/3.webp?v=20260823',
      title: 'Ruang Rapat & Resepsionis',
      category: 'Meeting Bisnis',
      desc: 'Ruang konferensi profesional untuk presentasi bisnis penting, diskusi klien, dan koordinasi tim.',
    },
    {
      src: '/SPACES/SERVICED OFFICE/5.webp?v=20260823',
      title: 'Breakout Lounge Modern',
      category: 'Pantry & Lounge Santai',
      desc: 'Area komunal santai untuk rehat kopi, obrolan informal, dan relaksasi menyegarkan.',
    },
  ];

  const servicedSizes = [
    {
      title: 'Private Office',
      capacity: '1–2 orang',
      icon: User,
      desc: 'Ruang kerja privat siap pakai untuk solo founder dan eksekutif kunci.',
    },
    {
      title: 'Small Team Office',
      capacity: '3–5 orang',
      icon: Users,
      desc: 'Tata letak meja efisien untuk tim inti, agensi kreatif, dan startup bertumbuh.',
    },
    {
      title: 'Team Office',
      capacity: '6–10 orang',
      icon: Building2,
      desc: 'Konfigurasi ruang kerja luas untuk divisi regional dan tim operasional mapan.',
    },
    {
      title: 'Custom Workspace',
      capacity: '10+ orang',
      icon: Sparkles,
      desc: 'Solusi sayap lantai atau multi-desk suite yang dikustomisasi sesuai kebutuhan headcount Anda.',
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
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const amenities = [
    'Furnitur Kantor Lengkap',
    'Internet Bisnis Fiber Optik',
    'Layanan Resepsionis Profesional',
    'Akses Ruang Meeting Modern',
    'Kebersihan Harian (Cleaning Service)',
    'Termasuk Listrik & Utilitas',
    'Sistem Keamanan Gedung 24/7',
    'Alamat Bisnis Prestisius CBD',
    'Pantry & Lounge Komunal',
  ];

  const useCases = [
    'Ekspansi Pasar Baru',
    'Tim Proyek Khusus',
    'Kantor Satelit Regional',
    'Startup & Bisnis Rintisan',
    'Konsultan Profesional',
    'Usaha Menengah Berkembang',
    'Kantor Cabang Perusahaan',
    'Kantor Korporat Sementara',
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="spaces" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36 bg-white flex-1">
        
        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <button
              id="btn-serviced-breadcrumb-home"
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
              id="btn-serviced-breadcrumb-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              Spaces
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">Serviced Office</span>
          </nav>

          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              {/* Product Name as the MAIN HIGHLIGHT (Largest headline) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 tracking-tight leading-[1.08]">
                SERVICED OFFICE
              </h1>

              {/* Subheadline */}
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-slate-800 tracking-tight leading-snug">
                Kantor Siap Pakai. <span className="text-[#EA8E18]">Langsung Aktif Hari Ini.</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Tanpa renovasi berbulan-bulan, tanpa repot beli furnitur, tanpa instalasi internet. Cukup bawa tim dan laptop Anda, langsung aktif beroperasi di ekosistem bisnis profesional.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="btn-serviced-hero-check-avail"
                  onClick={() => {
                    const formElem = document.getElementById('find-space');
                    if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                >
                  <span>Cek Ketersediaan Serviced Office</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full shadow-sm group bg-slate-100">
                <img
                  src="/SPACES/SERVICED OFFICE/1.webp?v=20260825"
                  alt="HQuarters Serviced Office Suite"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </section>

        
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Lewati Kerumitan Setup Kantor. <br />
            <span className="text-[#EA8E18]">Fokus Penuh Mengembangkan Bisnis.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal [text-wrap:balance]">
            Membangun kantor konvensional menyita banyak waktu dan modal: kontraktor, perabot, internet, listrik, pemeliharaan, hingga perizinan.<br className="hidden sm:inline" />
            Di Serviced Office HQuarters, seluruh infrastruktur kantor telah kami siapkan secara prima.
          </p>
          <div className="font-bold text-[#EA8E18] text-lg font-heading pt-2">
            Anda fokus memajukan bisnis. Kami kelola seluruh kebutuhan ruang kerja Anda.
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">Detail <span className="text-[#EA8E18]">Serviced Office</span></h2>
          </div>

          
          <div className="relative">
            
            <div
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] rounded-[24px] sm:rounded-2xl overflow-hidden bg-slate-950 shadow-xl group"
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
                id="btn-serviced-gallery-prev"
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded bg-white/40 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="btn-serviced-gallery-next"
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
                    id={`btn-serviced-gallery-dot-${idx}`}
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
                    id={`btn-serviced-gallery-thumb-${idx}`}
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
                    HQuarters Serviced Office Gallery
                  </span>
                  <div className="text-sm font-semibold text-slate-300">
                    {activeImgIndex + 1} / {galleryImages.length} — {galleryImages[activeImgIndex].title}
                  </div>
                </div>

                <button
                  id="btn-serviced-lightbox-close"
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
                  id="btn-serviced-lightbox-prev"
                  onClick={() => setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3.5 sm:p-4 rounded-full bg-black/70 hover:bg-[#EA8E18] text-white transition-all cursor-pointer shadow-2xl border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-serviced-lightbox-next"
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
              PILIHAN RUANG
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Pilih Kapasitas yang Sesuai untuk Tim Anda.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicedSizes.map((item) => (
              <div
                key={item.title}
                onClick={() => handleCapacityClick(item)}
                className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-sm text-center space-y-2 hover:border-[#EA8E18]/40 hover:shadow-xl transition-all cursor-pointer group"
              >
                <h3 className="text-lg font-medium text-slate-900 font-heading group-hover:text-[#EA8E18] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  {item.capacity}
                </p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 border border-slate-200/80 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
                FASILITAS SUDAH TERMASUK
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
                Semua Kebutuhan Kantor Sudah Siap Sedia.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {amenities.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="w-5 h-[2px] bg-[#EA8E18] rounded-full shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
            Fleksibilitas Penuh Mengikuti Dinamika Bisnis Anda.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Tim bertambah? Proyek selesai? Membuka representasi baru di Bandung? Serviced office memungkinkan ruang kerja Anda beradaptasi secepat dinamika strategi bisnis Anda.
          </p>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-[40px] p-8 sm:p-14 text-center border border-slate-800 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-white tracking-tight">
              Tampil Mapan dan Kredibel Sejak Hari Pertama.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
              Bahkan tim beranggotakan dua orang pun dapat menyambut klien di lobi megah berstandar bintang lima dan ruang meeting representatif.
            </p>
            <div className="font-bold text-[#EA8E18] text-base font-heading">
              Tim gesit. Citra korporat berkelas.
            </div>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#EA8E18]">
              SOLUSI IDEAL UNTUK
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              Skenario Penggunaan
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="py-3 px-4 rounded-full bg-white border border-slate-200/80 text-slate-800 font-medium text-xs sm:text-sm shadow-sm flex items-center justify-center text-center whitespace-nowrap"
              >
                {useCase}
              </div>
            ))}
          </div>
        </section>

        
        <FindSpaceSection initialSpace="Serviced Office" initialNotes={selectedCapacityNote} />

        
        <section className="!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-tight">
              Tim Anda Sudah Bisa <br /><span className="text-[#EA8E18]">Mulai Bekerja di Sini Besok.</span>
            </h2>
            <div className="pt-2 sm:pt-4">
              <button
                id="btn-serviced-cta-tour"
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('find-space');
                  window.scrollTo(0, 0);
                }}
                className="px-9 py-4 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#EA8E18]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>Jadwalkan Tur Kantor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
