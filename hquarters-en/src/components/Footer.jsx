import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const handleNavClick = (page, anchor) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      if (anchor) {
        setTimeout(() => {
          const elem = document.querySelector(anchor);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        }, 150);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <footer className="bg-[#231F20] text-slate-400 text-xs border-t border-white/5 pt-8 sm:pt-10 pb-14 sm:pb-10 pb-[max(3.5rem,env(safe-area-inset-bottom,3.5rem))]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Grid: compact, elegant & balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-8 border-b border-white/5">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 space-y-3.5 pr-0 lg:pr-6">
            <div className="flex items-center gap-3.5 flex-wrap">
              <button 
                id="btn-footer-logo-home"
                onClick={() => handleNavClick('home')} 
                className="flex items-center text-left group cursor-pointer"
                aria-label="HQuarters Home"
              >
                <img 
                  loading="lazy"
                  src="/LOGO/hquarters-logo-white.webp?v=20260825"
                  alt="HQuarters Logo"
                  width="827"
                  height="137"
                  className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </button>
              <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />
              <a
                href="https://investaland.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-left group cursor-pointer"
                aria-label="Investaland Indonesia"
              >
                <img 
                  loading="lazy"
                  src="/LOGO/Logo Investaland.webp?v=20260825"
                  alt="Investaland Logo"
                  width="100"
                  height="118"
                  className="h-6 sm:h-7 w-auto object-contain brightness-105 transition-transform duration-200 group-hover:scale-105"
                />
              </a>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-sm">
              HQuarters Business Residence — Integrasi ruang kantor premium dan hunian fleksibel di pusat bisnis Asia Afrika Bandung.
            </p>

            <div className="space-y-1.5 text-[11px] sm:text-xs text-slate-400 pt-1">
              <a
                href="https://maps.google.com/?q=Jl.+Asia+Afrika+No.+158,+Bandung"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-1.5 min-h-[36px] hover:text-[#EA8E18] transition-colors group"
              >
                <MapPin className="w-3.5 h-3.5 text-[#EA8E18] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Jl. Asia Afrika No. 158, Bandung, Jawa Barat 40261</span>
              </a>
              <a
                href="https://wa.me/628111908319"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-1.5 min-h-[36px] hover:text-[#EA8E18] transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA8E18] shrink-0 group-hover:scale-110 transition-transform" />
                <span>+62 811-1908-319 (WhatsApp)</span>
              </a>
              <a
                href="mailto:info@hquarters.co.id"
                className="flex items-center gap-2 py-1.5 min-h-[36px] hover:text-[#EA8E18] transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-[#EA8E18] shrink-0 group-hover:scale-110 transition-transform" />
                <span>info@hquarters.co.id</span>
              </a>
            </div>

            {/* Social Media Links (kept exact same icons, scaled down to compact size, no new icons added) */}
            <div className="flex items-center gap-2 pt-1.5">
              <a
                href="https://www.instagram.com/hquartersbdg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#EA8E18] border border-white/10 hover:border-[#EA8E18] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@hquarters_bdg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#EA8E18] border border-white/10 hover:border-[#EA8E18] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/HQuartersBDG/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#EA8E18] border border-white/10 hover:border-[#EA8E18] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/hquarters-bandung/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#EA8E18] border border-white/10 hover:border-[#EA8E18] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/628111908319"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#EA8E18] border border-white/10 hover:border-[#EA8E18] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column: Spaces */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-[11px] uppercase tracking-wider font-heading">
              Spaces
            </h3>
            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-400">
              <li>
                <button id="btn-footer-nav-premium-office" onClick={() => handleNavClick('space-premium-office')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Premium Office
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-soho" onClick={() => handleNavClick('space-soho-duplex')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  SOHO
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-serviced-office" onClick={() => handleNavClick('space-serviced-office')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Serviced Office
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-virtual-office" onClick={() => handleNavClick('space-virtual-office')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Virtual Office
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-event" onClick={() => handleNavClick('event')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Function Room & Events
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Building & Location */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-[11px] uppercase tracking-wider font-heading">
              Building & Location
            </h3>
            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-400">
              <li>
                <button id="btn-footer-nav-amenities" onClick={() => handleNavClick('building', '#building-amenities')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Building Amenities
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-security" onClick={() => handleNavClick('building', '#security')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Security & Engineering
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-parking" onClick={() => handleNavClick('building', '#parking')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Automated Mechanical Parking
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-location" onClick={() => handleNavClick('location')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Asia Afrika CBD Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Community & Media */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-[11px] uppercase tracking-wider font-heading">
              Community & Media
            </h3>
            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-400">
              <li>
                <button id="btn-footer-nav-companies" onClick={() => handleNavClick('companies')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Tenant Community
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-insights" onClick={() => handleNavClick('insights')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Insights & Journal
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-find-space" onClick={() => handleNavClick('find-space')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Inquire For Space
                </button>
              </li>
              <li>
                <button id="btn-footer-nav-home" onClick={() => handleNavClick('home')} className="py-1.5 min-h-[32px] flex items-center hover:text-[#EA8E18] transition-colors text-left cursor-pointer">
                  Home Overview
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: clean & compact */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-normal">
          <span>© {new Date().getFullYear()} HQuarters Business Residence. All rights reserved.</span>
          <span className="text-slate-400 hidden sm:inline">Asia Afrika CBD, Bandung</span>
        </div>

      </div>
    </footer>
  );
}
