'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Dictionary } from '@/i18n/dictionaries/en';

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ dictionary, children }: Readonly<{ dictionary?: Dictionary | null, children: ReactNode }>) {
  return (
    <DictionaryContext.Provider value={dictionary ?? null}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
}
