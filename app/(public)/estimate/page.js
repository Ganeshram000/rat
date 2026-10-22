import React from 'react';
import EstimateForm from '@/components/enquiry/EstimateForm';
import { ShieldCheck, FileSpreadsheet, Award, Clock } from 'lucide-react';

export const metadata = {
  title: 'Request a Free Construction Estimate — Itemized BOQ in Jaipur',
  description: 'Submit your plot and construction requirements to receive an itemized, transparent Bill of Quantities (BOQ) estimate for house or commercial construction in Jaipur.',
};

export default function EstimatePage() {
  const benefits = [
    {
      icon: FileSpreadsheet,
      title: '100% Itemized BOQ',
      description: 'Transparent line-item breakdown of excavation, RCC concrete, steel weight, masonry, plaster, plumbing, and electrical costs.'
    },
    {
      icon: Award,
      title: 'Branded Material Grades',
      description: 'Fe550D TMT steel, Grade 43/53 PPC/OPC cement, Finolex wiring, and Astral piping clearly specified with unit rates.'
    },
    {
      icon: Clock,
      title: 'Milestone Timeline',
      description: 'A realistic construction schedule mapped against stage-wise milestone completions, from foundation casting to key handover.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Pressure & No Obligation',
      description: 'Receive honest civil engineering advice without any hidden sales tricks or forced commitments.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-3">
              Transparent Pricing Consultation
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Request Your Free Construction Estimate
            </h1>
            <p className="text-beige-200/90 font-sans text-sm sm:text-base mt-3 leading-relaxed">
              Tell us about your plot or property in Jaipur. Our civil engineering team will analyze your requirements and provide a transparent, itemized Bill of Quantities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form & Benefits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <EstimateForm
              title="Project Specification Details"
              subtitle="Complete this short questionnaire. We review structural requirements, plot dimensions, and material finishes to deliver an accurate estimate."
            />
          </div>

          {/* Right Column: What You Receive (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-card space-y-5 text-white">
              <h3 className="font-serif font-bold text-lg text-white border-b border-white/10 pb-3">
                What Does Your Estimate Include?
              </h3>

              <div className="space-y-4">
                {benefits.map((b, idx) => {
                  const IconComp = b.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/15 text-sand flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white mb-0.5">
                          {b.title}
                        </h4>
                        <p className="text-xs font-sans text-beige-200/80 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-2xl glass-card border border-white/15 text-xs font-sans text-beige-100">
                <strong className="block text-sand font-bold mb-0.5">Note on Estimating:</strong>
                NeevSaathi provides genuine, engineer-verified quotes based on actual architectural blueprints and soil conditions in Jaipur. We do not use misleading rough estimates that inflate later.
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/20 shadow-card flex flex-col justify-between text-white">
              <div>
                <span className="text-[11px] font-sans font-bold text-sand uppercase tracking-wider block mb-1">
                  Prefer Direct Discussion?
                </span>
                <h4 className="text-base font-serif font-bold text-white mb-1.5">
                  Chat Directly With Our Lead Engineer
                </h4>
                <p className="text-xs font-sans text-beige-200/80 leading-relaxed mb-5">
                  If you already have architectural drawings or plot registry documents, share them directly on WhatsApp for an express consultation.
                </p>
              </div>

              <a
                href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20have%20plot%20details%20and%20would%20like%20a%20construction%20estimate."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-terracotta hover:bg-terracotta-hover text-white font-sans font-semibold text-xs rounded-xl shadow-terracotta transition-colors duration-200"
              >
                <span>Chat on WhatsApp (+91 98290 12345)</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
