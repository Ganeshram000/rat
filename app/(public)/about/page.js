import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Users, CheckCircle, ArrowRight, HardHat, Ruler, Award, MapPin } from 'lucide-react';
import { companyConfig, companyIntro, companyStats } from '@/data/staticData';

export const metadata = {
  title: 'About Us — Construction Philosophy & Craftsmanship | NeevSaathi Jaipur',
  description: 'Learn about NeevSaathi, a premier turnkey building contractor in Jaipur committed to structural integrity, transparent estimates, and customer-first execution.',
};

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Structural Honesty',
      description: 'The foundation (Neev) is unseen once built, which is why we hold ourselves to the highest ethical and engineering standards. Fe-550D TMT reinforcement, certified mix designs, and proper curing are never compromised.'
    },
    {
      icon: Ruler,
      title: 'Estimate Transparency',
      description: 'We believe construction should have zero hidden costs. Our quotes feature itemized BOQ breakdowns specifying every material brand, thickness, and quantity beforehand.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'True to our name "Saathi" (companion/partner), we guide you through every choice: from room layouts and soil considerations to stone selections and waterproofing methods.'
    },
    {
      icon: HardHat,
      title: 'Safety & Site Discipline',
      description: 'Clean, organized construction sites, safe scaffolding practices, and respectful labor welfare ensure rapid, accident-free project delivery.'
    }
  ];

  return (
    <div className="bg-offwhite min-h-screen py-12 sm:py-16 lg:py-20 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero Banner */}
        <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold/40 shadow-2xl text-white relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              OUR STORY & PHILOSOPHY
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Building Enduring Structures Across Jaipur Since 2011
            </h1>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              At NeevSaathi, we bridge traditional Rajasthani architectural elegance with modern civil engineering precision and corporate transparency.
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

        {/* Main Introduction & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold uppercase tracking-wider">
              The Meaning of NeevSaathi
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-950">
              Why We Call Ourselves <span className="text-gold-dark">Neev</span> (Foundation) & <span className="text-gold-dark">Saathi</span> (Companion)
            </h2>

            <p className="text-navy-700 leading-relaxed">
              In Hindi, <strong>Neev</strong> means the foundation — the most crucial, load-bearing component of any building. Though buried beneath the ground, the longevity of every wall, arch, and ceiling depends entirely upon its strength.
            </p>

            <p className="text-navy-700 leading-relaxed">
              <strong>Saathi</strong> means a trusted companion. Constructing a home or commercial building is one of life’s most significant financial and emotional investments. We act as your knowledgeable, honest partner throughout the journey, protecting your budget, managing on-site contractors, and ensuring uncompromised execution.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="p-4 rounded-xl bg-white border border-navy-100 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-gold flex-shrink-0" />
                <div>
                  <span className="text-xs text-navy-500 uppercase font-medium block">Compliance</span>
                  <span className="text-sm font-bold text-navy-900">IS 456 & IS 1893 Standards</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-navy-100 shadow-sm flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
                <div>
                  <span className="text-xs text-navy-500 uppercase font-medium block">Local Focus</span>
                  <span className="text-sm font-bold text-navy-900">Jaipur & Greater Rajasthan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gold/40">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=85"
                alt="NeevSaathi Construction Site in Jaipur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider block">On-Site Supervision</span>
                <p className="text-sm font-serif font-bold">Primary Steel & Concrete Compaction in Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950">
              Our Core Construction Values
            </h3>
            <p className="text-sm text-navy-600">
              Built on verified engineering ethics and daily on-site discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-navy-950">
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company Stats Bar */}
        <div className="bg-navy rounded-2xl p-8 sm:p-10 border border-gold/40 shadow-xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {companyStats.slice(0, 4).map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-gold">{s.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-white">{s.label}</div>
                <div className="text-[11px] text-white/60">{s.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-gold"
          >
            <span>Start Your Construction Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
