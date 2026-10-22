import React from 'react';
import { getServices } from '@/lib/db';
import ServicesClientList from './ServicesClientList';

export const metadata = {
  title: 'Construction & Civil Contracting Services in Jaipur — NeevSaathi',
  description: 'Explore comprehensive construction contracting services in Jaipur: residential turnkey house construction, commercial plazas, structural renovation, and civil supervision.',
};

export default function ServicesPage() {
  const allServices = getServices() || [];
  const publishedServices = allServices.filter(s => s.published);

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-3">
              Engineering Excellence Across Jaipur
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Our Construction & Contracting Services
            </h1>
            <p className="text-beige-200/90 font-sans text-sm sm:text-base mt-3 leading-relaxed">
              From soil testing and structural excavation to final paint and fixtures, NeevSaathi delivers turnkey residential, commercial, and renovation solutions built to the highest safety and material benchmarks.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Services Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesClientList initialServices={publishedServices} />
      </div>
    </div>
  );
}
