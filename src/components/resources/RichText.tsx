import React from 'react';
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

interface RichTextProps {
  data: any;
  className?: string;
  isAr?: boolean;
}

const customConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
    let headingClasses = '';

    switch (Tag) {
      case 'h1':
        // Primary title hierarchy (42–52px desktop)
        headingClasses =
          'text-3xl sm:text-4xl md:text-[44px] font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mt-12 mb-6';
        break;
      case 'h2':
        // Major article sections (30–36px desktop, meaningful spacing above and below)
        headingClasses =
          'text-2xl sm:text-3xl md:text-[32px] font-heading font-bold text-neutral-950 tracking-tight leading-snug mt-12 mb-5';
        break;
      case 'h3':
        // Subsections (22–26px desktop, clearly distinct from body text)
        headingClasses =
          'text-xl sm:text-2xl font-heading font-semibold text-neutral-900 tracking-normal leading-snug mt-8 mb-3';
        break;
      case 'h4':
        headingClasses =
          'text-lg sm:text-xl font-heading font-semibold text-neutral-900 mt-6 mb-2';
        break;
      case 'h5':
      case 'h6':
        headingClasses =
          'text-base sm:text-lg font-heading font-semibold text-neutral-900 mt-4 mb-2';
        break;
    }

    return React.createElement(
      Tag,
      { className: headingClasses },
      nodesToJSX({ nodes: node.children })
    );
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children || (Array.isArray(children) && children.length === 0)) {
      return React.createElement('p', { className: 'mb-4' }, React.createElement('br'));
    }
    // Body: 17–19px desktop, line-height 1.8
    return React.createElement(
      'p',
      { className: 'text-[17px] sm:text-[18px] md:text-[19px] text-neutral-700 leading-[1.8] mb-6' },
      children
    );
  },
  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.listType === 'number' || node.tag === 'ol';
    const Tag = isOrdered ? 'ol' : 'ul';
    const listClasses = isOrdered
      ? 'list-decimal list-outside ml-6 rtl:mr-6 rtl:ml-0 mb-6 space-y-2 text-neutral-700 text-[17px] sm:text-[18px] leading-[1.8]'
      : 'list-disc list-outside ml-6 rtl:mr-6 rtl:ml-0 mb-6 space-y-2 text-neutral-700 text-[17px] sm:text-[18px] leading-[1.8]';

    return React.createElement(
      Tag,
      { className: listClasses },
      nodesToJSX({ nodes: node.children })
    );
  },
  listitem: ({ node, nodesToJSX }) => {
    return React.createElement(
      'li',
      { className: 'pl-1 rtl:pr-1 rtl:pl-0' },
      nodesToJSX({ nodes: node.children })
    );
  },
  blockquote: ({ node, nodesToJSX }) => {
    return React.createElement(
      'blockquote',
      {
        className:
          'border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#FF5C00] pl-5 rtl:pr-5 py-3 my-8 italic text-neutral-800 bg-neutral-50/80 rounded-r-xl rtl:rounded-l-xl text-lg leading-relaxed',
      },
      nodesToJSX({ nodes: node.children })
    );
  },
  link: ({ node, nodesToJSX }) => {
    const fields = (node as any).fields || {};
    const href = fields.url || '#';
    const target = fields.newTab ? '_blank' : undefined;
    const rel = fields.newTab ? 'noopener noreferrer' : undefined;

    return React.createElement(
      'a',
      {
        href,
        target,
        rel,
        className: 'text-[#FF5C00] font-medium hover:underline transition-colors',
      },
      nodesToJSX({ nodes: node.children })
    );
  },
});

export function RichText({ data, className = '', isAr = false }: RichTextProps) {
  if (!data) return null;

  // Case 1: Lexical object
  if (typeof data === 'object' && data.root && Array.isArray(data.root.children)) {
    return (
      <div className={`prose-pontlook max-w-none ${className}`}>
        <LexicalRichText
          data={data}
          converters={customConverters}
          disableContainer={true}
        />
      </div>
    );
  }

  // Case 2: String that might be JSON serialized Lexical state
  if (typeof data === 'string') {
    const trimmed = data.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.root && Array.isArray(parsed.root.children)) {
          return (
            <div className={`prose-pontlook max-w-none ${className}`}>
              <LexicalRichText
                data={parsed}
                converters={customConverters}
                disableContainer={true}
              />
            </div>
          );
        }
      } catch {
        // Fall back to plain text handling
      }
    }

    // Case 3: Plain text string fallback
    const paragraphs = data
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) return null;

    return (
      <div className={`prose-pontlook max-w-none ${className}`}>
        {paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="text-[17px] sm:text-[18px] md:text-[19px] text-neutral-700 leading-[1.8] mb-6"
          >
            {p}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
