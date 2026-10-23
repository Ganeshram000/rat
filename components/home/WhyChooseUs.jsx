import React from 'react';
import { ShieldCheck, FileText, HardHat, Clock, Award, CheckCircle2 } from 'lucide-react';
import { whyChooseUsData } from '@/data/staticData';

const iconMap = {
  ShieldCheck: ShieldCheck,
  FileText: FileText,
  HardHat: HardHat,
  Clock: Clock,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white text-navy-900 border-t border-navy-100" aria-label="Why Choose NeevSaathi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>OUR CORE COMMITMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
            Why Discerning Clients Choose NeevSaathi
          </h2>

          <p className="text-base sm:text-lg text-navy-600 font-normal leading-relaxed">
            In an unorganized construction industry, we operate with corporate transparency, certified engineering standards, and guaranteed completion timelines.
          </p>
        </div>

        {/* 4 Strength Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUsData.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <div
                key={item.number}
                className="group relative bg-offwhite p-7 rounded-2xl border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-transparent group-hover:bg-gold transition-colors rounded-t-full" />

                <div className="space-y-5">
                  {/* Card Header with Icon & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center shadow-md group-hover:bg-gold group-hover:text-navy-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-navy-200 group-hover:text-gold/60 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-serif font-bold text-navy-950 group-hover:text-gold-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Sub-benefit highlight */}
                <div className="mt-6 pt-4 border-t border-navy-200/60 flex items-center gap-2 text-xs font-semibold text-navy-800">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>100% Contractually Bound</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
