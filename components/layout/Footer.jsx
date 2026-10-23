import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowRight, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { companyConfig, servicesData } from '@/data/staticData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Featured Projects', href: '/projects' },
    { label: 'Our Engineering Team', href: '/team' },
    { label: 'Contact Site Office', href: '/contact' },
    { label: 'Get a Quote', href: '/#quote' },
  ];

  const localities = [
    'Vaishali Nagar', 'Jagatpura', 'Mansarovar', 'C-Scheme',
    'Ajmer Road', 'Malviya Nagar', 'Tonk Road', 'Civil Lines',
    'Bani Park', 'Sirsi Road', 'Kalwar Road', 'Jhotwara'
  ];

  return (
    <footer className="bg-navy-950 text-white border-t border-gold/30 pt-16 pb-8 relative z-20" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Company Intro (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" size="large" />

            <p className="text-xs sm:text-sm text-white/75 font-normal leading-relaxed max-w-sm pt-2">
              NeevSaathi is Jaipur’s premier turnkey civil and building contractor, dedicated to uncompromised structural integrity, certified materials, transparent BOQ estimation, and guaranteed on-time project handover.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-white/70">
              <span className="flex items-center gap-1.5 text-gold font-medium">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                RERA Reg: {companyConfig.reraRegistration}
              </span>
              <span>Primary Fe-550D TMT Steel & IS-Code Compliant RCC</span>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href={companyConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-white/80"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={companyConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-white/80"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={companyConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-white/80"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={companyConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-white/80"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-serif font-bold text-gold tracking-wider uppercase">
              Our Construction Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-white/75 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold/60">•</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-serif font-bold text-gold tracking-wider uppercase">
              Company & Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold/60">•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-serif font-bold text-gold tracking-wider uppercase">
              Jaipur Site Office
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed text-white/75">
                  {companyConfig.address}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`tel:${companyConfig.phoneClean}`}
                  className="hover:text-gold transition-colors font-medium text-white"
                >
                  {companyConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="hover:text-gold transition-colors text-white/75"
                >
                  {companyConfig.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${companyConfig.whatsapp}?text=Hello%20NeevSaathi%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Jaipur`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Localities Served Line */}
        <div className="py-6 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <span className="font-semibold text-gold tracking-wide">
            Prime Service Localities in Jaipur:
          </span>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {localities.map((loc) => (
              <span key={loc} className="hover:text-white transition-colors cursor-default">
                {loc} •
              </span>
            ))}
            <span>All Rajasthan</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {currentYear} {companyConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px]">RERA Compliant Contractor</span>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Privacy & Legal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
