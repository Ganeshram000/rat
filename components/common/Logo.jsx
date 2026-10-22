import React from 'react';
import Link from 'next/link';

export default function Logo({ variant = 'dark', className = '', showSubtitle = true, size = 'default' }) {
  const isLight = variant === 'light'; // Light text for dark backgrounds (Footer / Dark CTA)
  
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Architectural Foundation + Apex Mark */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${
        isLight ? 'bg-terracotta-900 border border-sand/40' : 'bg-terracotta text-white shadow-sm border border-terracotta-700/40'
      } p-2 transition-transform duration-200 group-hover:scale-105`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Foundation Blocks (Neev) */}
          <rect x="6" y="30" width="28" height="3" rx="1.5" fill={isLight ? '#D9A373' : '#FAF6EE'} />
          <rect x="10" y="24" width="20" height="3" rx="1" fill={isLight ? '#F3E7DA' : '#D9A373'} />
          
          {/* Architectural Columns & Apex Roofline */}
          <path
            d="M20 5L32 15V22H27V16L20 10.5L13 16V22H8V15L20 5Z"
            fill={isLight ? '#FFFFFF' : '#FAF6EE'}
          />
          <path
            d="M17 18H23V24H17V18Z"
            fill="#D9A373"
          />
          {/* Center Keystone */}
          <circle cx="20" cy="13" r="1.5" fill={isLight ? '#D9A373' : '#A3452F'} />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className={`font-serif font-bold tracking-tight ${size === 'large' ? 'text-2xl' : 'text-xl'} ${
            isLight ? 'text-white' : 'text-brown-dark'
          }`}>
            Neev
          </span>
          <span className={`font-serif font-bold ${size === 'large' ? 'text-2xl' : 'text-xl'} text-terracotta ml-0.5`}>
            Saathi
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[9px] uppercase tracking-[0.22em] font-sans font-medium ${
            isLight ? 'text-sand' : 'text-brown-medium'
          }`}>
            Jaipur • Construction
          </span>
        )}
      </div>
    </Link>
  );
}
