import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CompaniesSection({ setCurrentPage }) {
  const { t } = useLanguage();

  const industrySectors = [
    {
      id: 'financial',
      title: 'Insurance & Financial Services',
      partners: [
        { name: 'Allianz', logo: '/tenants/alllogo-gf-allianz.webp?v=20260826', scale: 'scale-120' },
        { name: 'AXA', logo: '/tenants/alllogo-7de-axa.webp?v=20260826', scale: 'scale-125' },
        { name: 'MSIG', logo: '/tenants/alllogo-9ef-msig.webp?v=20260826', scale: 'scale-120' },
        { name: 'FWD Insurance', logo: '/tenants/alllogo-6fgh-fwd.webp?v=20260826', scale: 'scale-120' },
        { name: 'Avrist Assurance', logo: '/tenants/alllogo-19r-avrist.webp?v=20260826', scale: 'scale-120' },
        { name: 'NH Korindo Sekuritas', logo: '/tenants/alllogo-5d-nh-korindo-sekuritas.webp?v=20260826', scale: 'scale-125' },
        { name: 'Bmoney', logo: '/tenants/alllogo-6k-b-money.webp?v=20260826', scale: 'scale-125' },
        { name: 'Henan Sekuritas', logo: '/tenants/alllogo-16e-henan-sekuritas-copy.webp?v=20260826', scale: 'scale-125' },
        { name: 'DANA Indonesia', logo: '/tenants/alllogo-19-op-dana-logo.webp?v=20260826', scale: 'scale-125' },
        { name: 'Interpan Tradepro', logo: '/tenants/alllogo-6i-interpan-tradepro.webp?v=20260826', scale: 'scale-125' },
        { name: 'Mega Menara Mas', logo: '/tenants/alllogo-3i-mega-menara-mas-a5-copy.webp?v=20260826', scale: 'scale-125' },
      ],
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Life Sciences',
      partners: [
        { name: 'Roche', logo: '/tenants/alllogo-16j-roche.webp?v=20260826', scale: 'scale-125' },
        { name: 'Medion', logo: '/tenants/alllogo-15-rstkj-medion-logo.webp?v=20260826', scale: 'scale-125' },
        { name: 'Hasna Medika', logo: '/tenants/alllogo-12ij-hasna-copy-2.webp?v=20260826', scale: 'scale-125' },
        { name: 'Amoures Clinic', logo: '/tenants/alllogo-12m-amoures.webp?v=20260826', scale: 'scale-125' },
        { name: 'Dispendix', logo: '/tenants/alllogo-dispendixbicocompany.webp?v=20260826', scale: 'scale-125' },
      ],
    },
    {
      id: 'tech',
      title: 'Technology & Media',
      partners: [
        { name: 'Huawei', logo: '/tenants/alllogo-19-efhijk-huawei-logo.webp?v=20260826', scale: 'scale-120' },
        { name: 'Datacolor', logo: '/tenants/alllogo-6a-data-color.webp?v=20260826', scale: 'scale-120' },
        { name: 'Garuda TV', logo: '/tenants/alllogo-gf-b-garuda.webp?v=20260826', scale: 'scale-85' },
        { name: 'INET Media', logo: '/tenants/alllogo-6d-inet-media.webp?v=20260826', scale: 'scale-125' },
        { name: 'VML Agency', logo: '/tenants/alllogo-7q-vml.webp?v=20260826', scale: 'scale-125' },
        { name: 'Social Bread', logo: '/tenants/alllogo-5q-social-bread-logo-a4-cmyk.webp?v=20260826', scale: 'scale-125' },
        { name: 'Hubton Studio', logo: '/tenants/8D hubton-totem-hq-B.webp?v=20260825', scale: 'scale-125' },
        { name: 'Senjakara Media', logo: '/tenants/alllogo-8p-senjakara.webp?v=20260826', scale: 'scale-125' },
        { name: 'Inpam Tekno', logo: '/tenants/alllogo-7j-inpam-mini-riset.webp?v=20260826', scale: 'scale-120' },
        { name: 'Neo IT', logo: '/tenants/10 neo.webp?v=20260825', scale: 'scale-125' },
      ],
    },
    {
      id: 'industrial',
      title: 'Industrial, Logistics & Engineering',
      partners: [
        { name: 'Mitsubishi Chemical', logo: '/tenants/alllogo-7i-mitsubishi.webp?v=20260826', scale: 'scale-125' },
        { name: 'Hyosung Corp', logo: '/tenants/alllogo-8q-hyusung.webp?v=20260826', scale: 'scale-125' },
        { name: 'PT Integra Dayacipta Grahatama', logo: '/tenants/alllogo-5n-integra-logo-baru001.webp?v=20260826', scale: 'scale-125' },
        { name: 'GSS Engineering', logo: '/tenants/alllogo-10h-gss.webp?v=20260826', scale: 'scale-125' },
        { name: 'HGS Sourcing', logo: '/tenants/alllogo-10q-hgs.webp?v=20260826', scale: 'scale-125' },
        { name: 'Aero Logistics', logo: '/tenants/alllogo-ug-aero.webp?v=20260826', scale: 'scale-125' },
        { name: 'PT Biru Global', logo: '/tenants/alllogo-17-abcdeflmnop-pt-biru.webp?v=20260826', scale: 'scale-125' },
        { name: 'PT Bagja', logo: '/tenants/alllogo-8fgh-pt-bagja.webp?v=20260826', scale: 'scale-125' },
        { name: 'Kreasi Perdana', logo: '/tenants/alllogo-15o-kreasi-perdana.webp?v=20260826', scale: 'scale-125' },
        { name: 'Daya Inara', logo: '/tenants/alllogo-15i-daya-inara.webp?v=20260826', scale: 'scale-120' },
      ],
    },
    {
      id: 'property',
      title: 'Property, Education & Professional Services',
      partners: [
        { name: 'Ray White', logo: '/tenants/raywhite.webp?v=20260825', scale: 'scale-125' },
        { name: 'IWG Workspace', logo: '/tenants/alllogo-20-iwg-hq.webp?v=20260826', scale: 'scale-120' },
        { name: 'Kozystay', logo: '/tenants/alllogo-kozystay.webp?v=20260826', scale: 'scale-125' },
        { name: 'Investaland', logo: '/tenants/alllogo-logo-investaland.webp?v=20260826', scale: 'scale-125' },
        { name: 'Artaloka', logo: '/tenants/alllogo-12c-artaloka.webp?v=20260826', scale: 'scale-125' },
        { name: 'TDE Design', logo: '/tenants/alllogo-12k-logo-tde---totem-pylon-hquarters-2.webp?v=20260826', scale: 'scale-125' },
        { name: 'Kobi Education', logo: '/tenants/alllogo-11h-kobi.webp?v=20260826', scale: 'scale-120' },
        { name: 'Australia Int. College', logo: '/tenants/alllogo-6l-australia-international-college.webp?v=20260826', scale: 'scale-120' },
        { name: 'Universal Consulting', logo: '/tenants/alllogo-6q-universal.webp?v=20260826', scale: 'scale-125' },
        { name: 'ASA Consulting', logo: '/tenants/alllogo-9q-asa.webp?v=20260826', scale: 'scale-125' },
        { name: 'CAS Services', logo: '/tenants/alllogo-5s-cas.webp?v=20260826', scale: 'scale-125' },
        { name: 'AZ Pro Services', logo: '/tenants/alllogo-ug-az-pro.webp?v=20260826', scale: 'scale-120' },
      ],
    },
    {
      id: 'lifestyle',
      title: 'Travel & Lifestyle',
      partners: [
        { name: 'HIS Travel', logo: '/tenants/alllogo-ug-his-travel.webp?v=20260826', scale: 'scale-125' },
        { name: 'Hamidah Tour & Travel', logo: '/tenants/alllogo-9m-hamidah-tour-new.webp?v=20260826', scale: 'scale-125' },
        { name: 'Tomoro Coffee', logo: '/tenants/alllogo-gf-tomoro.webp?v=20260826', scale: 'scale-125' },
        { name: 'Rejuve Juice', logo: '/tenants/alllogo-gf-cmyk-rejuve-new-logo2025color.webp?v=20260826', scale: 'scale-125' },
        { name: 'Jus Gaban', logo: '/tenants/GF Jus Gaban.webp?v=20260825', scale: 'scale-125' },
        { name: 'Sal Corner', logo: '/tenants/alllogo-gf-sal-corner.webp?v=20260826', scale: 'scale-125' },
      ],
    },
  ];

  return (
    <section id="companies" className="pt-6 sm:pt-10 pb-20 sm:pb-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Editorial Heading & Context */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-slate-900 font-heading tracking-tight leading-[1.12]">
            <span>{t.companiesPage.titlePrefix || 'Companies at '}</span>
            <span className="text-[#EA8E18]">{t.companiesPage.titleHighlight || 'HQuarters'}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.companiesPage.heroDesc}
          </p>
        </div>

        {/* Industry Sectors: Clean Architectural Unified Matrix */}
        <div className="space-y-12 sm:space-y-20">
          {industrySectors.map((sector) => {
            const displayTitle = t.companiesPage.sectors?.[sector.id] || sector.title;
            return (
              <motion.div
                key={sector.id}
                id={sector.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="space-y-4 sm:space-y-5 scroll-mt-28"
              >
                {/* Clean Sector Header */}
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                    {displayTitle}
                  </h2>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 shrink-0">
                    {sector.partners.length} {t.companiesPage?.companiesCount || 'Companies'}
                  </span>
                </div>

                {/* Unified Connected Logo Grid */}
                <div
                  data-ui="logo-matrix"
                  className="bg-slate-50/70 rounded-2xl sm:rounded-3xl p-2 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4"
                >
                  {sector.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="bg-white rounded-xl sm:rounded-2xl h-24 sm:h-32 flex items-center justify-center p-3 sm:p-6 transition-colors duration-200 hover:bg-[#FAF8F5] group cursor-default"
                    >
                      <img
                        loading="lazy"
                        src={partner.logo}
                        alt={partner.name}
                        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-108 ${partner.scale || 'scale-120'}`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Closing Statement */}
        <div className="bg-slate-50/70 rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight leading-snug">
            {t.companiesPage?.whyItMattersTitle || 'Why It Matters Who Your Neighbours Are.'}
          </h3>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            {t.companiesPage?.whyItMattersDesc || 'A strong business environment builds confidence — for your clients, your employees, your partners, and everyone considering doing business with you.'}
          </p>
          <p className="text-base sm:text-lg font-medium text-slate-900 font-heading italic pt-2">
            {t.companiesPage?.quote || '“Credibility lives in context.”'}
          </p>
        </div>

      </div>
    </section>
  );
}
