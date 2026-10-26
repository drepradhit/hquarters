import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar({ currentPage = 'home', setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSwitch = (targetLang) => {
    if (targetLang === language) return;
    let subpath = '';
    if (currentPage === 'home') subpath = '';
    else if (currentPage === 'spaces') subpath = '/spaces';
    else if (currentPage === 'space-premium-office') subpath = '/spaces/premium-office';
    else if (currentPage === 'space-soho' || currentPage === 'space-soho-duplex') subpath = '/spaces/soho';
    else if (currentPage === 'space-serviced-office') subpath = '/spaces/serviced-office';
    else if (currentPage === 'space-virtual-office') subpath = '/spaces/virtual-office';
    else if (currentPage === 'event' || currentPage === 'events' || currentPage === 'function-room') subpath = '/events';
    else if (currentPage === 'building') subpath = '/building';
    else if (currentPage === 'location') subpath = '/location';
    else if (currentPage === 'companies') subpath = '/companies';
    else if (currentPage === 'insights') subpath = '/insights';
    else if (currentPage === 'find-space') subpath = '/find-space';

    const targetUrl = `/${targetLang}${subpath ? (subpath.startsWith('/') ? subpath : '/' + subpath) : '/'}`;
    window.location.href = targetUrl;
  };

  const handleNavClick = (page, href) => {
    setMobileMenuOpen(false);
    if (page && setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    } else if (href && setCurrentPage) {
      setCurrentPage('home');
      setTimeout(() => {
        const elem = document.querySelector(href);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const isSpacesActive = [
    'spaces',
    'space-premium-office',
    'space-soho-duplex',
    'space-soho',
    'space-[#soho-duplex]',
    'space-serviced-office',
    'space-virtual-office',
  ].includes(currentPage);

  const isEventActive = [
    'event',
    'events',
    'function-room',
    'space-event',
    'space-function-room',
  ].includes(currentPage);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'py-3.5 sm:py-4 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'py-3.5 sm:py-6 bg-gradient-to-b from-white via-white/85 via-50% to-transparent md:bg-transparent border-b-0 md:border-transparent'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between min-h-[44px] gap-4">
          <button
            id="btn-navbar-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left cursor-pointer shrink-0"
            aria-label="HQuarters Home"
          >
            <img
              src="/LOGO/hquarters-logo-wordmark.webp?v=20260825"
              alt="HQuarters Logo"
              width="460"
              height="76"
              className="h-6 sm:h-7.5 lg:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop & Laptop Navigation (lg: 1024px and above) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 shrink-0">
            <nav className="flex items-center gap-1 xl:gap-1.5 shrink-0">
              {[
                { id: 'spaces', label: t.nav.spaces, active: isSpacesActive },
                { id: 'building', label: t.nav.building, active: currentPage === 'building' },
                { id: 'location', label: t.nav.location, active: currentPage === 'location' },
                { id: 'companies', label: t.nav.companies, active: currentPage === 'companies' },
                { id: 'insights', label: t.nav.insights, active: currentPage === 'insights' },
                { id: 'event', label: t.nav.events, active: isEventActive },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`btn-navbar-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs xl:text-sm font-semibold transition-colors px-2.5 xl:px-3.5 py-2 cursor-pointer whitespace-nowrap shrink-0 ${
                    item.active
                      ? 'text-[#E8860B] font-bold'
                      : 'text-slate-800 hover:text-[#E8860B]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.active && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#E8860B] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80 text-xs font-bold shrink-0">
              <button
                id="btn-lang-switch-id"
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#E8860B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ID
              </button>
              <button
                id="btn-lang-switch-en"
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#E8860B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <button
              id="btn-navbar-cta-find-space"
              onClick={() => handleNavClick('find-space')}
              className={`px-4.5 xl:px-6 py-2 xl:py-2.5 rounded-full font-bold text-[11px] xl:text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'find-space'
                  ? 'bg-slate-900 text-white'
                  : 'bg-[#E8860B] hover:bg-[#d67a0a] text-white'
              }`}
            >
              {t.nav.findMySpace}
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80 text-[11px] font-bold shrink-0">
              <button
                id="btn-lang-switch-mobile-id"
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#E8860B] text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                ID
              </button>
              <button
                id="btn-lang-switch-mobile-en"
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#E8860B] text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                EN
              </button>
            </div>

            <button
              id="btn-navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 border border-slate-200/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs -z-10 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-5 pt-4 pb-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5 font-medium">
                {[
                  { id: 'home', label: t.nav.home, active: currentPage === 'home' },
                  { id: 'spaces', label: t.nav.spaces, active: isSpacesActive },
                  { id: 'building', label: t.nav.building, active: currentPage === 'building' },
                  { id: 'location', label: t.nav.location, active: currentPage === 'location' },
                  { id: 'companies', label: t.nav.companies, active: currentPage === 'companies' },
                  { id: 'insights', label: t.nav.insights, active: currentPage === 'insights' },
                  { id: 'event', label: t.nav.events, active: isEventActive },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`btn-navbar-mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-sm py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      item.active
                        ? 'bg-[#FEF3E2] text-[#B86807] font-bold border border-[#E8860B]/30'
                        : 'text-slate-800 hover:bg-slate-100/80 hover:text-[#EA8E18]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-[#EA8E18]" />}
                  </button>
                ))}

                <button
                  id="btn-navbar-mobile-cta-find-space"
                  onClick={() => handleNavClick('find-space')}
                  className="w-full text-center py-3.5 rounded-xl bg-[#E8860B] hover:bg-[#d67a0a] text-white font-bold text-xs uppercase tracking-wider mt-3 shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  {t.nav.findMySpace}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
