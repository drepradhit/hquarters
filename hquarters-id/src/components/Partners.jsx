import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

const rowTop = [
  { name: 'Allianz', src: '/tenants/alllogo-gf-allianz.webp?v=20260826' },
  { name: 'AXA', src: '/tenants/alllogo-7de-axa.webp?v=20260826' },
  { name: 'MSIG', src: '/tenants/alllogo-9ef-msig.webp?v=20260826' },
  { name: 'FWD Insurance', src: '/tenants/alllogo-6fgh-fwd.webp?v=20260826' },
  { name: 'Avrist Assurance', src: '/tenants/alllogo-19r-avrist.webp?v=20260826' },
  { name: 'NH Korindo Sekuritas', src: '/tenants/alllogo-5d-nh-korindo-sekuritas.webp?v=20260826' },
  { name: 'Bmoney', src: '/tenants/alllogo-6k-b-money.webp?v=20260826' },
  { name: 'Henan Sekuritas', src: '/tenants/alllogo-16e-henan-sekuritas-copy.webp?v=20260826' },
  { name: 'DANA Indonesia', src: '/tenants/alllogo-19-op-dana-logo.webp?v=20260826' },
  { name: 'Interpan Tradepro', src: '/tenants/alllogo-6i-interpan-tradepro.webp?v=20260826' },
  { name: 'Mega Menara Mas', src: '/tenants/alllogo-3i-mega-menara-mas-a5-copy.webp?v=20260826' },
  { name: 'Roche', src: '/tenants/alllogo-16j-roche.webp?v=20260826' },
  { name: 'Medion', src: '/tenants/alllogo-15-rstkj-medion-logo.webp?v=20260826' },
  { name: 'Hasna Medika', src: '/tenants/alllogo-12ij-hasna-copy-2.webp?v=20260826' },
  { name: 'Amoures Clinic', src: '/tenants/alllogo-12m-amoures.webp?v=20260826' },
  { name: 'Dispendix', src: '/tenants/alllogo-dispendixbicocompany.webp?v=20260826' },
  { name: 'Huawei', src: '/tenants/alllogo-19-efhijk-huawei-logo.webp?v=20260826' },
  { name: 'Datacolor', src: '/tenants/alllogo-6a-data-color.webp?v=20260826' },
  { name: 'Garuda TV', src: '/tenants/alllogo-gf-b-garuda.webp?v=20260826' },
  { name: 'INET Media', src: '/tenants/alllogo-6d-inet-media.webp?v=20260826' },
  { name: 'VML Agency', src: '/tenants/alllogo-7q-vml.webp?v=20260826' },
  { name: 'Social Bread', src: '/tenants/alllogo-5q-social-bread-logo-a4-cmyk.webp?v=20260826' },
  { name: 'Hubton Studio', src: '/tenants/8D hubton-totem-hq-B.webp?v=20260825' },
  { name: 'Senjakara Media', src: '/tenants/alllogo-8p-senjakara.webp?v=20260826' },
  { name: 'Inpam Tekno', src: '/tenants/alllogo-7j-inpam-mini-riset.webp?v=20260826' },
  { name: 'Neo IT', src: '/tenants/10 neo.webp?v=20260825' },
  { name: 'Mitsubishi Chemical', src: '/tenants/alllogo-7i-mitsubishi.webp?v=20260826' },
];

const rowBottom = [
  { name: 'Hyosung Corp', src: '/tenants/alllogo-8q-hyusung.webp?v=20260826' },
  { name: 'PT Integra', src: '/tenants/alllogo-5n-integra-logo-baru001.webp?v=20260826' },
  { name: 'GSS Engineering', src: '/tenants/alllogo-10h-gss.webp?v=20260826' },
  { name: 'HGS Sourcing', src: '/tenants/alllogo-10q-hgs.webp?v=20260826' },
  { name: 'Aero Logistics', src: '/tenants/alllogo-ug-aero.webp?v=20260826' },
  { name: 'PT Biru Global', src: '/tenants/alllogo-17-abcdeflmnop-pt-biru.webp?v=20260826' },
  { name: 'PT Bagja', src: '/tenants/alllogo-8fgh-pt-bagja.webp?v=20260826' },
  { name: 'Kreasi Perdana', src: '/tenants/alllogo-15o-kreasi-perdana.webp?v=20260826' },
  { name: 'Daya Inara', src: '/tenants/alllogo-15i-daya-inara.webp?v=20260826' },
  { name: 'Ray White', src: '/tenants/raywhite.webp?v=20260825' },
  { name: 'IWG Workspace', src: '/tenants/alllogo-20-iwg-hq.webp?v=20260826' },
  { name: 'Kozystay', src: '/tenants/alllogo-kozystay.webp?v=20260826' },
  { name: 'Investaland', src: '/tenants/alllogo-logo-investaland.webp?v=20260826' },
  { name: 'Artaloka', src: '/tenants/alllogo-12c-artaloka.webp?v=20260826' },
  { name: 'TDE Design', src: '/tenants/alllogo-12k-logo-tde---totem-pylon-hquarters-2.webp?v=20260826' },
  { name: 'Kobi Education', src: '/tenants/alllogo-11h-kobi.webp?v=20260826' },
  { name: 'Australia Int. College', src: '/tenants/alllogo-6l-australia-international-college.webp?v=20260826' },
  { name: 'Universal Consulting', src: '/tenants/alllogo-6q-universal.webp?v=20260826' },
  { name: 'ASA Consulting', src: '/tenants/alllogo-9q-asa.webp?v=20260826' },
  { name: 'CAS Services', src: '/tenants/alllogo-5s-cas.webp?v=20260826' },
  { name: 'AZ Pro Services', src: '/tenants/alllogo-ug-az-pro.webp?v=20260826' },
  { name: 'HIS Travel', src: '/tenants/alllogo-ug-his-travel.webp?v=20260826' },
  { name: 'Hamidah Tour & Travel', src: '/tenants/alllogo-9m-hamidah-tour-new.webp?v=20260826' },
  { name: 'Tomoro Coffee', src: '/tenants/alllogo-gf-tomoro.webp?v=20260826' },
  { name: 'Rejuve Juice', src: '/tenants/alllogo-gf-cmyk-rejuve-new-logo2025color.webp?v=20260826' },
  { name: 'Jus Gaban', src: '/tenants/GF Jus Gaban.webp?v=20260825' },
  { name: 'Sal Corner', src: '/tenants/alllogo-gf-sal-corner.webp?v=20260826' },
];

export default function Partners({ setCurrentPage }) {
  const { t } = useLanguage();

  const handleCommunityClick = (e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage('companies');
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="space-y-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
            {t.partners.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-900 font-heading tracking-tight leading-tight">
            {t.partners.title}
          </h2>
        </div>

        {/* Dual Bi-directional Infinite Looping Marquee */}
        <div className="w-full space-y-4 sm:space-y-6 py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          
          {/* Row 1: Moves to the RIGHT (Ke Kanan) */}
          <div className="marquee-container overflow-hidden">
            <div className="marquee-content-right gap-6 sm:gap-10 md:gap-12 pr-6 sm:pr-10 md:pr-12">
              {[...rowTop, ...rowTop].map((brand, idx) => (
                <div
                  key={"top-" + brand.name + "-" + idx}
                  onClick={handleCommunityClick}
                  className="flex items-center justify-center h-18 sm:h-22 md:h-26 w-40 sm:w-52 md:w-60 shrink-0 px-3 sm:px-5 cursor-pointer rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <img
                    loading="lazy"
                    src={brand.src}
                    alt={brand.name}
                    className="h-10 sm:h-13 md:h-15 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[195px] object-contain transition-opacity duration-200 opacity-90 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moves to the LEFT (Ke Kiri) */}
          <div className="marquee-container overflow-hidden">
            <div className="marquee-content-left gap-6 sm:gap-10 md:gap-12 pr-6 sm:pr-10 md:pr-12">
              {[...rowBottom, ...rowBottom].map((brand, idx) => (
                <div
                  key={"bot-" + brand.name + "-" + idx}
                  onClick={handleCommunityClick}
                  className="flex items-center justify-center h-18 sm:h-22 md:h-26 w-40 sm:w-52 md:w-60 shrink-0 px-3 sm:px-5 cursor-pointer rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <img
                    loading="lazy"
                    src={brand.src}
                    alt={brand.name}
                    className="h-10 sm:h-13 md:h-15 w-auto max-w-[130px] sm:max-w-[170px] md:max-w-[195px] object-contain transition-opacity duration-200 opacity-90 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="pt-2">
          <button
            id="btn-partners-explore-community"
            onClick={handleCommunityClick}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#EA8E18] hover:text-[#d88010] transition-colors group cursor-pointer"
          >
            <span>{t.partners.exploreBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
