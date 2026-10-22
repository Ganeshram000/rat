import React from 'react';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen relative bg-[#1B100C] text-[#FAF6EE] flex flex-col justify-center items-center p-6 text-center">
      {/* Blurred Architectural Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 filter blur-[8px] brightness-[0.52]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#251510]/70 via-[#1C0F0B]/80 to-[#120906]/95" />
      </div>

      <div className="relative z-10 max-w-md w-full glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl space-y-6">
        <div className="flex justify-center">
          <Logo variant="light" size="large" />
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-6xl font-serif font-bold text-sand block drop-shadow-sm">
            404
          </span>
          <h1 className="text-2xl font-serif font-bold text-white">
            Page Under Construction or Not Found
          </h1>
          <p className="text-xs sm:text-sm text-beige-200/80 font-sans leading-relaxed">
            The page you are looking for might have been relocated, or is temporarily undergoing site improvements by the NeevSaathi engineering team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs rounded-xl shadow-terracotta transition-all duration-200 hover:scale-102"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 glass-button hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-colors duration-200"
          >
            <Phone className="w-4 h-4 text-sand" />
            <span>Contact Site Office</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
