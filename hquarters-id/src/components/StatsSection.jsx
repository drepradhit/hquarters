import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Building, Users, Award } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      label: 'Award-Winning Projects',
      value: '150+',
      detail: 'Completed worldwide',
      icon: Trophy,
    },
    {
      label: 'Design Excellence',
      value: '25+',
      detail: 'Years of architectural innovation',
      icon: Building,
    },
    {
      label: 'Client Satisfaction',
      value: '98%',
      detail: 'Repeat clients and referrals',
      icon: Users,
    },
    {
      label: 'Sustainability Honors',
      value: '42',
      detail: 'LEED Gold & Platinum certs',
      icon: Award,
    },
  ];

  return (
    <section id="stats" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#E8860B]/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <stat.icon className="w-5 h-5 text-[#E8860B]" />
              </div>
              <div className="text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
