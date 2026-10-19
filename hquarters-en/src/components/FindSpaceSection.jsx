import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Home,
  Briefcase,
  Sparkles,
  CheckCircle2,
  User,
  Phone,
  Building,
  MessageSquare,
  Navigation,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { validateEmail } from '../lib/emailValidation.js';

export default function FindSpaceSection({ 
  initialSpace = 'Premium Office', 
  initialNotes = '',
  badge,
  title,
  description,
  image
}) {
  const { language, t } = useLanguage();
  const [selectedSpace, setSelectedSpace] = useState(initialSpace);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    notes: initialNotes,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const isId = language === 'id';

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = isId ? 'Nama lengkap wajib diisi' : 'Name is required';
    else if (formData.name.trim().length < 2) errs.name = isId ? 'Nama minimal 2 karakter' : 'Name must be at least 2 characters';

    // Strict email domain validation & typo prevention
    const emailRes = validateEmail(formData.email, isId);
    if (!emailRes.isValid) {
      errs.email = emailRes.error;
    }

    // SOW Requirement: Minimum 8 digits phone validation
    const digits = formData.whatsapp.replace(/\D/g, '');
    if (!digits) errs.whatsapp = isId ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required';
    else if (digits.length < 8) errs.whatsapp = isId ? 'Nomor WhatsApp minimal 8 digit angka' : 'WhatsApp number must be at least 8 digits';
    else if (digits.length > 16) errs.whatsapp = isId ? 'Nomor WhatsApp terlalu panjang' : 'WhatsApp number is too long';
    return errs;
  };

  React.useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialNotes]);

  React.useEffect(() => {
    if (initialSpace) {
      setSelectedSpace(initialSpace);
    }
  }, [initialSpace]);

  const spaceCopywriting = {
    en: {
      'Premium Office': {
        badge: 'FIND YOUR NEXT OFFICE',
        title: 'Tell Us What Your Team Needs.',
        description: "We'll match you to available office spaces by area, floor and move-in timeline — with a tailored rental proposal, not a public price list.",
        image: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp?v=20260823',
      },
      'SOHO': {
        badge: 'FIND MY SOHO',
        title: "Let's Find A Space That Fits Your Life.",
        description: 'Configure your SOHO unit for living, working, or a representative private studio.',
        image: '/SPACES/SOHO/SOHO 01.webp?v=20260823',
      },
      'Serviced Office': {
        badge: 'TURNKEY OFFICE',
        title: 'Find The Right Office Suite.',
        description: 'Fully furnished, high-speed fiber internet, meeting rooms, and reception support included.',
        image: '/SPACES/SERVICED OFFICE/1.webp?v=20260823',
      },
      'Virtual Office': {
        badge: 'PRESTIGE ADDRESS',
        title: 'Establish Your Corporate Presence.',
        description: 'Get a prestigious Asia Afrika CBD domicile, mail handling, call answering, and meeting room access to grow your enterprise credibility.',
        image: '/SPACES/SERVICED OFFICE/6.webp?v=20260823',
      },
      'Function Room': {
        badge: 'EVENT VENUE',
        title: 'Plan Your Next Corporate Gathering.',
        description: 'State-of-the-art audiovisual setups, flexible seating, and dedicated event support for board meetings, seminars, and banquets.',
        image: '/BUILDING/FR 01.webp?v=20260823',
      },
    },
    id: {
      'Premium Office': {
        badge: 'TEMUKAN KANTOR ANDA',
        title: 'Beri Tahu Kami Apa yang Dibutuhkan Tim Anda.',
        description: 'Kami akan mencocokkan Anda dengan ruang kantor yang tersedia berdasarkan luas, lantai, dan jadwal pindah — dengan proposal sewa yang disesuaikan.',
        image: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp?v=20260823',
      },
      'SOHO': {
        badge: 'TEMUKAN SOHO SAYA',
        title: 'Temukan Ruang yang Cocok untuk Anda.',
        description: 'Atur unit SOHO Anda untuk hunian, bekerja, atau studio privat yang representatif.',
        image: '/SPACES/SOHO/SOHO 01.webp?v=20260823',
      },
      'Serviced Office': {
        badge: 'KANTOR SIAP PAKAI',
        title: 'Temukan Suite Kantor yang Tepat.',
        description: 'Lengkap dengan furnitur, internet serat optik berkecepatan tinggi, ruang rapat, dan layanan resepsionis.',
        image: '/SPACES/SERVICED OFFICE/1.webp?v=20260823',
      },
      'Virtual Office': {
        badge: 'ALAMAT PRESTISIUS',
        title: 'Bangun Kehadiran Bisnis Anda.',
        description: 'Dapatkan domisili prestisius di CBD Asia Afrika Bandung, layanan penanganan surat, dan akses ruang rapat.',
        image: '/SPACES/SERVICED OFFICE/6.webp?v=20260823',
      },
      'Function Room': {
        badge: 'RUANG ACARA',
        title: 'Rencanakan Acara Korporat Anda.',
        description: 'Tata letak audio visual modern, pengaturan tempat duduk fleksibel, dan dukungan khusus untuk seminar dan jamuan.',
        image: '/BUILDING/FR 01.webp?v=20260823',
      },
    },
  };

  const activeSpaceCopy = spaceCopywriting[language]?.[selectedSpace] || spaceCopywriting.en[selectedSpace];

  const currentCopy = {
    badge: badge ?? activeSpaceCopy?.badge ?? (isId ? 'KONSULTASI RUANG' : 'EXPERT CONSULTATION'),
    title: title ?? activeSpaceCopy?.title ?? (isId ? 'Beri Tahu Kami Kebutuhan Anda.' : 'Tell Us What You Need.'),
    description: description ?? activeSpaceCopy?.description ?? '',
    image: image || activeSpaceCopy?.image || '/SPACES/PREMIUM OFFICE/Premium Office 06.webp?v=20260823',
  };

  const spaceOptions = [
    { id: 'premium', label: 'Premium Office', value: 'Premium Office' },
    { id: 'soho', label: 'SOHO', value: 'SOHO' },
    { id: 'serviced', label: 'Serviced Office', value: 'Serviced Office' },
    { id: 'virtual', label: 'Virtual Office', value: 'Virtual Office' },
    { id: 'event', label: 'Function Room', value: 'Function Room' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm();
    setTouched(true);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const lines = isId
      ? [`Halo HQuarters! Saya ingin tahu lebih lanjut tentang *${selectedSpace}*.`]
      : [`Hello HQuarters! I would like to inquire about *${selectedSpace}*.`];

    lines.push(isId ? `Nama: ${formData.name}` : `Name: ${formData.name}`);
    if (formData.email) lines.push(`Email: ${formData.email}`);
    lines.push(isId ? `WhatsApp: ${formData.whatsapp}` : `WhatsApp: ${formData.whatsapp}`);
    if (formData.company) lines.push(isId ? `Perusahaan: ${formData.company}` : `Company: ${formData.company}`);
    if (formData.notes) lines.push(isId ? `Catatan: ${formData.notes}` : `Notes: ${formData.notes}`);

    const gtmFormName = { 'SOHO': 'soho', 'Premium Office': 'premium_office', 'Serviced Office': 'serviced_office', 'Virtual Office': 'virtual_office', 'Function Room': 'function_room' }[selectedSpace];
    if (gtmFormName) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'lead_form_success', form_name: gtmFormName });
    }

    window.open(`https://wa.me/628111908319?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    setSubmitted(true);
  };

  const getSubmitButtonLabel = () => {
    if (isId) {
      switch (selectedSpace) {
        case 'SOHO': return t.findSpace.submitButtons.soho;
        case 'Serviced Office': return t.findSpace.submitButtons.serviced;
        case 'Virtual Office': return t.findSpace.submitButtons.virtual;
        case 'Function Room': return t.findSpace.submitButtons.function;
        default: return t.findSpace.submitButtons.default;
      }
    }
    switch (selectedSpace) {
      case 'SOHO': return 'Find My SOHO Unit';
      case 'Serviced Office': return 'Request Serviced Office Tour';
      case 'Virtual Office': return 'Inquire Virtual Office Package';
      case 'Function Room': return 'Inquire Function Room Booking';
      default: return 'Request Floorplan & Proposal';
    }
  };

  return (
    <section id="find-space" className="py-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-[40px] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-slate-200/60">
          
          <div className="lg:w-2/5 relative min-h-[220px] sm:min-h-[320px] lg:min-h-auto bg-slate-900 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
            <img loading="lazy"
              src={currentCopy.image}
              alt="HQuarters Workspace"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-all duration-500"
            />
            <div className="relative z-10 bg-[#161a25]/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-xl border border-white/10 mt-auto space-y-2.5">
              <span className="bg-[#EA8E18] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md inline-block shadow-sm">
                {currentCopy.badge}
              </span>
              <h2 className="text-xl sm:text-3xl font-medium font-heading text-white leading-tight">
                {currentCopy.title}
              </h2>
              {currentCopy.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentCopy.description}
                </p>
              )}
            </div>
          </div>

          <div className="lg:w-3/5 p-5 sm:p-8 lg:p-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900">
                  {isId ? 'Permintaan Diterima!' : 'Request Received!'}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  {isId ? (
                    <>
                      Terima kasih, <strong className="text-slate-900">{formData.name}</strong>. Tim konsultan HQuarters akan segera menghubungi Anda melalui WhatsApp di <strong className="text-slate-900">{formData.whatsapp}</strong> mengenai konsultasi <strong>{selectedSpace}</strong>.
                    </>
                  ) : (
                    <>
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our HQuarters workplace advisors will reach out via WhatsApp at <strong className="text-slate-900">{formData.whatsapp}</strong> regarding your <strong>{selectedSpace}</strong> inquiry.
                    </>
                  )}
                </p>
                <button
                  id="btn-find-space-resubmit"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-7 py-3 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  {isId ? 'Kirim Permintaan Lain' : 'Submit Another Request'}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-xl font-medium font-heading text-slate-900">
                      {isId ? '1. Pilih Kategori Ruang' : '1. Select Space Type'}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-bold text-[#EA8E18] uppercase tracking-wider">
                      {selectedSpace}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {spaceOptions.map((opt) => {
                      const isSelected = selectedSpace === opt.value;
                      return (
                        <button
                          key={opt.id}
                          id={`btn-space-type-${opt.id}`}
                          type="button"
                          onClick={() => setSelectedSpace(opt.value)}
                          className={`py-2.5 px-2.5 sm:px-3 rounded-xl border text-center transition-all cursor-pointer text-xs font-bold font-heading truncate ${
                            isSelected 
                              ? 'border-[#EA8E18] bg-[#FEF3E2] text-[#EA8E18] shadow-xs' 
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          } ${opt.id === 'event' ? 'col-span-2 sm:col-span-1' : ''}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium font-heading text-slate-900">
                      {isId ? '2. Lengkapi Data Anda' : '2. Complete Your Details'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isId ? 'Bagikan data Anda dan tim kami akan segera menghubungi Anda.' : 'Share your details and our team will get back to you shortly.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3 h-3 text-[#EA8E18]" /> {t.findSpace.fullName} *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t.findSpace.fullNamePlaceholder}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                        />
                        {touched && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#EA8E18]" /> {t.findSpace.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={t.findSpace.phonePlaceholder}
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                        />
                        {touched && errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* SOW Requirement: Box Section Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#EA8E18]" /> {t.findSpace.email} *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={t.findSpace.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                        />
                        {touched && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-slate-400" /> {t.findSpace.company}
                        </label>
                        <input
                          type="text"
                          placeholder={t.findSpace.companyPlaceholder}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-slate-400" /> {t.findSpace.notes}
                      </label>
                      <textarea
                        rows="3"
                        placeholder={t.findSpace.notesPlaceholder}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        id="btn-find-space-submit"
                        type="submit"
                        className="w-full py-3.5 sm:py-4 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
                      >
                        <span>{getSubmitButtonLabel()}</span>
                        <Navigation className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
                      {isId ? 'Informasi Anda aman dan hanya digunakan oleh manajemen HQuarters.' : 'Your information is confidential and will only be used by HQuarters management.'}
                    </p>
                  </form>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
