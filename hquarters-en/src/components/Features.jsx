import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, Layers, Leaf, Lightbulb, Shield, ArrowUpRight } from 'lucide-react';

export default function Features() {
  const services = [
    {
      icon: Building2,
      title: 'Architectural Design',
      description: 'Comprehensive architectural solutions from concept creation to master planning and detailed construction documentation.',
      category: 'Core Service',
    },
    {
      icon: Compass,
      title: 'Interior Architecture',
      description: 'Crafting harmonious interior environments that seamlessly blend spatial ergonomics with high-end aesthetic elegance.',
      category: 'Interiors',
    },
    {
      icon: Leaf,
      title: 'Sustainable Engineering',
      description: 'Pioneering eco-conscious building design with net-zero energy modeling and LEED-certified sustainable materials.',
      category: 'Innovation',
    },
    {
      icon: Layers,
      title: 'Urban Planning',
      description: 'Designing resilient urban environments that integrate infrastructure, green spaces, and community-centric living.',
      category: 'Master Planning',
    },
    {
      icon: Lightbulb,
      title: 'Smart Workspace Systems',
      description: 'Integrating intelligent lighting, adaptive climate controls, and dynamic room management into modern offices.',
      category: 'Smart Tech',
    },
    {
      icon: Shield,
      title: 'Structural Advisory',
      description: 'Rigorous structural analysis, seismic resilience planning, and heritage restoration consulting for iconic landmarks.',
      category: 'Consulting',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FEF3E2] text-[#B86807] text-xs font-bold uppercase tracking-wider">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium text-slate-900 font-heading tracking-tight mt-4">
              What We Do Best
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-md">
            Delivering bespoke design solutions that redefine modern architecture with precision craftsmanship and sustainable design.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-[#E8860B]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-[#E8860B] group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#B86807] uppercase tracking-wider bg-[#FEF3E2] px-3 py-1 rounded-md">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-slate-900 font-heading group-hover:text-[#B86807] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#E8860B]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
