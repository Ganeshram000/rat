import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ variant = 'light', className = '', showSubtitle = true, size = 'default' }) {
  // variant: 'light' (for Navy header/footer) or 'navy' (for white/light backgrounds)
  const isLight = variant === 'light';
  
  const iconSize = size === 'large' ? 48 : 42;

  return (
    <Link href="/" className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {/* Generated Architectural Emblem Image */}
      <div className={`relative rounded-xl overflow-hidden border-2 border-[#C9A45C] shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
        size === 'large' ? 'w-12 h-12' : 'w-10 h-10'
      }`}>
        <Image
          src="/logo.png"
          alt="NeevSaathi Construction Logo"
          width={iconSize}
          height={iconSize}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span 
            className={`font-serif font-extrabold tracking-tight ${size === 'large' ? 'text-2xl' : 'text-xl'}`}
            style={{ color: isLight ? '#FFFFFF' : '#142B4A' }}
          >
            Neev
          </span>
          <span 
            className={`font-serif font-extrabold ${size === 'large' ? 'text-2xl' : 'text-xl'} ml-1`}
            style={{ color: '#C9A45C' }}
          >
            Saathi
          </span>
        </div>
        
        {showSubtitle && (
          <span 
            className="text-[9.5px] uppercase tracking-[0.24em] font-sans font-bold"
            style={{ color: isLight ? '#DFC07C' : '#947032' }}
          >
            CONSTRUCTION • JAIPUR
          </span>
        )}
      </div>
    </Link>
  );
}
