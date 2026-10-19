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
      className="pt-20 sm:pt-28 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-medium font-heading tracking-tight leading-[1.15] text-white">
            <span>{activeTitlePrefix}</span>
            {activeTitlePrefix && activeTitleHighlight && <br />}
            <span className="text-[#EA8E18] font-medium">{activeTitleHighlight}</span>
          </h2>

          
          {activeDescription && (
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              {activeDescription}
            </p>
          )}

          
          {activeButtonText && (
            <div className="pt-2 sm:pt-4">
              <button
                id="btn-cta-action"
                onClick={handleClick}
                className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#EA8E18]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2.5 group shrink-0"
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
