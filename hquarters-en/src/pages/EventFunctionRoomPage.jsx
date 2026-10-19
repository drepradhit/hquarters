import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Home,
  MessageSquare,
  Volume2,
  Projector,
  Wifi,
  SunMedium,
  Wind,
  ShieldCheck,
  Armchair,
  Shield,
  Car,
  MapPin,
  Phone,
  Layers,
  LayoutGrid,
  Clock,
  Coffee,
  Utensils,
  Check,
  Send,
  Building,
  Mail,
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomSelect from '../components/CustomSelect.jsx';
import GoogleIcon from '../components/GoogleIcon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { validateEmail } from '../lib/emailValidation.js';

export default function EventFunctionRoomPage({ setCurrentPage }) {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    company: '',
    selectedRoom: 'Room 1 & Room 2 (Combined)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const validateForm = () => {
    const isId = language === 'id';
    const errs = {};
    if (!formData.name.trim()) errs.name = isId ? 'Nama wajib diisi' : 'Name is required';
    else if (formData.name.trim().length < 2) errs.name = isId ? 'Nama minimal 2 karakter' : 'Name must be at least 2 characters';
    const digits = formData.whatsapp.replace(/\D/g, "");
    if (!digits) errs.whatsapp = isId ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required';
    else if (!/^(62|0)[0-9]{8,13}$/.test(digits)) errs.whatsapp = isId ? 'Masukkan nomor yang valid (contoh: 08123456789)' : 'Enter a valid Indonesian number (e.g. 08123456789)';
    const emailRes = validateEmail(formData.email, isId);
    if (!emailRes.isValid) {
      errs.email = emailRes.error;
    }
    return errs;
  };
  const [activeLayout, setActiveLayout] = useState('theatre');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  
  const [galleryImgIndex, setGalleryImgIndex] = useState(0);
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);

  const functionRoomFacilities = [
    {
      id: 'theatre',
      src: '/Function Room/Theatre.webp?v=20260825',
      title: 'Theatre Layout',
    },
    {
      id: 'classroom',
      src: '/Function Room/Class Room.webp?v=20260825',
      title: 'Classroom Layout',
    },
    {
      id: 'ushape',
      src: '/Function Room/U SHape.webp?v=20260823',
      title: 'U-Shape Layout',
    },
    {
      id: 'roundtable',
      src: '/Function Room/Ron Table.webp?v=20260825',
      title: 'Round Table Banquet',
    },
  ];

  
  const functionRoomSlides = [
    {
      src: '/BUILDING/FR 01.webp?v=20260825',
      title: 'Grand Function Room',
      category: 'Events & Corporate Seminars',
      tag: 'Capacity: Up to 140 Pax',
      desc: 'Versatile corporate event hall with complete audiovisual facilities in Bandung CBD.',
    },
    {
      src: '/BUILDING/FR 02.webp?v=20260825',
      title: 'Executive Function Hall',
      category: 'Seminars & Conferences',
      tag: 'Capacity: Up to 100 Pax',
      desc: 'Modern climate-controlled function room equipped for high-impact presentations and gatherings.',
    },
    {
      src: '/BUILDING/FR 03.webp?v=20260825',
      title: 'Multi-Purpose Event Space',
      category: 'Private Banquets & Gatherings',
      tag: 'Capacity: Up to 140 Pax',
      desc: 'Flexible layout setups designed to accommodate keynotes, workshops, and banquet celebrations.',
    },
  ];

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev === functionRoomSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? functionRoomSlides.length - 1 : prev - 1));
  };

  const goToSlide = (idx) => {
    setSlideDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  
  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, isLightboxOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, currentSlide]);

  
  const occasionPills = [
    'Corporate Seminars',
    'Product Launches',
    'Training & Workshops',
    'Board Meetings',
    'Private Celebrations',
    'Community Gatherings',
  ];

  
  const roomDetails = [
    {
      id: 'capacity',
      title: 'Capacity',
      stat: 'Up to 180 Guests',
      desc: 'Theatre, classroom, banquet, or cocktail configuration.',
    },
    {
      id: 'area',
      title: 'Total Area',
      stat: '298 m² Column-Free',
      desc: 'Expansive floor plan with 3.8m acoustic ceiling height.',
    },
    {
      id: 'divisible',
      title: 'Divisible Space',
      stat: '2 Private Rooms',
      desc: 'Sound-insulated movable partition to divide the hall as needed.',
    },
    {
      id: 'light',
      title: 'Natural Light',
      stat: 'Floor-to-Ceiling',
      desc: 'Panoramic windows with motorized blackout drapes for media.',
    },
  ];

  
  const seatingLayouts = [
    {
      id: 'theatre',
      title: 'Theatre',
      desc: 'Rows of chairs facing the front — best for presentations.',
      icon: 'theatre',
      r1Capacity: 140,
      r2Capacity: 100,
    },
    {
      id: 'classroom',
      title: 'Classroom',
      desc: 'Rows of tables and chairs — best for training and note-taking.',
      icon: 'classroom',
      r1Capacity: 100,
      r2Capacity: 60,
    },
    {
      id: 'reception',
      title: 'Reception',
      desc: 'Open standing space — best for mingling and cocktail events.',
      icon: 'reception',
      r1Capacity: 180,
      r2Capacity: 130,
    },
    {
      id: 'u-shape',
      title: 'U-Shape',
      desc: 'Tables arranged in a U — best for discussion-style meetings.',
      icon: 'ushape',
      r1Capacity: 100,
      r2Capacity: 60,
    },
    {
      id: 'round-table',
      title: 'Round Table',
      desc: 'Guests seated around round tables — best for banquets and dining.',
      icon: 'roundtable',
      r1Capacity: 70,
      r2Capacity: 50,
    },
  ];

  
  const packages = [
    {
      id: 'fullboard',
      name: 'Fullboard',
      price: 'Rp 550,000',
      unit: '/ pax',
      inclusions: '3× Coffee Break, 1× Lunch',
      duration: '*Max 12 hours',
    },
    {
      id: 'fullday',
      name: 'Full Day',
      price: 'Rp 450,000',
      unit: '/ pax',
      inclusions: '2× Coffee Break, 1× Lunch or Dinner',
      duration: '*Max 8 hours',
    },
    {
      id: 'halfday',
      name: 'Half Day',
      price: 'Rp 350,000',
      unit: '/ pax',
      inclusions: '1× Coffee Break, 1× Lunch or Dinner',
      duration: '*Max 6 hours',
    },
    {
      id: 'lunch-dinner',
      name: 'Lunch / Dinner',
      price: 'Rp 200,000',
      unit: '/ pax',
      inclusions: '1× Lunch or Dinner',
      duration: '',
    },
    {
      id: 'coffee-break',
      name: 'Coffee Break',
      price: 'Rp 200,000',
      unit: '/ pax',
      inclusions: '1× Coffee Break',
      duration: '*Min 6 hours',
    },
    {
      id: 'room-only',
      name: 'Room Only',
      price: 'Rp 1,500,000',
      unit: '/ room / hr',
      inclusions: '',
      duration: '*Min 4 hours / day',
    },
  ];

  
  const isId = language === 'id';

  const includedAmenities = [
    {
      name: isId ? 'Sistem Suara & Mikrofon' : 'Sound System & Microphones',
      category: isId ? 'Audio & Akustik' : 'Audio & Acoustics',
      iconName: 'mic',
      desc: isId
        ? 'Sistem akustik jernih dengan mikrofon nirkabel genggam & lapel clip-on.'
        : 'Crystal-clear acoustic system with wireless handheld & lapel mics.',
    },
    {
      name: isId ? 'Proyektor & Layar' : 'Projector & Screen',
      category: isId ? 'Layar & Proyeksi' : 'Display & Projection',
      iconName: 'present_to_all',
      desc: isId
        ? 'Proyektor digital lumens tinggi dan layar presentasi bermotor lebar.'
        : 'High-lumen digital projector and wide motorized presentation screens.',
    },
    {
      name: isId ? 'Wi-Fi Kecepatan Tinggi' : 'High-Speed Wi-Fi',
      category: isId ? 'Konektivitas Gigabit' : 'Gigabit Connectivity',
      iconName: 'wifi',
      desc: isId
        ? 'Konektivitas internet bandwidth tinggi khusus untuk presenter dan peserta.'
        : 'Dedicated high-bandwidth connectivity for presenters and attendees.',
    },
    {
      name: isId ? 'Pencahayaan yang Dapat Diatur' : 'Adjustable Lighting',
      category: isId ? 'Tata Cahaya' : 'Lighting Ambience',
      iconName: 'tune',
      desc: isId
        ? 'Preset pencahayaan redup yang dapat disesuaikan dari presentasi hingga perjamuan.'
        : 'Customisable dimmable lighting presets from presentation to banquet.',
    },
    {
      name: isId ? 'Pendingin Ruangan (AC)' : 'Air Conditioning',
      category: isId ? 'Kontrol Suhu' : 'Climate Control',
      iconName: 'ac_unit',
      desc: isId
        ? 'Pengatur suhu terpusat memastikan kenyamanan optimal sepanjang acara.'
        : 'Centralised climate control ensuring optimal comfort throughout the event.',
    },
    {
      name: isId ? 'Staf Acara di Lokasi' : 'On-Site Event Staff',
      category: isId ? 'Dukungan Acara' : 'Technical Hospitality',
      iconName: 'support_agent',
      desc: isId
        ? 'Tim dukungan teknis profesional dan staf perhotelan tamu yang siap siaga.'
        : 'Professional technical support and guest hospitality team on standby.',
    },
    {
      name: isId ? 'Meja & Kursi' : 'Tables & Seating',
      category: isId ? 'Tata Ruang Modular' : 'Modular Ergonomics',
      iconName: 'chair',
      desc: isId
        ? 'Kursi konferensi ergonomis dan meja modular banquet/classroom.'
        : 'Ergonomic conference chairs and modular banquet/classroom tables.',
    },
    {
      name: isId ? 'Keamanan Gedung' : 'Building Security',
      category: isId ? 'Akses & Keamanan' : 'Access & Safety',
      iconName: 'verified_user',
      desc: isId
        ? 'Keamanan akses gedung 24/7, pemantauan CCTV, dan akses lobi aman.'
        : '24/7 building access security, CCTV monitoring, and safe lobby access.',
    },
    {
      name: isId ? 'Akses Parkir Khusus' : 'Dedicated Parking Access',
      category: isId ? 'Parkir & Transit' : 'Transit & Parking',
      iconName: 'local_parking',
      desc: isId
        ? 'Akses langsung ke parkir mekanikal otomatis dan area drop-off VIP.'
        : 'Direct access to automated mechanical parking and VIP drop-off zone.',
    },
  ];

  const handleSelectPackage = (pkg) => {
    const packageValue = `${pkg.name} (${pkg.price} ${pkg.unit})`;
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes ? prev.notes : `I'm interested in the ${packageValue} package.`,
    }));
    const formElem = document.getElementById('book-room');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckAvailabilityClick = () => {
    const formElem = document.getElementById('book-room');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm();
    setTouched(true);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    setSubmitted(true);

    
    const isId = language === 'id';
    const greeting = isId
      ? 'Halo Tim Acara HQuarters, saya ingin berkonsultasi mengenai pemesanan Function Room.\n\n'
      : 'Hello HQuarters Event Team, I would like to inquire about the Function Room.\n\n';

    const textMessage = encodeURIComponent(
      greeting +
      (isId ? `*Nama:* ${formData.name}\n` : `*Name:* ${formData.name}\n`) +
      `*WhatsApp:* ${formData.whatsapp}\n` +
      (formData.email ? (isId ? `*Email:* ${formData.email}\n` : `*Email:* ${formData.email}\n`) : '') +
      (isId ? `*Pilihan Ruangan:* ${formData.selectedRoom}\n` : `*Room Preference:* ${formData.selectedRoom}\n`) +
      (formData.company ? (isId ? `*Perusahaan:* ${formData.company}\n` : `*Company:* ${formData.company}\n`) : '') +
      (formData.notes ? (isId ? `*Catatan:* ${formData.notes}\n` : `*Notes:* ${formData.notes}\n`) : '')
    );

    setTimeout(() => {
      window.open(`https://wa.me/628111908319?text=${textMessage}`, '_blank');
    }, 800);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="event" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 pb-0 space-y-20 sm:space-y-28 bg-white flex-1">

        
        
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO                                                           */}
        {/* ========================================================================= */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EA8E18] inline-block">
                {t.eventPage.badge}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-slate-900 tracking-tight leading-[1.12]">
                {t.eventPage.heroTitlePrefix}{' '}
                <span className="text-[#EA8E18]">{t.eventPage.heroTitleHighlight}</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                {t.eventPage.heroDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  id="btn-event-hero-check-avail"
                  onClick={handleCheckAvailabilityClick}
                  className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#EA8E18] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>{t.eventPage.checkAvailability}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="btn-event-hero-view-specs"
                  onClick={() => {
                    const specs = document.getElementById('room-specs');
                    if (specs) specs.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full border border-slate-200 hover:border-slate-900 text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  <span>{t.eventPage.viewSpecs}</span>
                </button>
              </div>
            </div>

            {/* Right Photograph */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <img
                  src="/Function%20Room/Theatre.webp?v=20260826"
                  alt="HQuarters Function Room — Theatre Setup"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: ROOM SPECIFICATIONS */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-sm font-medium text-[#EA8E18]">
              {t.roomDetails?.badge || 'ROOM SPECIFICATIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              {t.roomDetails?.title || 'Engineered for Performance.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {(t.roomDetails?.items || roomDetails).map((item, idx) => (
              <div
                key={item.title || idx}
                className="bg-[#FAF8F5] rounded-2xl p-7 border border-slate-200/80 space-y-3 hover:border-[#EA8E18]/50 transition-colors"
              >
                <div className="text-sm font-medium text-[#EA8E18]">
                  {item.title}
                </div>
                <div className="text-xl sm:text-2xl font-medium font-heading text-slate-900 tracking-tight">
                  {item.stat}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        
        
        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 tracking-tight">
              {t.eventPage?.galleryTitle || 'Function Room'}{' '}
              <span className="text-[#EA8E18]">{t.eventPage?.galleryTitleHighlight || 'Facilities'}</span>
            </h2>
          </div>

          
          <div className="relative">
            
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] rounded-[24px] sm:rounded-2xl overflow-hidden bg-slate-950 shadow-xl group">
              {functionRoomFacilities.map((img, idx) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out cursor-pointer ${
                    idx === galleryImgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  onClick={() => setGalleryLightboxOpen(true)}
                />
              ))}

              <button
                id="btn-event-facilities-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryImgIndex((prev) =>
                    prev === 0 ? functionRoomFacilities.length - 1 : prev - 1
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer shadow-md hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="btn-event-facilities-next"
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryImgIndex((prev) =>
                    prev === functionRoomFacilities.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 transition-all z-20 cursor-pointer shadow-md hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                {functionRoomFacilities.map((_, idx) => (
                  <button
                    key={idx}
                    id={`btn-event-facilities-dot-${idx}`}
                    onClick={() => setGalleryImgIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === galleryImgIndex
                        ? 'bg-white w-6 shadow-md'
                        : 'bg-white/50 hover:bg-white/80 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 sm:gap-4 mt-4 overflow-x-auto scrollbar-none pb-2 sm:pb-0 max-w-full">
              {functionRoomFacilities.map((img, idx) => (
                <button
                  key={img.id}
                  id={`btn-event-facilities-thumb-${idx}`}
                  onClick={() => setGalleryImgIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-22 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    idx === galleryImgIndex
                      ? 'border-[#EA8E18] opacity-100 ring-2 ring-[#EA8E18]/30 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>
          </div>
        </section>

        
        
        
        <section id="room-specs" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EA8E18]">
                {t.eventPage.specsBadge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-slate-900 tracking-tight">
              {t.eventPage.specsTitle}
            </h2>
          </div>

          
          {/* SOW Requirement: Room Specifications in Modern Responsive Card View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Room 1 Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#EA8E18]/50 transition-all flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA8E18] bg-[#FEF3E2] px-3 py-1 rounded-full">
                    CONFERENCE & BANQUET
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    <span>140.4 m²</span>
                    <span>•</span>
                    <span>10.58 &times; 15 m</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900">
                    Room 1
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Spacious multi-configuration venue ideal for full-scale seminars, townhalls, and corporate dinners.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Theatre</span>
                    <span className="text-lg font-bold text-[#EA8E18]">140 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Classroom</span>
                    <span className="text-lg font-bold text-[#EA8E18]">100 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Reception</span>
                    <span className="text-lg font-bold text-[#EA8E18]">180 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">U-Shape</span>
                    <span className="text-lg font-bold text-[#EA8E18]">100 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Round Table</span>
                    <span className="text-lg font-bold text-[#EA8E18]">70 Pax</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  id="btn-event-inquire-room-1"
                  onClick={handleCheckAvailabilityClick}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-[#EA8E18] text-slate-800 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Inquire Room 1</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Room 2 Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#EA8E18]/30 shadow-md hover:shadow-xl hover:border-[#EA8E18] transition-all flex flex-col justify-between relative">
              <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#EA8E18] px-3 py-1 rounded-full">
                    EXECUTIVE SUITE
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    <span>157.5 m²</span>
                    <span>•</span>
                    <span>9 &times; 15.6 m</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900">
                    Room 2
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Flexible executive room with premium sound isolation, perfect for workshops and hybrid boardroom meetings.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Theatre</span>
                    <span className="text-lg font-bold text-[#EA8E18]">100 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Classroom</span>
                    <span className="text-lg font-bold text-[#EA8E18]">60 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Reception</span>
                    <span className="text-lg font-bold text-[#EA8E18]">130 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">U-Shape</span>
                    <span className="text-lg font-bold text-[#EA8E18]">60 Pax</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Round Table</span>
                    <span className="text-lg font-bold text-[#EA8E18]">50 Pax</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  id="btn-event-inquire-room-2"
                  onClick={handleCheckAvailabilityClick}
                  className="w-full py-3 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Inquire Room 2</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          
          <div className="text-center text-xs sm:text-sm font-normal text-[#3a3836] pt-1">
            Rooms can be combined or divided by movable partition to fit your event size.
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 pt-2">
            {seatingLayouts.map((layout) => (
              <div
                key={layout.id}
                className="bg-white rounded-xl p-6 sm:p-7 text-center border border-slate-100/90 shadow-sm flex flex-col items-center justify-center min-h-[210px] space-y-4 hover:border-[#EA8E18]/40 hover:shadow-md transition-all group"
              >
                
                <div className="h-12 flex items-center justify-center text-[#EA8E18]">
                  {layout.id === 'theatre' && (
                    <svg className="w-9 h-9" viewBox="0 0 30 26" fill="currentColor">
                      
                      <rect x="2" y="2" width="4.5" height="4.5" rx="1.2" />
                      <rect x="9.5" y="2" width="4.5" height="4.5" rx="1.2" />
                      <rect x="17" y="2" width="4.5" height="4.5" rx="1.2" />
                      <rect x="24.5" y="2" width="4.5" height="4.5" rx="1.2" />
                      
                      <rect x="2" y="10.5" width="4.5" height="4.5" rx="1.2" />
                      <rect x="9.5" y="10.5" width="4.5" height="4.5" rx="1.2" />
                      <rect x="17" y="10.5" width="4.5" height="4.5" rx="1.2" />
                      <rect x="24.5" y="10.5" width="4.5" height="4.5" rx="1.2" />
                      
                      <rect x="2" y="19" width="4.5" height="4.5" rx="1.2" />
                      <rect x="9.5" y="19" width="4.5" height="4.5" rx="1.2" />
                      <rect x="17" y="19" width="4.5" height="4.5" rx="1.2" />
                      <rect x="24.5" y="19" width="4.5" height="4.5" rx="1.2" />
                    </svg>
                  )}

                  {layout.id === 'classroom' && (
                    <svg className="w-9 h-9" viewBox="0 0 30 26" fill="currentColor">
                      
                      <rect x="2" y="3" width="26" height="4.5" rx="2.2" />
                      <rect x="2" y="11" width="26" height="4.5" rx="2.2" />
                      <rect x="2" y="19" width="26" height="4.5" rx="2.2" />
                    </svg>
                  )}

                  {layout.id === 'reception' && (
                    <svg className="w-14 h-6" viewBox="0 0 54 20" fill="currentColor">
                      
                      
                      <circle cx="6" cy="5.5" r="2.6" />
                      <circle cx="6" cy="14.5" r="2.6" />
                      
                      <circle cx="27" cy="5.5" r="2.6" />
                      <circle cx="27" cy="14.5" r="2.6" />
                      
                      <circle cx="48" cy="5.5" r="2.6" />
                      <circle cx="48" cy="14.5" r="2.6" />
                    </svg>
                  )}

                  {layout.id === 'u-shape' && (
                    <svg className="w-9 h-9" viewBox="0 0 30 26" fill="currentColor">
                      
                      
                      <rect x="4" y="4" width="4.5" height="4.5" rx="1" />
                      <rect x="4" y="11.5" width="4.5" height="4.5" rx="1" />
                      <rect x="4" y="19" width="4.5" height="4.5" rx="1" />
                      
                      <rect x="11" y="19" width="4.5" height="4.5" rx="1" />
                      <rect x="18" y="19" width="4.5" height="4.5" rx="1" />
                      <rect x="25" y="19" width="4.5" height="4.5" rx="1" />
                      
                      <rect x="25" y="11.5" width="4.5" height="4.5" rx="1" />
                      <rect x="25" y="4" width="4.5" height="4.5" rx="1" />
                    </svg>
                  )}

                  {layout.id === 'round-table' && (
                    <svg className="w-9 h-9" viewBox="0 0 30 30" fill="none">
                      
                      <circle cx="15" cy="15" r="9" className="stroke-[#EA8E18]" strokeWidth="2.2" />
                      
                      <circle cx="8.64" cy="8.64" r="2.2" className="fill-[#EA8E18]" />
                      <circle cx="21.36" cy="8.64" r="2.2" className="fill-[#EA8E18]" />
                      <circle cx="21.36" cy="21.36" r="2.2" className="fill-[#EA8E18]" />
                      <circle cx="8.64" cy="21.36" r="2.2" className="fill-[#EA8E18]" />
                    </svg>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-medium text-slate-900 text-base sm:text-[17px] font-heading">
                    {layout.title}
                  </h4>
                  <p className="text-[#3a3836] text-xs sm:text-[13px] leading-relaxed font-normal max-w-[210px] mx-auto">
                    {layout.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        
        
        <section id="meeting-packages" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EA8E18]">
                MEETING PACKAGES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-slate-900 tracking-tight">
              Pricing Per Package.
            </h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className="bg-white hover:bg-[#EA8E18] rounded-xl sm:rounded-2xl p-7 sm:p-8 text-left border border-slate-200/90 hover:border-[#EA8E18] shadow-sm hover:shadow-2xl hover:shadow-[#EA8E18]/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px] cursor-pointer group relative overflow-hidden"
              >
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl font-medium font-heading text-slate-900 group-hover:text-white transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-slate-100/80 group-hover:bg-white text-slate-500 group-hover:text-[#EA8E18] flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:scale-110">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  
                  <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100 group-hover:border-white/25 transition-colors duration-300">
                    <span className="text-2xl sm:text-3xl font-medium font-heading text-[#EA8E18] group-hover:text-white transition-colors duration-300">
                      {pkg.price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 group-hover:text-white/80 font-normal italic transition-colors duration-300">
                      {pkg.unit}
                    </span>
                  </div>

                  
                  {pkg.inclusions ? (
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-900 group-hover:text-white font-normal leading-relaxed transition-colors duration-300">
                      <Coffee className="w-4 h-4 text-[#EA8E18] group-hover:text-white shrink-0 mt-0.5 transition-colors duration-300" />
                      <span>{pkg.inclusions}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-transparent select-none py-1">
                      &nbsp;
                    </div>
                  )}
                </div>

                
                <div className="pt-4 mt-4 border-t border-slate-100 group-hover:border-white/25 flex items-center justify-between text-xs text-slate-500 group-hover:text-white/90 font-normal transition-colors duration-300">
                  <span>{pkg.duration || ''}</span>
                  <span className="text-[#EA8E18] group-hover:text-white font-semibold text-[11px] uppercase tracking-wider group-hover:underline transition-colors duration-300">
                    Inquire
                  </span>
                </div>
              </div>
            ))}
          </div>

          
          <div className="space-y-2.5 text-center text-xs sm:text-[13px] font-normal text-[#3a3836] max-w-5xl mx-auto pt-4 leading-relaxed">
            <p className="text-[#3a3836]">
              All rates are nett. Includes LCD & screen, whiteboard, standard sound system, free Wi-Fi, and meeting amenities (pencil, notepad, mineral water).
            </p>
            <p className="text-slate-500 italic">
              Prices are subject to change without prior notice. Please contact us for the latest <br />
              pricing and package details.
            </p>
          </div>
        </section>

        
        
        
        {/* ========================================================================= */}
        {/* 6. INCLUDED AMENITIES */}
        {/* ========================================================================= */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#EA8E18]">
                {isId ? 'TERMASUK' : 'INCLUDED'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-slate-900 tracking-tight">
              {isId ? 'Semua yang Anda Butuhkan untuk Menyelenggarakan.' : 'Everything You Need To Host.'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {isId
                ? 'Infrastruktur modern yang siap mendukung presentasi berdampak, jamuan, dan pertemuan eksekutif.'
                : 'State-of-the-art infrastructure ready to power high-impact presentations, banquets, and executive gatherings.'}
            </p>
          </div>

          {/* Amenities Grid: Clean, Lightweight Hospitality Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {includedAmenities.map((amenity, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 hover:border-[#EA8E18]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-default"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-[#EA8E18] border border-amber-500/20 flex items-center justify-center group-hover:bg-[#EA8E18] group-hover:border-[#EA8E18] group-hover:text-white transition-all duration-300 shrink-0 shadow-2xs">
                        <GoogleIcon name={amenity.iconName} className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 group-hover:text-[#EA8E18] transition-colors">
                        {amenity.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium font-heading text-slate-900 group-hover:text-[#EA8E18] transition-colors tracking-tight mb-2">
                        {amenity.name}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {amenity.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. SUITABLE OCCASIONS / REAL PHOTO SHOWCASE */}
        {/* ========================================================================= */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-white space-y-12">
            <div className="max-w-2xl text-left sm:text-center sm:mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading tracking-tight text-white leading-tight">
                Perfect for Any Occasion.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Versatile spatial layouts and partition systems engineered to accommodate intimate executive sessions or full-scale company gatherings.
              </p>
            </div>

            {/* Occasion Cards: Real Room Photographs & Capacities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: 'Corporate Seminars & Keynotes',
                  setup: 'Theatre Configuration',
                  capacity: 'Up to 140 Guests',
                  desc: 'Acoustic-treated hall with motorized projection and integrated audio for company townhalls, keynotes, and seminars.',
                  image: '/Function Room/Theatre.webp',
                },
                {
                  name: 'Training & Workshops',
                  setup: 'Classroom Configuration',
                  capacity: 'Up to 100 Guests',
                  desc: 'Ergonomic desk rows with clear presentation sightlines and high-speed Wi-Fi for interactive sessions.',
                  image: '/Function Room/Class Room.webp',
                },
                {
                  name: 'Private Celebrations & Banquets',
                  setup: 'Banquet Configuration (Round Table)',
                  capacity: 'Up to 70 Guests',
                  desc: 'Elegant circular dining arrangements with customizable ambient lighting for gala dinners and corporate celebrations.',
                  image: '/Function Room/Ron Table.webp',
                },
                {
                  name: 'Board & Executive Meetings',
                  setup: 'Executive U-Shape Configuration',
                  capacity: 'Up to 100 Guests',
                  desc: 'Perimeter table arrangement fostering direct eye contact and discussion for board meetings and executive summits.',
                  image: '/Function Room/U SHape.webp',
                },
                {
                  name: 'Product Launches & Showcases',
                  setup: 'Stage & Reception Configuration',
                  capacity: 'Up to 180 Guests',
                  desc: 'High-ceiling presentation stage ready for brand reveals, press debuts, and VIP showcases.',
                  image: '/BUILDING/FR 01.webp',
                },
                {
                  name: 'Community Gatherings & Networking',
                  setup: 'Modular Breakout Configuration',
                  capacity: 'Flexible Layout',
                  desc: 'Adaptable acoustic partitions allowing simultaneous networking hubs, creative panels, and social gatherings.',
                  image: '/BUILDING/FR 02.webp',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/80 hover:border-[#EA8E18]/60 transition-transform duration-200 flex flex-col justify-between group cursor-default"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/90 text-white text-xs font-medium border border-white/20">
                      {item.capacity}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <div className="text-xs font-medium text-[#EA8E18]">
                      {item.setup}
                    </div>
                    <h3 className="text-lg font-medium font-heading text-white group-hover:text-[#EA8E18] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        
        
        <section id="book-room" className="py-12 sm:py-20 bg-slate-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-[40px] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-200/60">

              
              <div className="lg:w-2/5 relative min-h-[420px] lg:min-h-auto bg-slate-900 flex flex-col justify-end p-6 sm:p-10">
                <img
                  src="/ballroom.webp?v=20260825"
                  alt="HQuarters Function Room"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />

                <div className="relative z-10 bg-[#161a25] rounded-2xl p-6 sm:p-8 shadow-xl border border-white/5 mt-auto space-y-4">
                  <span className="bg-[#EA8E18] text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md inline-block shadow-sm">
                    {t.eventPage.bookTheRoom}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-medium font-heading text-white leading-tight">
                    {t.eventPage.tellUsTitle}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {t.eventPage.tellUsDesc}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs text-slate-300 font-normal">
                    <div className="font-medium text-white text-xs">
                      Function Room HQuarters — Upper Ground Floor (UG)
                    </div>
                    <div className="flex items-start gap-2 text-slate-400 font-normal">
                      <MapPin className="w-3.5 h-3.5 text-[#EA8E18] shrink-0 mt-0.5" />
                      <span>Jl. Asia Afrika No. 158, Bandung, Jawa Barat — 40261</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-normal">
                      <Phone className="w-3.5 h-3.5 text-[#EA8E18] shrink-0" />
                      <span>022-4205077 / 0821-2200-2268</span>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="lg:w-3/5 p-8 sm:p-12 lg:p-14">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-medium font-heading text-[#231f20]">
                      {t.eventPage.inquiryReceived}
                    </h3>
                    <p className="text-[#3a3836] max-w-sm mx-auto text-sm leading-relaxed font-normal">
                      {t.eventPage.inquiryReceivedDesc.replace('{name}', formData.name)}
                    </p>
                    <button
                      id="btn-event-form-resubmit"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider transition-colors"
                    >
                      {t.eventPage.submitAnother}
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-8">

                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-medium font-heading text-[#231f20]">
                          {t.eventPage.selectRoomTitle}
                        </h3>
                        <p className="text-sm text-[#3a3836] mt-1 font-normal">
                          {t.eventPage.selectRoomDesc}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3 h-3 text-[#EA8E18]" /> {t.eventPage.preferredRoom}
                          </label>
                          <CustomSelect
                            value={formData.selectedRoom}
                            onChange={(val) => setFormData({ ...formData, selectedRoom: val })}
                            options={[
                              { value: 'Room 1 & Room 2 (Combined)', label: 'Room 1 & Room 2 (Combined)' },
                              { value: 'Room 1 (140.4 m²)', label: 'Room 1 (140.4 m²)' },
                              { value: 'Room 2 (157.5 m²)', label: 'Room 2 (157.5 m²)' },
                            ]}
                          />
                        </div>
                    </div>

                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-medium font-heading text-[#231f20]">
                          {t.eventPage.completeDetailsTitle}
                        </h3>
                        <p className="text-sm text-[#3a3836] mt-1 font-normal">
                          {t.eventPage.completeDetailsDesc}
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                              <Users className="w-3 h-3 text-[#EA8E18]" /> {t.eventPage.nameLabel}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t.eventPage.namePlaceholder}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all font-normal"
                            />
                            {touched && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-[#EA8E18]" /> {t.eventPage.waLabel}
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder={t.eventPage.waPlaceholder}
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all font-normal"
                            />
                            {touched && errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-[#EA8E18]" /> {t.eventPage.emailLabel}
                            </label>
                            <input
                              type="email"
                              required
                              placeholder={t.eventPage.emailPlaceholder}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all font-normal"
                            />
                            {touched && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                              <Building className="w-3 h-3 text-slate-400" /> {t.eventPage.companyLabel}
                            </label>
                            <input
                              type="text"
                              placeholder={t.eventPage.companyPlaceholder}
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all font-normal"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 text-slate-400" /> {t.eventPage.notesLabel}
                          </label>
                          <textarea
                            rows="4"
                            placeholder={t.eventPage.notesPlaceholder}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all resize-none font-normal"
                          />
                        </div>

                        
                        <button
                          id="btn-event-form-submit"
                          type="submit"
                          className="w-full py-4 mt-2 rounded-xl bg-[#151a27] hover:bg-black text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          <span>{t.eventPage.submitInquiry}</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>

                        <p className="text-center text-[10px] text-slate-400 mt-3 font-normal">
                          Your information is secure and will only be used by HQuarters management.
                        </p>
                      </form>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        
        <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-tight">
              {t.eventPage.heroTitlePrefix} <span className="text-[#EA8E18]">{t.eventPage.heroTitleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Function Room HQuarters — Upper Ground Floor (UG), Asia Afrika Bandung
            </p>
          </div>
        </section>

      </main>

      
      {isLightboxOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <h4 className="text-lg sm:text-xl font-medium font-heading">{functionRoomSlides[currentSlide].title}</h4>
              <p className="text-xs sm:text-sm text-[#EA8E18] font-semibold">{functionRoomSlides[currentSlide].category}</p>
            </div>
            <button
              id="btn-event-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full relative">
            <img
              src={functionRoomSlides[currentSlide].src}
              alt={functionRoomSlides[currentSlide].title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />

            {functionRoomSlides.length > 1 && (
              <>
                <button
                  id="btn-event-lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-event-lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-center text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-normal">
            <p>{functionRoomSlides[currentSlide].desc}</p>
          </div>
        </div>,
        document.body
      )}

      
      {galleryLightboxOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <h4 className="text-lg sm:text-xl font-medium font-heading">{functionRoomFacilities[galleryImgIndex]?.title}</h4>
            </div>
            <button
              id="btn-event-gallery-lightbox-close"
              onClick={() => setGalleryLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full relative">
            <img
              src={functionRoomFacilities[galleryImgIndex]?.src}
              alt={functionRoomFacilities[galleryImgIndex]?.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />

            {functionRoomFacilities.length > 1 && (
              <>
                <button
                  id="btn-event-gallery-lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryImgIndex((prev) => (prev === 0 ? functionRoomFacilities.length - 1 : prev - 1));
                  }}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  id="btn-event-gallery-lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryImgIndex((prev) => (prev === functionRoomFacilities.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-[#EA8E18] text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
