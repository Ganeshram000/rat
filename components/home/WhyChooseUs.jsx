import React from 'react';
import { ShieldCheck, MessageCircle, Gem, Compass, Landmark } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Professional Workmanship',
      description: 'Supervised by qualified civil engineers. Multi-stage structural audits cover soil testing, cube tests, column-beam alignment, and waterproofing integrity.'
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'You get a single dedicated project manager, weekly photographic progress dossiers on WhatsApp, and stage-by-stage transparent billing with zero surprise variations.'
    },
    {
      icon: Gem,
      title: 'Quality Materials Only',
      description: 'We build exclusively with branded, certified materials — UltraTech/Ambuja Grade 43/53 cement, Fe550D TMT bars (Tata/Jindal), Finolex wiring, and Astral plumbing.'
    },
    {
      icon: Compass,
      title: 'Customized Construction',
      description: 'Whether you desire traditional Rajasthani stone jharokhas, high-ceiling modern minimalist architecture, or commercial steel structures, we customize to your vision.'
    },
    {
      icon: Landmark,
      title: 'Local Jaipur Knowledge',
      description: 'Deep familiarity with Jaipur Development Authority (JDA) building bylaws, municipal setbacks, groundwater depth, and regional seasonal climate demands.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-2.5">
            The NeevSaathi Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Why Discerning Clients in Jaipur Choose Us
          </h2>
          <p className="text-beige-200/80 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
            Construction is a lifetime investment. We replace uncertainty with engineering rigor, ethical material procurement, and transparent customer care.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl transition-all duration-200 hover:border-white/40 hover:-translate-y-1 shadow-card group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-sand flex items-center justify-center mb-5 group-hover:bg-terracotta group-hover:text-white transition-all duration-200">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-beige-200/80 text-xs sm:text-sm font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
