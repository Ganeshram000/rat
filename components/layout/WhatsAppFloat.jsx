'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Optional Dismissible Tooltip */}
      {showTooltip && (
        <div className="relative mb-2 flex items-center gap-2 glass-panel text-white px-3 py-1.5 rounded-xl shadow-lg border border-white/25 text-[11px] font-sans font-medium animate-fade-in max-w-xs">
          <span>Need estimate guidance? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-beige-200/70 hover:text-white transition-colors p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Compact Floating WhatsApp Button */}
      <a
        href="https://wa.me/919829012345?text=Hello%20NeevSaathi%2C%20I%20am%20planning%20a%20construction%20project%20in%20Jaipur%20and%20would%20like%20to%20discuss%20an%20estimate."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with NeevSaathi construction engineer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5 fill-white text-white" />
      </a>
    </div>
  );
}
