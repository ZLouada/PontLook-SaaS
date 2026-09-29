'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { viewportOnce, wordContainer, wordItem } from '@/lib/motion';

type Props = {
  /** Plain text. Split on whitespace; each word rises out of its own mask. */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  /** Set false to play on mount instead of on scroll (above-the-fold copy). */
  onScroll?: boolean;
  /** Words to emphasize with gradient highlight */
  highlightWords?: string[];
  highlightClassName?: string;
};

export default function TextReveal({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  onScroll = true,
  highlightWords = [],
  highlightClassName = 'bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent font-bold',
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '');
  const highlightsNormalized = highlightWords.map((hw) => cleanWord(hw));

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className}>
        {words.map((word, i) => {
          const isHighlighted = highlightsNormalized.includes(cleanWord(word));
          return (
            <React.Fragment key={`${word}-${i}`}>
              <span className={isHighlighted ? highlightClassName : undefined}>{word}</span>
              {i < words.length - 1 ? ' ' : null}
            </React.Fragment>
          );
        })}
      </Plain>
    );
  }

  const Tag = m[as];
  const play = onScroll
    ? { whileInView: 'show' as const, viewport: viewportOnce }
    : { animate: 'show' as const };

  return (
    <Tag
      className={className}
      initial="hidden"
      variants={wordContainer}
      transition={{ delayChildren: delay }}
      {...play}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightsNormalized.includes(cleanWord(word));

        return (
          <React.Fragment key={`${word}-${i}`}>
            {/* wrapper clips, inner span travels */}
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}
            >
              <m.span
                className={`inline-block will-change-transform ${
                  isHighlighted ? highlightClassName : ''
                }`}
                variants={wordItem}
              >
                {word}
              </m.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
