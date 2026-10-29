import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CTA({
  setCurrentPage,
  titlePrefix,
  titleHighlight,
  description,
  buttonText,
  pageTarget = 'find-space'
}) {
  const { t } = useLanguage();

  const activeTitlePrefix = titlePrefix !== undefined ? titlePrefix : t.cta.titlePrefix;
  const activeTitleHighlight = titleHighlight !== undefined ? titleHighlight : t.cta.titleHighlight;
  const activeDescription = description !== undefined ? description : t.cta.description;
  const activeButtonText = buttonText !== undefined ? buttonText : t.cta.buttonText;

  const handleClick = (e) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(pageTarget);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section 
      id="contact" 
      className="pt-12 sm:pt-16 pb-8 sm:pb-10 bg-[#231F20] text-white text-center relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-heading tracking-tight leading-snug text-white">
            <span>{activeTitlePrefix}</span>{' '}
            <span className="text-[#EA8E18] font-medium">{activeTitleHighlight}</span>
          </h2>

          
          {activeDescription && (
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-normal">
              {activeDescription}
            </p>
          )}

          
          {activeButtonText && (
            <div className="pt-1 sm:pt-2">
              <button
                id="btn-cta-action"
                onClick={handleClick}
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#EA8E18]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group shrink-0"
              >
                <span>{activeButtonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
