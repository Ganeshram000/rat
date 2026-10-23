import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { companyConfig, serviceLocalities } from '@/data/staticData';
import GetQuoteCTA from '@/components/home/GetQuoteCTA';

export const metadata = {
  title: 'Contact NeevSaathi — Construction Site Office in Jaipur',
  description: 'Connect with NeevSaathi for construction estimates, site visits, and architectural civil engineering in Jaipur. Phone: +91 98290 12345, Vaishali Nagar, Jaipur.',
};

export default function ContactPage() {
  return (
    <div className="bg-offwhite min-h-screen py-12 sm:py-16 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero Banner */}
        <div className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold/40 shadow-2xl text-white relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              DIRECT SITE ACCESS
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Contact Our Jaipur Construction Office
            </h1>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              Have a residential plot or commercial building project? Speak directly with our site engineers, schedule an on-site audit, or receive an itemized estimate.
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

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-950">Direct Phone Helpline</h3>
            <p className="text-xs text-navy-600">Available Mon - Sat, 9:00 AM - 7:30 PM</p>
            <a href={`tel:${companyConfig.phoneClean}`} className="text-sm font-bold text-gold-dark hover:underline block">
              {companyConfig.phone}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-950">WhatsApp Business</h3>
            <p className="text-xs text-navy-600">Instant project queries & drawing reviews</p>
            <a 
              href={`https://wa.me/${companyConfig.whatsapp}?text=Hello%20NeevSaathi%2C%20I%20have%20an%20inquiry`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-emerald-600 hover:underline block"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-navy-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-950">Site Office</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              {companyConfig.address}
            </p>
            <span className="text-xs text-gold-dark font-medium block">
              RERA Reg: {companyConfig.reraRegistration}
            </span>
          </div>
        </div>

        {/* Embedded Get A Quote CTA / Form */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <GetQuoteCTA />
        </div>

      </div>
    </div>
  );
}
