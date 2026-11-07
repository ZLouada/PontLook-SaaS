import React from 'react';
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';

interface RichTextProps {
  data: any;
  className?: string;
  isAr?: boolean;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .slice(0, 80) || 'section';
}

export function extractTextFromNode(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.text) return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join('');
  }
  return '';
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadingsFromContent(data: any): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  if (!data) return headings;

  let rootChildren: any[] = [];
  if (typeof data === 'object' && data.root && Array.isArray(data.root.children)) {
    rootChildren = data.root.children;
  } else if (typeof data === 'string' && data.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(data);
      if (parsed.root && Array.isArray(parsed.root.children)) {
        rootChildren = parsed.root.children;
      }
    } catch {
      // ignore
    }
  }

  const seenIds = new Set<string>();

  for (const child of rootChildren) {
    if (child.type === 'heading') {
      const tag = child.tag || 'h2';
      const level = parseInt(tag.replace('h', ''), 10) || 2;
      const text = extractTextFromNode(child).trim();
      if (text) {
        let id = slugifyHeading(text);
        if (seenIds.has(id)) {
          id = `${id}-${headings.length + 1}`;
        }
        seenIds.add(id);
        headings.push({ id, text, level });
      }
    }
  }
  return headings;
}

const customConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
    const text = extractTextFromNode(node).trim();
    const id = slugifyHeading(text);

    if (Tag === 'h2') {
      return React.createElement(
        'div',
        { className: 'mt-14 mb-6 scroll-mt-28 group/h2' },
        React.createElement(
          'h2',
          {
            id,
            className:
              'text-2xl sm:text-3xl md:text-[2.25rem] font-heading font-bold text-[#0B0B10] tracking-tight leading-[1.14]',
          },
          nodesToJSX({ nodes: node.children })
        ),
        React.createElement(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '84',
            height: '14',
            viewBox: '0 0 84 14',
            className: 'mt-3.5 text-[#FF5A1F] block',
            'aria-hidden': 'true',
          },
          React.createElement('path', {
            d: 'M2 7q10-9 20 0t20 0 20 0 20 0',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '3',
            strokeLinecap: 'round',
          })
        )
      );
    }

    let headingClasses = '';
    switch (Tag) {
      case 'h1':
        headingClasses =
          'text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0B0B10] tracking-tight leading-[1.08] mt-14 mb-6 scroll-mt-28';
        break;
      case 'h3':
        headingClasses =
          'text-xl sm:text-2xl font-heading font-bold text-[#0B0B10] tracking-tight leading-[1.25] mt-10 mb-4 scroll-mt-28';
        break;
      case 'h4':
        headingClasses =
          'text-lg sm:text-xl font-heading font-semibold text-[#0B0B10] tracking-tight leading-snug mt-8 mb-3 scroll-mt-28';
        break;
      case 'h5':
      case 'h6':
        headingClasses =
          'text-base font-heading font-semibold text-[#0B0B10] tracking-tight leading-snug mt-6 mb-2 scroll-mt-28';
        break;
    }

    return React.createElement(
      Tag,
      { id, className: headingClasses },
      nodesToJSX({ nodes: node.children })
    );
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children || (Array.isArray(children) && children.length === 0)) {
      return React.createElement('p', { className: 'mb-4' }, React.createElement('br'));
    }
    return React.createElement(
      'p',
      { className: 'font-sans text-[1.125rem] text-[#3B3B44] leading-[1.8] font-normal mb-6' },
      children
    );
  },
  list: ({ node, nodesToJSX }) => {
    const isOrdered = node.listType === 'number' || node.tag === 'ol';
    const Tag = isOrdered ? 'ol' : 'ul';
    const listClasses = isOrdered
      ? 'list-decimal list-outside ml-6 rtl:mr-6 rtl:ml-0 mb-8 space-y-2.5 font-sans text-[1.08rem] leading-[1.75] text-[#3B3B44]'
      : 'list-disc list-outside ml-6 rtl:mr-6 rtl:ml-0 mb-8 space-y-2.5 font-sans text-[1.08rem] leading-[1.75] text-[#3B3B44]';

    return React.createElement(
      Tag,
      { className: listClasses },
      nodesToJSX({ nodes: node.children })
    );
  },
  listitem: ({ node, nodesToJSX }) => {
    return React.createElement(
      'li',
      { className: 'pl-1 rtl:pr-1 rtl:pl-0 font-sans' },
      nodesToJSX({ nodes: node.children })
    );
  },
  blockquote: ({ node, nodesToJSX }) => {
    return React.createElement(
      'blockquote',
      {
        className:
          'relative my-10 pt-10 sm:pt-12 font-heading font-semibold text-xl sm:text-2xl text-[#0B0B10] leading-snug pl-4 rtl:pr-4 rtl:pl-0',
      },
      React.createElement(
        'span',
        {
          className:
            'absolute top-0 left-0 rtl:right-0 rtl:left-auto text-7xl sm:text-8xl font-heading font-extrabold text-[#FF5A1F] leading-none select-none pointer-events-none -mt-2 opacity-90',
          'aria-hidden': 'true',
        },
        '“'
      ),
      React.createElement(
        'div',
        { className: 'relative z-10' },
        nodesToJSX({ nodes: node.children })
      )
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
        className:
          'text-[#C93D07] font-medium underline underline-offset-4 decoration-[#FF5A1F]/50 hover:decoration-[#FF5A1F] hover:text-[#FF5A1F] transition-colors',
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
            className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-6"
          >
            {p}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
