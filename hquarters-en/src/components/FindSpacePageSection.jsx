import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building,
  Layers,
  Armchair,
  Globe,
  Presentation,
  CheckCircle2,
  MessageSquare,
  User,
  Phone,
  Building2,
  Mail,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { validateEmail } from '../lib/emailValidation.js';

export default function FindSpacePageSection({ setCurrentPage }) {
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

    const emailRes = validateEmail(formData.email, isId);
    if (!emailRes.isValid) {
      errs.email = emailRes.error;
    }

    const digits = formData.whatsapp.replace(/\D/g, '');
    if (!digits) errs.whatsapp = isId ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required';
    else if (digits.length < 8) errs.whatsapp = isId ? 'Nomor WhatsApp minimal 8 digit angka' : 'WhatsApp number must be at least 8 digits';
    else if (digits.length > 16) errs.whatsapp = isId ? 'Nomor WhatsApp terlalu panjang' : 'WhatsApp number is too long';
    return errs;
  };

  const spaceOptions = [
    {
      id: 'premium',
      label: 'Premium Office',
      value: 'Premium Office',
      icon: Building,
    },
    {
      id: 'soho',
      label: 'SOHO Duplex',
      value: 'SOHO',
      icon: Layers,
    },
    {
      id: 'serviced',
      label: 'Serviced Office',
      value: 'Serviced Office',
      icon: Armchair,
    },
    {
      id: 'virtual',
      label: 'Virtual Office',
      value: 'Virtual Office',
      icon: Globe,
    },
    {
      id: 'event',
      label: 'Function Room',
      value: 'Function Room',
      icon: Presentation,
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
    <section id="find-space" className="pt-2 sm:pt-4 pb-20 sm:pb-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <button
            id="btn-find-space-breadcrumb-home"
            onClick={() => {
              if (setCurrentPage) setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
            className="hover:text-[#EA8E18] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">{isId ? 'Konsultasi Ruang' : 'Find My Space'}</span>
        </nav>

        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
            {isId ? 'KONSULTASI & DENAH' : 'INQUIRY & FLOORPLAN'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight">
            {isId ? (
              <>Beri Tahu Kami <span className="text-[#EA8E18]">Kebutuhan Anda.</span></>
            ) : (
              <>Tell Us <span className="text-[#EA8E18]">What You Need.</span></>
            )}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            {isId
              ? 'Pilih kategori ruang dan isi informasi Anda. Tim HQuarters akan mengirimkan denah, ketersediaan unit, dan proposal resmi via WhatsApp.'
              : 'Select your preferred space category and share your contact details. Our team will promptly provide floorplans, availability, and rental proposals.'}
          </p>
        </div>

        {/* Main Clean Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-10 lg:p-12 space-y-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 sm:py-16 text-center space-y-4 max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#EA8E18] border border-[#EA8E18]/20 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900">
                {isId ? 'Permintaan Terkirim!' : 'Request Received!'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isId ? (
                  <>Terima kasih, <strong className="text-slate-900">{formData.name}</strong>. Tim Workplace Advisor HQuarters akan segera menghubungi Anda di <strong className="text-slate-900">{formData.whatsapp}</strong> mengenai konsultasi <strong className="text-[#EA8E18]">{selectedSpace}</strong>.</>
                ) : (
                  <>Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our HQuarters advisors will reach out via WhatsApp at <strong className="text-slate-900">{formData.whatsapp}</strong> regarding your <strong className="text-[#EA8E18]">{selectedSpace}</strong> request.</>
                )}
              </p>
              <div className="pt-4">
                <button
                  id="btn-page-find-space-resubmit"
                  onClick={() => setSubmitted(false)}
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  {isId ? 'Kirim Permintaan Lain' : 'Submit Another Inquiry'}
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Clean Space Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {isId ? '1. Pilih Kategori Ruang' : '1. Select Space Type'}
                  </label>
                  <span className="text-xs font-semibold text-[#EA8E18] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    {selectedSpace}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {spaceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedSpace === opt.value;
                    return (
                      <button
                        key={opt.id}
                        id={`btn-page-space-type-${opt.id}`}
                        type="button"
                        onClick={() => setSelectedSpace(opt.value)}
                        className={`p-3.5 sm:p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-[1.02]'
                            : 'bg-white hover:bg-slate-50/80 text-slate-700 border-slate-200/80 hover:border-[#EA8E18]/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 transition-colors ${isSelected ? 'text-[#EA8E18]' : 'text-slate-400 group-hover:text-[#EA8E18]'}`} />
                        <span className="text-xs sm:text-sm font-semibold leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Step 2: Form Inputs */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  {isId ? '2. Informasi Kontak Anda' : '2. Your Contact Information'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.findSpace.fullName}</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.findSpace.fullNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#EA8E18] focus:ring-2 focus:ring-[#EA8E18]/15 transition-all"
                    />
                    {touched && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.findSpace.phone}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t.findSpace.phonePlaceholder}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#EA8E18] focus:ring-2 focus:ring-[#EA8E18]/15 transition-all"
                    />
                    {touched && errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.findSpace.email}</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.findSpace.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#EA8E18] focus:ring-2 focus:ring-[#EA8E18]/15 transition-all"
                    />
                    {touched && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.findSpace.company}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t.findSpace.companyPlaceholder}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#EA8E18] focus:ring-2 focus:ring-[#EA8E18]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.findSpace.notes}</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder={t.findSpace.notesPlaceholder}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/60 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#EA8E18] focus:ring-2 focus:ring-[#EA8E18]/15 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button & Assurance */}
              <div className="pt-2 space-y-4">
                <button
                  id="btn-page-find-space-submit"
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#EA8E18]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{getSubmitButtonLabel()}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isId ? 'Privasi terjamin & respon resmi dari HQuarters' : 'Confidential & direct response from HQuarters'}</span>
                  </span>
                  <a
                    href="https://wa.me/628111908319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-700 hover:text-[#EA8E18] transition-colors flex items-center gap-1"
                  >
                    <span>WhatsApp Hotline:</span>
                    <strong className="text-slate-900">+62 811 1908 319</strong>
                  </a>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
