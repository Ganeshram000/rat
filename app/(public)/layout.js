import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import EstimateModal from '@/components/enquiry/EstimateModal';
import { EstimateModalProvider } from '@/components/common/EstimateModalContext';

export default function PublicLayout({ children }) {
  return (
    <EstimateModalProvider>
      <div className="min-h-screen bg-offwhite text-navy-900 font-sans selection:bg-gold selection:text-navy-950 flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <EstimateModal />
      </div>
    </EstimateModalProvider>
  );
}
