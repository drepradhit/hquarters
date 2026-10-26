import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('id');
  const [cms, setCms] = useState({});

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hq_lang', lang);
    } catch {
      // ignore storage quota / sandbox errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Fetch live CMS copywriting from WordPress if available
  useEffect(() => {
    fetch(`/wp-json/hq/v1/content?lang=${language}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.content && Object.keys(data.content).length > 0) {
          setCms(data.content);
        }
      })
      .catch(() => {
        // Fallback to static translations silently
      });
  }, [language]);

  const baseT = translations[language] || translations.id;

  // Merge CMS overrides into translations
  const t = {
    ...baseT,
    buildingPage: {
      ...baseT.buildingPage,
      ...(cms.bld_hero_title ? { heroTitlePrefix: cms.bld_hero_title + ' ', heroTitleHighlight: '' } : {}),
      ...(cms.bld_hero_desc ? { heroDesc: cms.bld_hero_desc } : {}),
    },
    locationPage: {
      ...baseT.locationPage,
      ...(cms.loc_hero_title ? { heroTitlePrefix: cms.loc_hero_title + ' ', heroTitleHighlight: '' } : {}),
      ...(cms.loc_hero_desc ? { heroDesc: cms.loc_hero_desc } : {}),
    },
  };

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
      language: 'id',
      setLanguage: () => {},
      t: translations.id,
      cms: {},
    };
  }
  return context;
}
