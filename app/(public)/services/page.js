import React from 'react';
import { servicesData } from '@/data/staticData';
import ServicesClientList from './ServicesClientList';

export const metadata = {
  title: 'Construction & Civil Contracting Services in Jaipur — NeevSaathi',
  description: 'Explore comprehensive construction contracting services in Jaipur: residential turnkey house construction, commercial plazas, architectural design, interior fit-outs, and civil supervision.',
};

export default function ServicesPage() {
  return (
    <div className="bg-offwhite min-h-screen py-12 sm:py-16 lg:py-20 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Hero Banner */}
        <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold/40 shadow-2xl text-white relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              ENGINEERING EXCELLENCE ACROSS JAIPUR
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Our Construction & Contracting Services
            </h1>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              From soil testing and structural excavation to final paint and fixtures, NeevSaathi delivers turnkey residential, commercial, and renovation solutions built to the highest safety and material benchmarks.
            </p>
          </div>

          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C9A45C 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        {/* Services List Component */}
        <ServicesClientList initialServices={servicesData} />

      </div>
    </div>
  );
}
