'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Dictionary } from '@/i18n';
import { en } from '@/i18n/dictionaries/en';

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ dictionary, children }: Readonly<{ dictionary?: Dictionary | null, children: ReactNode }>) {
  return (
    <DictionaryContext.Provider value={dictionary || en}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const context = useContext(DictionaryContext);
  return context || en;
}
