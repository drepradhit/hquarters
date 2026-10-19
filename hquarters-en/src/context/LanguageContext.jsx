import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

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

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider for resilience
    return {
      language: 'en',
      setLanguage: () => {},
      t: translations.en,
    };
  }
  return context;
}
