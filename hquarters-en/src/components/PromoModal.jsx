import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const PROMO_IMAGE = "/promo/promo-banner.jpg";

export default function PromoModal({ setCurrentPage }) {
  const { language } = useLanguage();
  const isId = language === "id";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleViewUnits = () => {
    handleClose();
    if (setCurrentPage) {
      setCurrentPage("spaces");
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const waText = isId
    ? "Halo HQuarters Bandung, saya ingin menanyakan informasi promo Work. Live. Invest."
    : "Hello HQuarters Bandung, I would like to inquire about the Work. Live. Invest promo.";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop gelap blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card Poster + CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[430px] md:max-w-[460px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto flex flex-col"
          >
            {/* Tombol Close X Melayang di Pojok Kanan Atas Poster */}
            <button
              id="btn-promo-modal-close"
              type="button"
              onClick={handleClose}
              aria-label={isId ? "Tutup Promo" : "Close Promo"}
              className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-black text-white flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer transition-transform hover:scale-110 active:scale-95 border border-white/20"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Poster Utuh & Jelas */}
            <div className="w-full bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={PROMO_IMAGE}
                alt="Promo HQuarters"
                className="w-full h-auto max-h-[70vh] sm:max-h-[72vh] md:max-h-[74vh] object-contain block select-none"
              />
            </div>

            {/* Bagian Aksi CTA di Bawah Poster */}
            <div className="p-4 sm:p-5 bg-white flex flex-col items-center gap-2 border-t border-slate-100">
              <a
                id="btn-promo-whatsapp"
                href={"https://wa.me/628111908319?text=" + encodeURIComponent(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl bg-[#1c2024] hover:bg-black text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>{isId ? "Tanya Promo via WhatsApp" : "Inquire Promo via WhatsApp"}</span>
              </a>

              <button
                id="btn-promo-view-units"
                type="button"
                onClick={handleViewUnits}
                className="w-full text-center text-xs sm:text-sm font-medium text-slate-700 hover:text-[#EA8E18] transition-colors py-1 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isId ? "Lihat pilihan unit" : "Explore spaces"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
