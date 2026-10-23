'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useEstimateModal } from '@/components/common/EstimateModalContext';
import EstimateForm from './EstimateForm';

export default function EstimateModal() {
  const { isOpen, prefilledWorkType, closeModal } = useEstimateModal();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col border border-gold/40 text-navy-900">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 text-navy-600 hover:text-navy-950 bg-navy-50 hover:bg-gold/20 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-1 sm:p-2">
          <EstimateForm
            initialWorkType={prefilledWorkType}
            isCompact={true}
            title="Get a Free Project Estimate"
            subtitle="Tell us about your plot or property in Jaipur. Our civil engineers will audit your requirements and provide an itemized BOQ estimate."
            onSuccess={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
