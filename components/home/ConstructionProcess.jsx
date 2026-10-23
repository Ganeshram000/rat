import React from 'react';
import { MessageSquare, Compass, CheckSquare, Hammer, Award, ArrowRight } from 'lucide-react';
import { processSteps } from '@/data/staticData';

const stepIcons = {
  MessageSquare: MessageSquare,
  Compass: Compass,
  CheckSquare: CheckSquare,
  Hammer: Hammer,
  Award: Award,
};

export default function ConstructionProcess() {
  return (
    <section className="py-20 lg:py-28 bg-offwhite text-navy-900 border-t border-navy-100" aria-label="Our Construction Process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
            <span>MILESTONE-DRIVEN ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
            Consultation to Key Handover in 5 Clear Steps
          </h2>

          <p className="text-base sm:text-lg text-navy-600 font-normal leading-relaxed">
            Eliminating construction chaos with engineering precision, itemized contracts, and weekly progress audits.
          </p>
        </div>

        {/* 5 Steps Horizontal Timeline on Desktop / Vertical on Mobile */}
        <div className="relative">
          {/* Connecting Gold Line across Desktop */}
          <div className="hidden lg:block absolute top-14 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {processSteps.map((step, idx) => {
              const Icon = stepIcons[step.icon] || MessageSquare;

              return (
                <div
                  key={step.step}
                  className="group relative flex flex-col items-center text-center bg-white lg:bg-transparent p-6 lg:p-2 rounded-2xl border border-navy-100 lg:border-none shadow-sm lg:shadow-none"
                >
                  {/* Step Icon & Number Circle */}
                  <div className="relative mb-5 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-navy text-gold flex items-center justify-center border-2 border-gold shadow-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-950 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Step Number Tag */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-navy-950 font-mono font-bold text-xs flex items-center justify-center shadow-md">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Step Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-navy-950 group-hover:text-gold-dark transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
