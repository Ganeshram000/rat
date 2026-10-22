'use client';

import React from 'react';
import { MessagesSquare, MapPinCheckInside, HardHat, KeyRound } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      step: '01',
      icon: MessagesSquare,
      title: 'Discuss Requirements',
      description: 'We listen to your architectural goals, plot dimensions, and budget expectations over phone, WhatsApp, or at our Jaipur site office.'
    },
    {
      step: '02',
      icon: MapPinCheckInside,
      title: 'Site Visit & Estimate',
      description: 'Our senior engineer inspects your plot levels, soil strata, and road setback. We prepare an itemized Bill of Quantities (BOQ).'
    },
    {
      step: '03',
      icon: HardHat,
      title: 'Planning & Execution',
      description: 'We mobilize certified materials (UltraTech cement, Fe550D TMT), initiate civil framing, and send weekly WhatsApp progress logs.'
    },
    {
      step: '04',
      icon: KeyRound,
      title: 'Inspection & Handover',
      description: 'Multi-stage quality audits culminate in snag-free finishing, thorough site cleaning, and official keys & documentation handover.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-2.5">
            Predictable & Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Our 4-Step Construction Journey
          </h2>
          <p className="text-beige-200/80 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
            Building in Jaipur shouldn’t feel stressful. We operate on transparent milestones so you always know what is being built, when, and with what materials.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl relative flex flex-col justify-between group transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-serif font-extrabold text-white/30 group-hover:text-sand transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/15 text-sand flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-all duration-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-beige-200/80 text-xs font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
