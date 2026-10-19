import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, Landmark, Map, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('commercial');

  const categories = [
    { id: 'commercial', label: 'Commercial HQ', icon: Building2 },
    { id: 'residential', label: 'Luxury Residential', icon: Home },
    { id: 'cultural', label: 'Cultural Landmarks', icon: Landmark },
    { id: 'masterplan', label: 'Urban Masterplan', icon: Map },
  ];

  const projectsData = {
    commercial: {
      title: 'Vanguard Enterprise Tower',
      location: 'Tokyo, Japan',
      year: '2025',
      area: '85,000 sq m',
      description: 'A 45-story sustainable commercial landmark featuring a kinetic glass facade, sky gardens on every fifth floor, and triple-glazed thermal insulation.',
      highlights: ['LEED Platinum Certified', 'Kinetic Facade System', 'Zero Carbon Footprint Target'],
      imageTag: 'Architectural Landmark',
    },
    residential: {
      title: 'Horizon Cliffside Residence',
      location: 'Zurich, Switzerland',
      year: '2024',
      area: '1,200 sq m',
      description: 'Cantilevered mountain villa seamlessly blending raw exposed concrete, warm cedar cladding, and panoramic floor-to-ceiling glass apertures.',
      highlights: ['Passivhaus Certified', 'Custom Timber Joinery', 'Geothermal Heating'],
      imageTag: 'Private Sanctuary',
    },
    cultural: {
      title: 'Starlight Performing Arts Center',
      location: 'Copenhagen, Denmark',
      year: '2025',
      area: '32,000 sq m',
      description: 'Dynamic cultural venue with acoustic wood panelling, a floating concert hall geometry, and a public rooftop park accessible 24/7.',
      highlights: ['State-of-the-Art Acoustics', 'Public Park Roof Integration', 'Solar Membrane Integration'],
      imageTag: 'Public Culture',
    },
    masterplan: {
      title: 'EcoDistrikt Smart City Quarter',
      location: 'Amsterdam, Netherlands',
      year: '2026',
      area: '450,000 sq m',
      description: 'Pedestrian-first urban district integrating automated subterranean waste routing, biophilic water canals, and 100% renewable micro-grids.',
      highlights: ['Car-Free Urban Center', 'Biophilic Stormwater Canals', 'Smart Energy Microgrid'],
      imageTag: 'Urban Transformation',
    },
  };

  const current = projectsData[activeTab];

  return (
    <section id="projects" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-[#FEF3E2] text-[#B86807] text-xs font-bold uppercase tracking-wider">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 font-heading tracking-tight mt-3">
            Designed Perfection
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Explore our signature architectural achievements across commercial, residential, and urban projects worldwide.
          </p>
        </div>

        
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-full flex flex-wrap justify-center gap-1 border border-slate-200">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`btn-interactive-demo-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        
        <div className="bg-white text-slate-900 rounded-[28px] overflow-hidden shadow-2xl p-8 sm:p-12 border border-slate-200/80">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#FEF3E2] text-[#B86807] text-xs font-bold uppercase tracking-wider border border-[#E8860B]/30">
                    {current.imageTag}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">• {current.location}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900">
                  {current.title}
                </h3>

                <p className="text-slate-600 text-base leading-relaxed">
                  {current.description}
                </p>

                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Completion</span>
                    <span className="text-lg font-bold text-slate-900 mt-1 block">{current.year}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Area</span>
                    <span className="text-lg font-bold text-[#E8860B] mt-1 block">{current.area}</span>
                  </div>
                </div>

                
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Key Innovations</span>
                  {current.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#E8860B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md"
                  >
                    <span>View Project Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3]">
                  <img loading="lazy"
                    src="/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM.webp?v=20260825"
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                    <span className="text-xs font-mono text-white">HQ ARCHITECTURAL DESIGN STUDIO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
