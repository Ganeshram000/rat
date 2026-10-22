import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, CheckCircle, ArrowRight, HardHat, Ruler } from 'lucide-react';

export const metadata = {
  title: 'About Us — Construction Philosophy & Craftsmanship',
  description: 'Learn about NeevSaathi, a premier building contractor in Jaipur committed to structural integrity, transparent estimates, and customer-first execution.',
};

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Structural Honesty',
      description: 'The foundation (Neev) is unseen once built, which is why we hold ourselves to the highest ethical and engineering standards. Fe550D TMT reinforcement, certified mix designs, and proper curing are never compromised.'
    },
    {
      icon: Ruler,
      title: 'Estimate Transparency',
      description: 'We believe construction should have zero hidden costs. Our quotes feature itemized BOQ breakdowns specifying every material brand, thickness, and quantity beforehand.'
    },
    {
      icon: Users,
      title: 'Customer-Centric Partnership',
      description: 'True to our name "Saathi" (companion/partner), we guide you through every choice: from room layouts and soil considerations to tile selections and waterproofing methods.'
    },
    {
      icon: HardHat,
      title: 'Safety & Site Discipline',
      description: 'Clean, organized construction sites, safe scaffolding practices, and respectful labor welfare ensure rapid, accident-free project delivery.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-semibold uppercase tracking-wider mb-3">
              Our Story & Philosophy
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Building Enduring Structures Across Jaipur
            </h1>
            <p className="text-beige-200/90 text-sm sm:text-base font-sans mt-3 leading-relaxed">
              At NeevSaathi, we bridge traditional Rajasthani architectural elegance with modern civil engineering precision.
            </p>
          </div>
        </div>
      </div>

      {/* Main Introduction & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-bold uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Dedicated to Quality, Transparency, and Your Lifelong Vision
              </h2>
              <p className="text-beige-200/80 font-sans text-xs sm:text-sm leading-relaxed">
                <strong className="text-white">NeevSaathi</strong> was established in Jaipur with a singular conviction: constructing a home or commercial building is one of the most consequential milestones in a person’s life. It demands uncompromised structural integrity, complete transparency, and genuine respect for the owner’s investment.
              </p>
              <p className="text-beige-200/80 font-sans text-xs sm:text-sm leading-relaxed">
                Operating across Jaipur’s vibrant localities—from Vaishali Nagar and Mansarovar to Jagatpura and C-Scheme—our team brings focused on-site engineering expertise, deep local knowledge of Rajasthan’s geological and climatic nuances, and a commitment to on-time milestone delivery.
              </p>

              <div className="p-6 rounded-2xl glass-card border border-white/20 text-white">
                <h4 className="font-serif font-bold text-sand text-base mb-1">
                  The NeevSaathi Promise
                </h4>
                <p className="text-beige-100 font-sans text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;A building is only as good as what lies beneath the surface. From foundation depth and steel reinforcement to the final touch of paint, we build every square foot as if it were our own family home.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Showcase Image Grid (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="space-y-3.5">
                <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-soft border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80"
                    alt="Civil engineering RCC casting on site in Jaipur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 sm:h-40 rounded-2xl overflow-hidden shadow-soft border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                    alt="Finished residential villa in Jaipur"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3.5 pt-6">
                <div className="h-32 sm:h-40 rounded-2xl overflow-hidden shadow-soft border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                    alt="Commercial building framing in Jaipur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-soft border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Modern Villa in Jagatpura, Jaipur"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full glass-badge text-sand text-xs font-sans font-bold uppercase tracking-wider mb-2">
            What Defines Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Our Core Construction Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/20 shadow-card flex flex-col justify-between hover:border-white/40 transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/15 text-sand flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-beige-200/80 font-sans text-xs sm:text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality & Customer Communication */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/20 shadow-2xl text-white">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-sans tracking-wider text-sand font-bold block mb-1">
              Transparent Supervision
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              How We Communicate During Your Construction
            </h2>
            <p className="text-beige-200/80 font-sans text-xs sm:text-sm leading-relaxed mb-6">
              We understand that you cannot be present on the building site every day. We bridge that gap with systematic digital reporting:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-sans text-beige-100 mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                <span>Weekly photographic progress logs sent directly to your WhatsApp</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                <span>Advance material test certificates (cement bag dates, TMT mill tags)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                <span>Stage-wise approval sign-offs prior to slab casting</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                <span>Transparent milestone-linked billing matching actual work completed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/estimate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white font-sans font-semibold text-xs sm:text-sm rounded-xl shadow-terracotta transition-all duration-200 hover:scale-102"
              >
                <span>Request a Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 glass-button hover:bg-white/20 text-white text-xs sm:text-sm font-sans font-medium rounded-xl transition-colors duration-200"
              >
                <span>Visit Our Jaipur Site Office</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
