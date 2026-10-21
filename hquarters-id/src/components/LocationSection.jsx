import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building,
  Landmark,
  ShoppingBag,
  Navigation,
  Landmark as BankIcon,
  Utensils,
  Train,
  Car,
  Coffee,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LocationSection({ setCurrentPage }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const nearbyCategories = isId
    ? [
        { name: 'Restoran & Braga', desc: 'Jalan Braga, Braga Permai, dan Sumber Hidangan', icon: Utensils, highlight: true },
        { name: 'Hotel Berbintang', desc: 'Savoy Homann, Grand Preanger, dan Ibis Asia Afrika', icon: Building },
        { name: 'Stasiun Kereta Api', desc: 'Stasiun Bandung dan feeder kereta cepat', icon: Train },
        { name: 'Perbankan & Finansial', desc: 'Kantor cabang Bank Mandiri, BCA, dan Bank Indonesia', icon: BankIcon },
        { name: 'Akses Jalan Utama', desc: 'Akses langsung Jl. Asia Afrika, Jl. Naripan, Jl. Tamblong', icon: Navigation },
        { name: 'Akses Pintu Tol*', desc: 'Akses ke Gerbang Tol Pasteur dan Gerbang Tol Moh. Toha', icon: Car },
        { name: 'Belanja & Hiburan', desc: 'Heritage Braga, 23 Paskal, Trans Studio Mall', icon: ShoppingBag },
        { name: 'Pemerintahan & Sipil', desc: 'Gedung Merdeka, Alun-Alun Bandung, Balai Kota', icon: Landmark },
      ]
    : [
        { name: 'Restaurants & Braga', desc: 'Jalan Braga, Braga Permai, Sumber Hidangan (3 Mins)', icon: Utensils, highlight: true },
        { name: 'Hotels', desc: 'Savoy Homann, Grand Preanger, Ibis Asia Afrika (3 Mins)', icon: Building },
        { name: 'Railway Station', desc: 'Bandung Central Station (5 Mins) & Whoosh Feeder', icon: Train },
        { name: 'Banks & Financial', desc: 'Bank Mandiri, BCA, BI Regional Head Offices (<500m)', icon: BankIcon },
        { name: 'Main Roads', desc: 'Direct access to Jl. Asia Afrika, Jl. Naripan, Jl. Tamblong', icon: Navigation },
        { name: 'Toll Access*', desc: 'Direct connection to Pasteur & Moh. Toha Gates (15 Mins)', icon: Car },
        { name: 'Shopping & Leisure', desc: 'Heritage Braga, 23 Paskal, Trans Studio Mall', icon: ShoppingBag },
        { name: 'Government & Civic', desc: 'Gedung Merdeka, Alun-Alun Bandung, Balai Kota', icon: Landmark },
      ];

  return (
    <section id="location" className="pt-4 sm:pt-6 pb-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-slate-900 font-heading tracking-tight leading-[1.12]">
            <span>{t.locationPage.heroTitlePrefix}</span><br />
            <span className="text-[#EA8E18]">{t.locationPage.heroTitleHighlight}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
            {t.locationPage.heroDesc}
          </p>
        </div>

        {/* Map & Immediate Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-50/80 rounded-2xl sm:rounded-[40px] p-5 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
        >
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7328941393102!2d107.61305377499647!3d-6.922500093077204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62eaa6b6423%3A0xb2cdc805dd650314!2sHQuarters%20Business%20Residence!5e0!3m2!1sid!2sid!4v1785903189677!5m2!1sid!2sid"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HQuarters Location Map"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-4xl font-medium font-heading text-slate-900">
                {isId ? (
                  <>Lebih Dekat dengan <br /><span className="text-[#EA8E18]">Segala yang Penting.</span></>
                ) : (
                  <>Closer To <br /><span className="text-[#EA8E18]">Everything That Matters.</span></>
                )}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {nearbyCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className={`p-3.5 rounded-xl bg-white border shadow-sm hover:border-[#EA8E18]/60 hover:shadow-md transition-all flex items-start gap-3 group ${
                      item.highlight ? 'border-[#EA8E18]/40 bg-amber-50/20' : 'border-slate-200/80'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#EA8E18] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#EA8E18] transition-colors leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 font-normal mt-1 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Familiarity & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-6 sm:p-12 lg:p-16 text-center border border-slate-200/80 relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-[1.15]">
              {isId ? (
                <>Klien Anda Sudah Tahu <br /><span className="text-[#EA8E18]">Alamatnya.</span></>
              ) : (
                <>Your Clients Already Know <br /><span className="text-[#EA8E18]">The Address.</span></>
              )}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
              {isId
                ? 'Ada keunggulan psikologis nyata ketika alamat perusahaan tidak perlu dijelaskan. Asia Afrika sudah dikenal dan mudah dikenali.'
                : "There's a real psychological advantage when a company address doesn't need explaining. Asia Afrika is familiar and recognisable."}
            </p>

            <div className="pt-2 font-bold text-[#EA8E18] text-base sm:text-lg font-heading">
              {isId ? 'Mudah ditemukan. Mudah diingat.' : 'Easy to find. Easy to remember.'}
            </div>
          </div>
        </motion.div>

        {/* Business Outside the Office */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-6 sm:pt-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight">
            {isId ? (
              <>Bisnis di Luar <br /><span className="text-[#EA8E18]">Kantor.</span></>
            ) : (
              <>Business Outside <br /><span className="text-[#EA8E18]">The Office.</span></>
            )}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {isId ? (
              <>Makan siang dengan klien. Rapat di hotel. Kopi. Perbankan. Urusan pemerintahan. <br />Belanja. Semua dekat.</>
            ) : (
              <>Client lunch. Hotel meetings. Coffee. Banking. Government affairs. <br />Shopping. All close by.</>
            )}
          </p>
        </div>

      </div>
    </section>
  );
}
