import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Residential House Construction', href: '/services#residential-construction' },
    { label: 'Commercial Construction', href: '/services#commercial-construction' },
    { label: 'Home Renovation & Remodeling', href: '/services#renovation-remodeling' },
    { label: 'Turnkey Construction & Contracting', href: '/services#turnkey-construction' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About NeevSaathi', href: '/about' },
    { label: 'Services Portfolio', href: '/services' },
    { label: 'Featured Projects', href: '/projects' },
    { label: 'Contact Site Office', href: '/contact' },
    { label: 'Request Free Estimate', href: '/estimate' },
    { label: 'Admin Portal', href: '/admin' },
  ];

  const localities = [
    'Vaishali Nagar', 'Mansarovar', 'Malviya Nagar', 'Jagatpura',
    'C-Scheme', 'Civil Lines', 'Ajmer Road', 'Tonk Road',
    'Sitapura', 'Vidhyadhar Nagar', 'Raja Park', 'Chomu'
  ];

  return (
    <footer className="bg-[#140C08]/95 backdrop-blur-2xl text-beige-100 border-t border-white/15 pt-16 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Philosophy (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="large" />
            
            <p className="text-xs sm:text-sm text-beige-200/80 font-sans leading-relaxed max-w-sm pt-2">
              Building Your Vision Into Reality. 
              NeevSaathi is Jaipur’s trusted civil and building contractor, dedicated to uncompromised structural strength, transparent BOQ estimates, and on-time project execution.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-badge text-xs text-beige-200">
                <ShieldCheck className="w-4 h-4 text-sand" />
                <span>Fe550D TMT & Tested Concrete</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-badge text-xs text-beige-200">
                <span className="w-2 h-2 rounded-full bg-sand" />
                <span>Jaipur Registered Contractor</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-transform hover:scale-102"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Senior Engineer (+91 98290 12345)</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-beige-200/70 hover:text-white transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Construction Services
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {services.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-beige-200/70 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Jaipur Site Office
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-beige-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                <span>Plot No. 42, Main Tonk Road, Near Gopalpura Flyover, Jaipur, Rajasthan 302015</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sand flex-shrink-0" />
                <a href="tel:+919829012345" className="hover:text-white transition-colors">
                  +91 98290 12345
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sand flex-shrink-0" />
                <a href="mailto:contact@neevsaathi.com" className="hover:text-white transition-colors">
                  contact@neevsaathi.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-semibold text-sand uppercase tracking-wider mb-2">
                Coverage Localities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {localities.slice(0, 6).map((loc, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md glass-badge text-[10px] text-beige-200">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-beige-200/60">
          <div>
            &copy; {currentYear} NeevSaathi Construction & Contracting Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Jaipur, Rajasthan, India</span>
            <Link href="/admin" className="hover:text-sand transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
