'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Dictionary } from '@/i18n';

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ dictionary, children }: Readonly<{ dictionary: Dictionary, children: ReactNode }>) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
}
