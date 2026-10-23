import React from 'react';
import { companyStats } from '@/data/staticData';

export default function CompanyStats() {
  return (
    <section className="py-16 lg:py-20 bg-navy text-white relative overflow-hidden border-y border-gold/30" aria-label="Company Statistics">
      {/* Background Subtle Radial Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#C9A45C 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {companyStats.map((stat, idx) => (
            <div key={idx} className={`space-y-2 ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gold tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-white tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs text-white/60 font-light">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
