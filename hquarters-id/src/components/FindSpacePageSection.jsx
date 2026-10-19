import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Home,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
  User,
  Phone,
  Building,
  ShieldCheck,
  Calendar,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { validateEmail } from '../lib/emailValidation.js';

export default function FindSpacePageSection() {
  const { language, t } = useLanguage();
  const [selectedSpace, setSelectedSpace] = useState('Premium Office');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    notes: '',
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

  const spaceOptions = isId
    ? [
        {
          id: 'premium',
          label: 'Saya butuh Premium Office',
          value: 'Premium Office',
          icon: Building2,
          desc: 'Untuk tim mapan & kantor pusat korporasi',
        },
        {
          id: 'soho',
          label: 'Saya ingin memiliki SOHO',
          value: 'SOHO',
          icon: Home,
          desc: 'Gabungan fleksibel ruang tinggal & ruang kerja',
        },
        {
          id: 'serviced',
          label: 'Saya butuh Serviced Office',
          value: 'Serviced Office',
          icon: Briefcase,
          desc: 'Kantor siap pakai lengkap untuk tim yang bergerak cepat',
        },
        {
          id: 'virtual',
          label: 'Saya butuh Virtual Office',
          value: 'Virtual Office',
          icon: Sparkles,
          desc: 'Alamat bisnis prestisius di CBD & layanan surat',
        },
        {
          id: 'event',
          label: 'Saya ingin memesan Function Room',
          value: 'Function Room',
          icon: Calendar,
          desc: 'Ruang fleksibel untuk acara korporasi, seminar & jamuan',
        },
      ]
    : [
        {
          id: 'premium',
          label: 'I need a Premium Office',
          value: 'Premium Office',
          icon: Building2,
          desc: 'For established teams & corporate headquarters',
        },
        {
          id: 'soho',
          label: 'I want to Own a SOHO',
          value: 'SOHO',
          icon: Home,
          desc: 'Flexible fusion of living & working space',
        },
        {
          id: 'serviced',
          label: 'I need a Serviced Office',
          value: 'Serviced Office',
          icon: Briefcase,
          desc: 'Fully equipped turnkey office for fast teams',
        },
        {
          id: 'virtual',
          label: 'I need a Virtual Office',
          value: 'Virtual Office',
          icon: Sparkles,
          desc: 'Prestige CBD business address & mail service',
        },
        {
          id: 'event',
          label: 'I want to book Function Room',
          value: 'Function Room',
          icon: Calendar,
          desc: 'Flexible hall for corporate events, seminars & banquets',
        },
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
      default: return 'Request Proposal & Floorplan';
    }
  };

  return (
    <section id="find-space" className="pt-4 sm:pt-6 pb-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-medium text-slate-900 font-heading tracking-tight">
            {isId ? (
              <>Beri Tahu Kami <span className="text-[#E8860B]">Apa yang Anda Butuhkan.</span></>
            ) : (
              <>Tell Us <span className="text-[#E8860B]">What You Need.</span></>
            )}
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {isId ? 'Bagikan data Anda dan tim kami akan segera menghubungi Anda.' : 'Share your details and our team will get back to you shortly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1200px] mx-auto items-stretch">
          
          <div className="lg:col-span-5 flex flex-col gap-3.5 h-full">
            {spaceOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedSpace === opt.value;
              return (
                <button
                  key={opt.id}
                  id={`btn-page-space-type-${opt.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedSpace(opt.value);
                    setSubmitted(false);
                  }}
                  className={`p-4 sm:p-5 lg:p-6 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between group cursor-pointer lg:flex-1 shrink-0 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.01] lg:scale-[1.02] z-10'
                      : 'bg-slate-50/80 text-slate-900 border-slate-200/80 hover:bg-white hover:border-[#E8860B]/40 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-[#E8860B]" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#E8860B] text-white'
                          : 'bg-white border border-slate-200 text-slate-800 group-hover:bg-[#FEF3E2] group-hover:text-[#B86807]'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="font-bold text-base font-heading leading-snug">
                      {opt.label}
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 w-full h-full">
            <motion.div
              layout
              className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isId ? 'Kategori Terpilih:' : 'Selected Space:'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FEF3E2] text-[#B86807] font-extrabold text-xs">
                    {selectedSpace}
                  </span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4 my-auto"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium font-heading text-slate-900">
                    {isId ? 'Permintaan Terkirim dengan Sukses!' : 'Inquiry Submitted Successfully!'}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    {isId ? (
                      <>Terima kasih, <strong className="text-slate-900">{formData.name}</strong>. Tim konsultan HQuarters akan menghubungi Anda via WhatsApp (<strong className="text-slate-900">{formData.whatsapp}</strong>) mengenai penawaran & jadwal survei <strong className="text-[#E8860B]">{selectedSpace}</strong>.</>
                    ) : (
                      <>Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our HQuarters workplace advisors will contact you on WhatsApp (<strong className="text-slate-900">{formData.whatsapp}</strong>) regarding <strong className="text-[#E8860B]">{selectedSpace}</strong> pricing & site tour availability within 15 minutes.</>
                    )}
                  </p>
                  <button
                    id="btn-page-find-space-resubmit"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all mt-4 cursor-pointer"
                  >
                    {isId ? 'Kirim Permintaan Lain' : 'Submit Another Inquiry'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1 justify-between">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#E8860B]" />
                          <span>{t.findSpace.fullName} *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t.findSpace.fullNamePlaceholder}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#E8860B] focus:ring-1 focus:ring-[#E8860B] transition-all"
                        />
                        {touched && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#E8860B]" />
                          <span>{t.findSpace.phone} *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={t.findSpace.phonePlaceholder}
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#E8860B] focus:ring-1 focus:ring-[#E8860B] transition-all"
                        />
                        {touched && errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* SOW Requirement: Box Section Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#E8860B]" />
                          <span>{t.findSpace.email} *</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={t.findSpace.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#E8860B] focus:ring-1 focus:ring-[#E8860B] transition-all"
                        />
                        {touched && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{t.findSpace.company}</span>
                        </label>
                        <input
                          type="text"
                          placeholder={t.findSpace.companyPlaceholder}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#E8860B] focus:ring-1 focus:ring-[#E8860B] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.findSpace.notes}</span>
                      </label>
                      <textarea
                        rows="3"
                        placeholder={t.findSpace.notesPlaceholder}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:bg-white focus:outline-none focus:border-[#E8860B] focus:ring-1 focus:ring-[#E8860B] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 shrink-0">
                    <button
                      id="btn-page-find-space-submit"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#E8860B] hover:bg-[#d67a0a] text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#E8860B]/20 hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{getSubmitButtonLabel()}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
                      {isId ? 'Informasi Anda aman dan hanya digunakan oleh manajemen HQuarters.' : 'Your information is secure and will only be used by HQuarters management.'}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
