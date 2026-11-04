import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { translations } from "../locales/translations.js";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [cms, setCms] = useState({});

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
        if (isMounted && data && data.content && typeof data.content === "object" && Object.keys(data.content).length > 0) {
          setCms(data.content);
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
    const baseT = translations[language] || translations.en;
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
      },
      premiumOfficePage: {
        ...baseT.premiumOfficePage,
        ...(cms.prem_headline ? { headline: cms.prem_headline } : {}),
        ...(cms.prem_headline_desc ? { headlineDesc: cms.prem_headline_desc } : {}),
        card1: {
          label: cms.prem_c1_label || 'OFFICE CAPACITY',
          title: cms.prem_c1_title || 'Choose Office Space Based on Team Needs',
          desc: cms.prem_c1_desc || 'Your team size and daily activities determine your office space requirements. Share your company’s needs to explore available units and their capacity.',
          cta: cms.prem_c1_cta || 'Consult Space Requirements',
        },
        card2: {
          label: cms.prem_c2_label || 'OFFICE LAYOUT',
          title: cms.prem_c2_title || 'Plan Your Office Layout',
          desc: cms.prem_c2_desc || 'Review floor plans to assess the division of work areas, meeting rooms, and other supporting facilities. Use space details as a reference before deciding on an office.',
          cta: cms.prem_c2_cta || 'Request Floor Plans and Details',
        },
        card3: {
          label: cms.prem_c3_label || 'BUILDING AMENITIES',
          title: cms.prem_c3_title || 'Experience Building Facilities Directly',
          desc: cms.prem_c3_desc || 'Review the building amenities and environment during your office tour. Ask about access terms and usage to evaluate fit with your operational needs.',
          cta: cms.prem_c3_cta || 'Schedule an Office Tour',
        },
      },
      virtualOfficePage: {
        ...baseT.virtualOfficePage,
        ...(cms.vo_subheadline ? { subheadline: cms.vo_subheadline } : {}),
        ...(cms.vo_copy ? { copy: cms.vo_copy } : {}),
      },
      servicedOfficePage: {
        ...baseT.servicedOfficePage,
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
    <LanguageContext.Provider value={{ language, setLanguage, t, cms }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      t: translations.en,
      cms: {},
    };
  }
  return context;
}
