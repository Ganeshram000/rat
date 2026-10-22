'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useEstimateModal } from '@/components/common/EstimateModalContext';

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useEstimateModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-3 z-40 w-full px-3 sm:px-6 lg:px-8 transition-all duration-200">
      <div className="max-w-7xl mx-auto">
        <nav 
          className={`rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-200 ${
            isScrolled ? 'glass-nav-scrolled' : 'glass-nav'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo on Left */}
          <div className="flex-shrink-0">
            <Logo variant="light" size="default" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-sans transition-colors duration-200 ${
                    active
                      ? 'text-white font-semibold drop-shadow-sm'
                      : 'text-beige-200/80 hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Tools: Phone, WhatsApp, and Get Free Estimate CTA */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            {/* Phone shortcut */}
            <a
              href="tel:+919829012345"
              className="hidden md:flex items-center gap-1.5 text-xs text-beige-100 hover:text-white transition-colors py-1.5 px-3 rounded-full hover:bg-white/10"
              title="Call NeevSaathi Site Office"
            >
              <Phone className="w-3.5 h-3.5 text-sand" />
              <span className="font-medium">+91 98290 12345</span>
            </a>

            {/* WhatsApp Icon Circle */}
            <a
              href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20am%20interested%20in%20a%20construction%20estimate%20in%20Jaipur."
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
            </a>

            {/* Primary Terracotta CTA Button */}
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-1.5 px-4 lg:px-5 py-2 bg-terracotta hover:bg-terracotta-hover text-white rounded-full text-xs sm:text-sm font-sans font-medium shadow-terracotta transition-all duration-200 hover:scale-102"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openModal()}
              className="px-3 py-1.5 bg-terracotta text-white rounded-full text-xs font-medium"
            >
              Estimate
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-beige-100 hover:text-white rounded-xl bg-white/10 border border-white/20 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Glass Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-5 glass-nav rounded-2xl animate-fade-in space-y-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-beige-200/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/15 flex flex-col gap-2.5">
              <a
                href="tel:+919829012345"
                className="flex items-center gap-2 text-xs text-beige-100 hover:text-white px-3 py-2 rounded-lg bg-white/5"
              >
                <Phone className="w-3.5 h-3.5 text-sand" />
                <span>Call: +91 98290 12345</span>
              </a>

              <a
                href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20am%20interested%20in%20a%20construction%20estimate."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl bg-[#25D366] text-white"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Consultation</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="w-full py-2.5 px-4 bg-terracotta hover:bg-terracotta-hover text-white rounded-xl text-xs font-semibold shadow-terracotta flex items-center justify-center gap-1.5"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
