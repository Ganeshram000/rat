import React from 'react';
import { Award, FileSpreadsheet, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function TrustHighlights() {
  const highlights = [
    {
      icon: Award,
      title: 'Quality Workmanship',
      description: 'IS-standard RCC concrete testing, branded Fe550D TMT steel, precision shuttering, and continuous on-site civil engineer supervision.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Transparent Estimates',
      description: 'Zero hidden surprises. Every quote features a 100% itemized Bill of Quantities (BOQ) with clearly documented material brands and unit rates.'
    },
    {
      icon: Clock,
      title: 'Reliable Project Execution',
      description: 'Guaranteed milestone-linked construction schedules with weekly digital photo progress reports and penalty-backed handover commitments.'
    },
    {
      icon: MapPin,
      title: 'Jaipur & Nearby Areas',
      description: 'Deep knowledge of local Jaipur soil conditions, groundwater tables, JDA building regulations, and trusted local material supply chains.'
    }
  ];

  return (
    <section className="py-10 sm:py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-3xl transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/15 text-sand flex items-center justify-center mb-4 group-hover:bg-terracotta group-hover:text-white transition-all duration-200">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-beige-200/80 text-xs sm:text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 flex items-center gap-1.5 text-xs font-sans font-semibold text-sand">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
