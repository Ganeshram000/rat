import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Award, ShieldCheck, ArrowRight, Phone, Mail } from 'lucide-react';
import { teamMembers, companyConfig } from '@/data/staticData';

export const metadata = {
  title: 'Our Engineering & Architectural Team | NeevSaathi Jaipur',
  description: 'Meet the licensed civil engineers, principal architects, and site directors behind NeevSaathi construction projects in Jaipur, Rajasthan.',
};

export default function TeamPage() {
  return (
    <div className="bg-offwhite min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-[0.2em] uppercase">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>LEADERSHIP & EXPERTISE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950 tracking-tight">
            The Engineers & Architects Behind Your Structure
          </h1>

          <p className="text-base sm:text-lg text-navy-600 font-normal leading-relaxed">
            Our projects are led by IIT-alumni civil engineers, licensed architects, and certified structural designers with combined experience of over 70 years.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-gold/60 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Member Photo */}
              <div className="relative h-72 w-full overflow-hidden bg-navy-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-semibold text-gold tracking-wide uppercase block">
                    {member.qualification}
                  </span>
                  <span className="text-xs text-white/80">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Member Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-navy-950 group-hover:text-gold-dark transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold-dark">
                    {member.role}
                  </p>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy-100 flex items-center gap-2 text-[11px] text-navy-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>Licensed Civil Professional</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/40 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-white">
              Want Our Chief Engineer to Review Your Plot Plans?
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Get direct technical feedback on soil bearing, structural grid, and Vastu alignment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-navy-950 bg-gold hover:bg-gold-hover transition-colors shadow-gold"
            >
              Book Site Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
