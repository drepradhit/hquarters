import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { translations } from "../locales/translations.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("id");
  const [cms, setCms] = useState({});
  const [seoData, setSeoData] = useState({});

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("hq_lang", lang);
    } catch {
      // ignore storage quota / sandbox errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Fetch live CMS copywriting from WordPress immediately on mount
  useEffect(() => {
    let isMounted = true;
    fetch("/wp-json/hq/v1/content?lang=" + encodeURIComponent(language))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          if (data.content && typeof data.content === "object" && Object.keys(data.content).length > 0) {
            setCms(data.content);
          }
          if (data.seo && typeof data.seo === "object") {
            setSeoData(data.seo);
          }
        }
      })
      .catch(() => {
        // Fallback to static translations silently
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  // Merge CMS fields over base translations
  const t = useMemo(() => {
    const rawBase = translations[language] || translations.id;
    const baseT = {
      ...rawBase,
      sohoPage: rawBase.sohoPage || {},
      premiumOfficePage: rawBase.premiumOfficePage || { card1: {}, card2: {}, card3: {} },
      virtualOfficePage: rawBase.virtualOfficePage || {},
      servicedOfficePage: rawBase.servicedOfficePage || {},
    };
    if (!cms || Object.keys(cms).length === 0) return baseT;

    return {
      ...baseT,
      hero: {
        ...baseT.hero,
        ...(cms.hero_desc ? { description: cms.hero_desc } : {}),
      },
      address: {
        ...baseT.address,
        ...(cms.loc_address_badge ? { badge: cms.loc_address_badge } : {}),
        ...(cms.loc_address_title_prefix !== undefined ? { titlePrefix: cms.loc_address_title_prefix } : {}),
        ...(cms.loc_address_title_highlight !== undefined ? { titleHighlight: cms.loc_address_title_highlight } : {}),
        ...(cms.loc_address_desc ? { desc: cms.loc_address_desc } : {}),
        ...(cms.loc_address_btn ? { exploreBtn: cms.loc_address_btn } : {}),
      },
      highlights: {
        ...baseT.highlights,
        ...(cms.highlights_title ? { singleTitle: cms.highlights_title } : {}),
      },
      spacesHub: {
        ...baseT.spacesHub,
        ...(cms.spaces_title_prefix !== undefined ? { titlePrefix: cms.spaces_title_prefix } : {}),
        ...(cms.spaces_title_highlight !== undefined ? { titleHighlight: cms.spaces_title_highlight } : {}),
        ...(cms.spaces_desc ? { description: cms.spaces_desc } : {}),
      },
      cta: {
        ...baseT.cta,
        ...(cms.cta_title_prefix !== undefined ? { titlePrefix: cms.cta_title_prefix } : {}),
        ...(cms.cta_title_highlight !== undefined ? { titleHighlight: cms.cta_title_highlight } : {}),
        ...(cms.cta_desc ? { description: cms.cta_desc } : {}),
        ...(cms.cta_btn_text ? { buttonText: cms.cta_btn_text } : {}),
      },
      footer: {
        ...baseT.footer,
        ...(cms.footer_desc ? { about: cms.footer_desc } : {}),
        ...(cms.footer_address ? { address: cms.footer_address } : {}),
        ...(cms.footer_phone ? { phone: cms.footer_phone } : {}),
        ...(cms.footer_email ? { email: cms.footer_email } : {}),
        ...(cms.footer_copyright ? { copyright: cms.footer_copyright } : {}),
      },
      sohoPage: {
        ...baseT.sohoPage,
        ...(cms.soho_headline ? { headline: cms.soho_headline } : {}),
        ...(cms.soho_headline_desc ? { headlineDesc: cms.soho_headline_desc } : {}),
        ...(cms.soho_activities_title ? { activitiesTitle: cms.soho_activities_title } : {}),
        price: cms.soho_price || baseT.sohoPage?.price || 'Hubungi Tim Leasing',
        availability: cms.soho_availability || baseT.sohoPage?.availability || 'Tersedia',
        specSqm: cms.soho_spec_sqm || baseT.sohoPage?.specSqm || '80 - 120 m²',
        specFloor: cms.soho_spec_floor || baseT.sohoPage?.specFloor || 'Lantai 3-16',
        specPower: cms.soho_spec_power || baseT.sohoPage?.specPower || '5.500 - 11.000 VA',
        specCeiling: cms.soho_spec_ceiling || baseT.sohoPage?.specCeiling || '3.2 Meter',
        heroImg: cms.soho_hero_img || '/SPACES/SOHO/SOHO 01.webp?v=20260825',
        floorplanImg: cms.soho_floorplan_img || '',
      },
      premiumOfficePage: {
        ...baseT.premiumOfficePage,
        ...(cms.prem_headline ? { headline: cms.prem_headline } : {}),
        ...(cms.prem_headline_desc ? { headlineDesc: cms.prem_headline_desc } : {}),
        price: cms.prem_price || baseT.premiumOfficePage?.price || 'Hubungi Tim Leasing',
        availability: cms.prem_availability || baseT.premiumOfficePage?.availability || 'Tersedia',
        specSqm: cms.prem_spec_sqm || baseT.premiumOfficePage?.specSqm || '120 - 450 m²',
        specFloorload: cms.prem_spec_floorload || baseT.premiumOfficePage?.specFloorload || '250 kg/m²',
        specCeiling: cms.prem_spec_ceiling || baseT.premiumOfficePage?.specCeiling || '3.6 Meter',
        heroImg: cms.prem_hero_img || '/SPACES/PREMIUM/PREMIUM 01.webp?v=20260825',
        floorplanImg: cms.prem_floorplan_img || '',
        card1: {
          label: cms.prem_c1_label || 'KAPASITAS KANTOR',
          title: cms.prem_c1_title || 'Pilih Kantor Sesuai Kebutuhan Tim',
          desc: cms.prem_c1_desc || 'Jumlah anggota tim dan aktivitas sehari-hari menentukan kebutuhan ruang kantor. Sampaikan kebutuhan perusahaan Anda untuk mengetahui pilihan unit dan kapasitasnya.',
          cta: cms.prem_c1_cta || 'Konsultasikan Kebutuhan Ruang',
        },
        card2: {
          label: cms.prem_c2_label || 'TATA RUANG KANTOR',
          title: cms.prem_c2_title || 'Rencanakan Tata Ruang Kantor Anda',
          desc: cms.prem_c2_desc || 'Pelajari denah unit untuk menilai pembagian area kerja, ruang rapat, dan kebutuhan pendukung lainnya. Gunakan detail ruang sebagai acuan sebelum menentukan pilihan kantor.',
          cta: cms.prem_c2_cta || 'Minta Denah dan Detail Unit',
        },
        card3: {
          label: cms.prem_c3_label || 'FASILITAS GEDUNG',
          title: cms.prem_c3_title || 'Lihat Langsung Fasilitas Gedung',
          desc: cms.prem_c3_desc || 'Tinjau fasilitas dan lingkungan gedung saat survei kantor. Tanyakan ketentuan akses dan penggunaannya untuk menilai kesesuaiannya dengan kebutuhan operasional perusahaan.',
          cta: cms.prem_c3_cta || 'Jadwalkan Survei Kantor',
        },
      },
      functionRoomPage: {
        ...(baseT.functionRoomPage || {}),
        heroTitle: cms.fr_hero_title || 'Function Room & Ruang Konferensi Modern',
        heroDesc: cms.fr_hero_desc || 'Ruang serbaguna untuk seminar, gathering korporasi, pelatihan, dan acara privat di pusat bisnis Bandung.',
        price: cms.fr_price || 'Mulai Rp 1.500.000 / Jam',
        capTheatre: cms.fr_cap_theatre || 'Hingga 280 Pax',
        capClassroom: cms.fr_cap_classroom || 'Hingga 140 Pax',
        capUshape: cms.fr_cap_ushape || 'Hingga 70 Pax',
        capRoundtable: cms.fr_cap_roundtable || 'Hingga 120 Pax',
        specCeiling: cms.fr_spec_ceiling || '3.8 Meter',
        theatreImg: cms.fr_theatre_img || '/Function Room/Theatre.webp?v=20260825',
        floorplanImg: cms.fr_floorplan_img || '',
      },
      virtualOfficePage: {
        ...baseT.virtualOfficePage,
        price: cms.vo_price || 'Mulai Rp 450.000 / Bulan',
        ...(cms.vo_subheadline ? { subheadline: cms.vo_subheadline } : {}),
        ...(cms.vo_copy ? { copy: cms.vo_copy } : {}),
      },
      servicedOfficePage: {
        ...baseT.servicedOfficePage,
        price: cms.so_price || 'Mulai Rp 2.500.000 / Pax / Bulan',
        ...(cms.so_subheadline ? { subheadline: cms.so_subheadline } : {}),
        ...(cms.so_copy ? { copy: cms.so_copy } : {}),
      },
      buildingPage: {
        ...baseT.buildingPage,
        ...(cms.bld_hero_title ? { heroTitlePrefix: cms.bld_hero_title + " ", heroTitleHighlight: "" } : {}),
        ...(cms.bld_hero_desc ? { heroDesc: cms.bld_hero_desc } : {}),
      },
      locationPage: {
        ...baseT.locationPage,
        ...(cms.loc_hero_title ? { heroTitlePrefix: cms.loc_hero_title + " ", heroTitleHighlight: "" } : {}),
        ...(cms.loc_hero_desc ? { heroDesc: cms.loc_hero_desc } : {}),
      },
    };
  }, [language, cms]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, cms, seoData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "id",
      setLanguage: () => {},
      t: translations.id,
      cms: {},
      seoData: {},
    };
  }
  return context;
}
