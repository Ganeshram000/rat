import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import EstimateModal from '@/components/enquiry/EstimateModal';
import { EstimateModalProvider } from '@/components/common/EstimateModalContext';

export default function PublicLayout({ children }) {
  return (
    <EstimateModalProvider>
      <div className="min-h-screen relative bg-[#24140E] text-[#FAF6EE] font-sans selection:bg-terracotta selection:text-white">
        {/* Architectural Background with Soft Blur and Warm Golden-Hour Tint */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-102 filter blur-[3.5px] brightness-[0.82] contrast-[1.08]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85')`,
            }}
          />
          {/* Subtle Warm Terracotta / Amber Gradient Overlay (Preserves background recognizability) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#351C14]/35 to-[#1E0F0A]/65" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <EstimateModal />
        </div>
      </div>
    </EstimateModalProvider>
  );
}
