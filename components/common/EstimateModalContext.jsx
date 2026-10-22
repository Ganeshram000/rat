'use client';

import React, { createContext, useContext, useState } from 'react';

const EstimateModalContext = createContext({
  isOpen: false,
  prefilledWorkType: '',
  openModal: () => {},
  closeModal: () => {},
});

export function EstimateModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledWorkType, setPrefilledWorkType] = useState('');

  const openModal = (workType = '') => {
    setPrefilledWorkType(workType);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefilledWorkType('');
  };

  return (
    <EstimateModalContext.Provider value={{ isOpen, prefilledWorkType, openModal, closeModal }}>
      {children}
    </EstimateModalContext.Provider>
  );
}

export function useEstimateModal() {
  const context = useContext(EstimateModalContext);
  if (!context) {
    throw new Error('useEstimateModal must be used within an EstimateModalProvider');
  }
  return context;
}
