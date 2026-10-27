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

  // Fetch live CMS copywriting from WordPress on idle to avoid blocking critical render
  useEffect(() => {
    const fetchCms = () => {
      fetch("/wp-json/hq/v1/content?lang=" + encodeURIComponent(language))
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.content && Object.keys(data.content).length > 0) {
            setCms(data.content);
          }
        })
        .catch(() => {
          // Fallback to static translations silently
        });
    };

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(fetchCms, { timeout: 3500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(fetchCms, 3000);
      return () => clearTimeout(timer);
    }
  }, [language]);

  // Memoize translations to avoid unnecessary re-renders of the component tree
  const t = useMemo(() => {
    const baseT = translations[language] || translations.en;
    if (!cms || Object.keys(cms).length === 0) return baseT;

    return {
      ...baseT,
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
