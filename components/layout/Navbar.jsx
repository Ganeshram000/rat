'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useEstimateModal } from '@/components/common/EstimateModalContext';
import { companyConfig } from '@/data/staticData';

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useEstimateModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Our Team', href: '/team' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* 1. Top Utility Info Bar - 100% Solid Navy & Gold */}
      <div 
        className="w-full text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#C9A45C]/30 select-none z-50 relative"
        style={{ backgroundColor: '#091424' }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#DFC07C] text-[11px] sm:text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              Verified Turnkey Contractor • Jaipur, Rajasthan
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-[11px] text-white/80">
              RERA Reg: <strong className="text-[#DFC07C] font-mono">{companyConfig.reraRegistration}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${companyConfig.phoneClean}`}
              className="flex items-center gap-1.5 text-white hover:text-[#C9A45C] transition-colors font-medium text-xs"
            >
              <Phone className="w-3 h-3 text-[#C9A45C]" />
              <span className="font-semibold tracking-wide">{companyConfig.phone}</span>
            </a>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-white/70 text-[11px]">
              {companyConfig.officeHours}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Header - 100% Solid Opaque Royal Navy #142B4A */}
      <header 
        className="sticky top-0 z-50 w-full shadow-2xl border-b-2 border-[#C9A45C]"
        style={{ backgroundColor: '#142B4A' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo on Left */}
            <div className="flex-shrink-0">
              <Logo variant="light" size="default" />
            </div>

            {/* Desktop Navigation Links - High-Contrast White & Gold */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative ${
                      active
                        ? 'text-[#C9A45C] bg-[#0D1C30] border border-[#C9A45C]/50 shadow-sm'
                        : 'text-white hover:text-[#C9A45C] hover:bg-[#1C3E6A]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="absolute -bottom-1 left-3.5 right-3.5 h-0.5 bg-[#C9A45C] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Direct Call & Prominent Gold "Get a Quote" Button */}
            <div className="hidden sm:flex items-center gap-3 xl:gap-4">
              {/* Phone Shortcut */}
              <a
                href={`tel:${companyConfig.phoneClean}`}
                className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-white hover:text-[#C9A45C] hover:bg-[#1C3E6A]/50 transition-colors"
                title="Call our Jaipur office directly"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D1C30] border border-[#C9A45C]/60 flex items-center justify-center text-[#C9A45C]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="text-left text-xs leading-tight">
                  <span className="block text-[#DFC07C] text-[10px] uppercase font-bold tracking-wider">Direct Line</span>
                  <span className="font-bold text-white tracking-wide">{companyConfig.phone}</span>
                </div>
              </a>

              {/* High-Visibility Gold "Get a Quote" Button */}
              <button
                onClick={() => openModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-[#0A1628] bg-[#C9A45C] hover:bg-[#DFC07C] active:scale-[0.98] transition-all duration-200 shadow-md group cursor-pointer flex-shrink-0"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openModal()}
                className="px-3 py-1.5 rounded-md text-xs font-bold text-[#0A1628] bg-[#C9A45C] hover:bg-[#DFC07C] transition-colors"
              >
                Get Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:text-[#C9A45C] bg-[#0D1C30] border border-[#C9A45C]/40 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A45C]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer - 100% Solid Navy */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden border-t-2 border-[#C9A45C] px-4 pt-4 pb-6 shadow-2xl animate-fade-in"
            style={{ backgroundColor: '#0D1C30' }}
          >
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-base font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      active
                        ? 'bg-[#142B4A] text-[#C9A45C] border-l-4 border-[#C9A45C]'
                        : 'text-white hover:bg-[#142B4A] hover:text-[#C9A45C]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 pt-4 border-t border-[#1C3E6A] flex flex-col gap-3">
              <a
                href={`tel:${companyConfig.phoneClean}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#142B4A] text-white text-sm font-semibold border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#C9A45C]" />
                <span>Call {companyConfig.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-[#0A1628] bg-[#C9A45C] hover:bg-[#DFC07C] transition-colors shadow-md"
              >
                <span>Request Free Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
