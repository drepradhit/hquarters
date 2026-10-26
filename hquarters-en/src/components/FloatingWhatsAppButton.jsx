import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { validateEmail } from '../lib/emailValidation.js';
import { sendLeadToSheet } from '../lib/leadWebhook.js';

export default function FloatingWhatsAppButton() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    space: 'Premium Office',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const phoneNumber = '628111908319';
  const isId = language === 'id';

  const spaceCategories = [
    { id: 'Premium Office', label: t.whatsapp?.options?.premium || t.whatsapp?.categories?.premium || 'Premium Office' },
    { id: 'SOHO', label: t.whatsapp?.options?.soho || t.whatsapp?.categories?.soho || 'SOHO' },
    { id: 'Serviced Office', label: t.whatsapp?.options?.serviced || t.whatsapp?.categories?.serviced || 'Serviced Office' },
    { id: 'Virtual Office', label: t.whatsapp?.options?.virtual || t.whatsapp?.categories?.virtual || 'Virtual Office' },
    { id: 'Function Room', label: t.whatsapp?.options?.functionRoom || t.whatsapp?.categories?.function || 'Function Room' },
    { id: 'General Consultation', label: t.whatsapp?.options?.consultation || t.whatsapp?.categories?.consultation || 'General Consultation' },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = isId ? 'Nama lengkap wajib diisi' : 'Full name is required';
    }
    const emailRes = validateEmail(formData.email, isId);
    if (!emailRes.isValid) {
      errs.email = emailRes.error;
    }
    const digits = formData.whatsapp.replace(/\D/g, '');
    if (!digits) {
      errs.whatsapp = isId ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required';
    } else if (digits.length < 8) {
      errs.whatsapp = isId ? 'Minimal 8 digit angka' : 'Minimum 8 digits';
    } else if (digits.length > 15) {
      errs.whatsapp = isId ? 'Nomor telepon tidak valid' : 'Invalid phone number';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    // Clean phone number format: if starts with 0 or 62
    let cleanWa = formData.whatsapp.replace(/\D/g, '');
    if (cleanWa.startsWith('0')) {
      cleanWa = '62' + cleanWa.slice(1);
    } else if (!cleanWa.startsWith('62')) {
      cleanWa = '62' + cleanWa;
    }

    const lines = isId
      ? [
          'Halo HQuarters Bandung! Saya ingin berkonsultasi mengenai ruang kantor.',
          '',
          `• *Nama Lengkap:* ${formData.name}`,
          ...(formData.email.trim() ? [`• *Email:* ${formData.email.trim()}`] : []),
          `• *Nomor WhatsApp:* +${cleanWa}`,
          `• *Kategori Ruang:* ${formData.space}`,
        ]
      : [
          'Hello HQuarters Bandung! I would like to consult regarding office spaces.',
          '',
          `• *Full Name:* ${formData.name}`,
          ...(formData.email.trim() ? [`• *Email:* ${formData.email.trim()}`] : []),
          `• *WhatsApp:* +${cleanWa}`,
          `• *Space Category:* ${formData.space}`,
        ];

    if (formData.notes.trim()) {
      lines.push(isId ? `• *Catatan / Kebutuhan:* ${formData.notes.trim()}` : `• *Notes / Requirements:* ${formData.notes.trim()}`);
    }
    lines.push('', isId ? 'Mohon informasi ketersediaan unit dan jadwal survei lokasi. Terima kasih!' : 'Please share unit availability and location survey schedule. Thank you!');

    sendLeadToSheet({
      source: 'CTA WhatsApp Floating',
      name: formData.name,
      email: formData.email,
      whatsapp: cleanWa,
      space: formData.space,
      notes: formData.notes,
    });

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button - Clean, professional, NO glow */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        <button
          id="btn-floating-whatsapp-trigger"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t.whatsapp?.floatingBtn || 'Chat on WhatsApp'}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.2]" />
          ) : (
            <svg
              className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bespoke Luxury Concierge Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Architecture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-[440px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 z-10 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Clean White & Orange Header */}
              <div className="bg-white px-6 pt-6 pb-4 text-slate-900 relative border-b border-slate-100 shrink-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#EA8E18] inline-block">
                      HQuarters Bandung
                    </span>
                    <h3 className="text-xl font-heading font-medium tracking-tight text-slate-900">
                      {isId ? 'Konsultasi Ruang Kerja' : 'Direct Leasing Advisory'}
                    </h3>
                  </div>

                  <button
                    id="btn-floating-whatsapp-close"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 -mr-1 -mt-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  {isId
                    ? 'Terhubung langsung dengan tim representatif resmi HQuarters Asia Afrika.'
                    : 'Connect directly with HQuarters Asia Afrika leasing specialists.'}
                </p>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-4 text-slate-900">
                <form id="wa-concierge-form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase flex items-center justify-between">
                      <span>{t.whatsapp?.fullName || t.whatsapp?.nameLabel || (isId ? 'Nama Lengkap' : 'Full Name')}</span>
                      <span className="text-[#EA8E18] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.whatsapp?.fullNamePlaceholder || t.whatsapp?.namePlaceholder || (isId ? 'Nama lengkap Anda' : 'Your full name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:bg-white text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                    />
                    {touched && errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase flex items-center justify-between">
                      <span>{t.whatsapp?.email || t.whatsapp?.emailLabel || (isId ? 'Alamat Email' : 'Email Address')}</span>
                      <span className="text-[#EA8E18] font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.whatsapp?.emailPlaceholder || (isId ? 'nama@perusahaan.com' : 'e.g. name@company.com')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:bg-white text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all"
                    />
                    {touched && errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
                  </div>

                  {/* WhatsApp Number with Country Code */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase flex items-center justify-between">
                      <span>{t.whatsapp?.phone || t.whatsapp?.phoneLabel || (isId ? 'Nomor WhatsApp' : 'WhatsApp Number')}</span>
                      <span className="text-[#EA8E18] font-bold">*</span>
                    </label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 focus-within:border-[#EA8E18] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#EA8E18] transition-all overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3 bg-slate-100/80 border-r border-slate-200 text-xs font-semibold text-slate-600 select-none shrink-0">
                        <span className="text-sm">🇮🇩</span>
                        <span>+62</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="812 3456 7890"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-3 py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:outline-none"
                      />
                    </div>
                    {touched && errors.whatsapp && <p className="text-red-500 text-xs mt-0.5">{errors.whatsapp}</p>}
                  </div>

                  {/* Space Category: Segmented Chip Grid (White & Orange) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase flex items-center justify-between">
                      <span>{t.whatsapp?.spaceCategory || t.whatsapp?.categoryLabel || (isId ? 'Kategori Ruang' : 'Space Category')}</span>
                      <span className="text-[#EA8E18] font-bold">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {spaceCategories.map((cat) => {
                        const isSelected = formData.space === cat.id;
                        return (
                          <button
                            key={cat.id}
                            id={`btn-wa-category-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            type="button"
                            onClick={() => setFormData({ ...formData, space: cat.id })}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between border cursor-pointer ${
                              isSelected
                                ? 'bg-orange-50 text-[#EA8E18] border-[#EA8E18] font-semibold shadow-xs'
                                : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-orange-50/40 hover:border-orange-200'
                            }`}
                          >
                            <span className="truncate">{cat.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-[#EA8E18] shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Requirements Note */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                        {isId ? 'Catatan / Kebutuhan' : 'Requirements / Timeline'}
                      </label>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {isId ? 'Opsional' : 'Optional'}
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      placeholder={t.whatsapp.notesPlaceholder}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:bg-white text-slate-900 placeholder:text-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#EA8E18] focus:ring-1 focus:ring-[#EA8E18] transition-all resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* Bottom Action Section - Clean White & Vibrant Orange Button */}
              <div className="p-5 bg-white border-t border-slate-100 shrink-0">
                <button
                  id="btn-floating-whatsapp-submit"
                  type="submit"
                  form="wa-concierge-form"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#EA8E18] hover:bg-[#d88010] active:scale-[0.99] text-white font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 group"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>{isId ? 'Lanjutkan ke WhatsApp' : 'Continue to WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

