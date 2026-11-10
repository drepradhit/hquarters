import React, { useState } from 'react';
import Hero from './Hero.jsx';
import BusinessJourney from './BusinessJourney.jsx';
import AddressStatement from './AddressStatement.jsx';
import Partners from './Partners.jsx';
import BuildingHighlights from './BuildingHighlights.jsx';
import SpacesSection from './SpacesSection.jsx';
import BuildingSection from './BuildingSection.jsx';
import CTA from './CTA.jsx';
import { ChevronDown, Check, ArrowRight, ShieldCheck, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!q) return null;
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4.5 text-left font-heading font-medium text-slate-900 hover:text-[#EA8E18] transition-colors"
      >
        <span className="text-base sm:text-lg pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-[#EA8E18]' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </div>
  );
}

export function FaqSection({ title, q1, a1, q2, a2, q3, a3, q4, a4 }) {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight text-center mb-10">
          {title || 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          <FaqItem q={q1 || 'What is the leasing procedure for HQuarters offices?'} a={a1 || 'You can contact our leasing team via WhatsApp or fill out the inquiry form to schedule an office tour.'} defaultOpen={true} />
          <FaqItem q={q2 || 'Are flexible or serviced office options available?'} a={a2 || 'Yes, we offer fully furnished Serviced Offices, SOHO duplexes, and enterprise corporate floors.'} />
          <FaqItem q={q3 || 'What facilities are available in the HQuarters building?'} a={a3 || 'The building features high-speed KONE elevators, rooftop heated pool & gym, lounge areas, 24/7 security, and ample parking.'} />
          {q4 && <FaqItem q={q4} a={a4} />}
        </div>
      </div>
    </section>
  );
}

export function SohoSpecsSection({ headline, headlineDesc, price, availability, specSqm, specFloor, specPower, specCeiling, floorplanImg, setCurrentPage }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-[#EA8E18]">
            {availability || 'Limited Units'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
            {headline || 'Life Changes. Business Changes.'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {headlineDesc || 'A flexible dual-purpose duplex blending professional workspace and private executive living.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specSqm || '80 - 120 sqm'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Unit Area</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specFloor || 'Floors 3–16'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Floor Options</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specPower || '5,500 - 11,000 VA'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Power Capacity</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specCeiling || '3.2 Meters'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Ceiling Height</div>
          </div>
        </div>

        {floorplanImg && (
          <div className="max-w-3xl mx-auto text-center pt-4">
            <h3 className="text-lg font-heading font-semibold text-slate-900 mb-4">SOHO Architectural Floor Plan</h3>
            <img src={floorplanImg} alt="Floor Plan SOHO" className="rounded-xl border border-slate-200 mx-auto shadow-sm max-h-[480px] object-contain" />
          </div>
        )}
      </div>
    </section>
  );
}

export function PremiumSpecsSection({ headline, headlineDesc, price, availability, specSqm, specFloorload, specCeiling, floorplanImg, setCurrentPage }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700">
            {availability || 'Available'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
            {headline || 'Your Company Has Grown. Your Office Should Too.'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {headlineDesc || 'Representative corporate headquarters in Bandung Asia Afrika CBD.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specSqm || '120 - 450 sqm'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Floor Plate</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specFloorload || '250 kg/sqm'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Floor Load</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-slate-900">{specCeiling || '3.6 Meters'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Ceiling Height</div>
          </div>
        </div>

        {floorplanImg && (
          <div className="max-w-3xl mx-auto text-center pt-4">
            <h3 className="text-lg font-heading font-semibold text-slate-900 mb-4">Typical Office Floor Plan</h3>
            <img src={floorplanImg} alt="Floor Plan Premium Office" className="rounded-xl border border-slate-200 mx-auto shadow-sm max-h-[480px] object-contain" />
          </div>
        )}
      </div>
    </section>
  );
}

export function FunctionRoomSpecsSection({ heroTitle, heroDesc, price, capTheatre, capClassroom, capUshape, capRoundtable, setCurrentPage }) {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
            {heroTitle || 'Function Room & Modern Event Space'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {heroDesc || 'Versatile function spaces for seminars, corporate gatherings, and private banquets in Bandung CBD.'}
          </p>
          <div className="text-lg font-bold text-[#EA8E18] font-heading">{price || 'From IDR 1,500,000 / Hour'}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-bold font-heading text-slate-900">{capTheatre || '280 Pax'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Theatre Setup</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-bold font-heading text-slate-900">{capClassroom || '140 Pax'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Classroom Setup</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-bold font-heading text-slate-900">{capUshape || '70 Pax'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">U-Shape Setup</div>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-bold font-heading text-slate-900">{capRoundtable || '120 Pax'}</div>
            <div className="text-xs uppercase font-semibold text-slate-500 mt-1">Round Table Banquet</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicedSpecsSection({ soHeadline, soPrice, voHeadline, voPrice, setCurrentPage }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-[#EA8E18]">Serviced Office</span>
            <h3 className="text-2xl font-bold font-heading text-slate-900">{soHeadline || 'Move-In Ready Workspace'}</h3>
            <p className="text-slate-600 text-sm">Furnished, high-speed fiber internet, and executive reception support from day one.</p>
            <div className="text-xl font-bold text-slate-900 font-heading">{soPrice || 'From IDR 2,500,000 / Pax / Month'}</div>
          </div>
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 text-blue-700">Virtual Office</span>
            <h3 className="text-2xl font-bold font-heading text-slate-900">{voHeadline || 'A Business Address That Builds Trust'}</h3>
            <p className="text-slate-600 text-sm">Prestigious commercial address on Asia Afrika Bandung for legal domicile.</p>
            <div className="text-xl font-bold text-slate-900 font-heading">{voPrice || 'From IDR 450,000 / Month'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlockRenderer({ blocks, setCurrentPage }) {
  const { cms } = useLanguage();

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, idx) => {
        const attrs = block.attrs || {};
        switch (block.name) {
          case 'hq/hero':
            return <Hero key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/business-journey':
            return <BusinessJourney key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/address-statement':
            return <AddressStatement key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/partners':
            if (attrs.enabled === false || cms?.sec_partners_enabled === '0') return null;
            return <Partners key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/building-highlights':
            if (attrs.enabled === false || cms?.sec_highlights_enabled === '0') return null;
            return <BuildingHighlights key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/spaces-grid':
            return <SpacesSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/soho-specs':
            return <SohoSpecsSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/premium-specs':
            return <PremiumSpecsSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/function-room-specs':
            return <FunctionRoomSpecsSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/serviced-specs':
            return <ServicedSpecsSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/gallery':
            return <BuildingSection key={idx} setCurrentPage={setCurrentPage} {...attrs} />;
          case 'hq/faq':
            return <FaqSection key={idx} {...attrs} />;
          case 'hq/cta':
            if (cms?.sec_cta_enabled === '0') return null;
            return (
              <CTA
                key={idx}
                setCurrentPage={setCurrentPage}
                titlePrefix={attrs.titlePrefix}
                titleHighlight={attrs.titleHighlight}
                description={attrs.description}
                buttonText={attrs.buttonText}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

