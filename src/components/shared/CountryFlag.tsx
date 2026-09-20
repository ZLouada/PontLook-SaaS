import React from 'react';

export type CountryCode = 'SA' | 'AE' | 'QA' | 'KW' | 'OM' | 'BH' | 'OTHER' | string;

interface CountryFlagProps {
  code: CountryCode;
  className?: string;
  title?: string;
}

export default function CountryFlag({
  code,
  className = 'w-5 h-3.5',
  title,
}: CountryFlagProps) {
  const normalized = (code || '').toUpperCase().trim();

  // 1. Saudi Arabia (KSA) - Emerald Green with White Sword & Script
  if (normalized === 'SA' || normalized === 'SAUDI ARABIA') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of Saudi Arabia'}
        role="img"
      >
        <rect width="36" height="24" fill="#006C35" />
        {/* White Sword */}
        <path d="M10 16.5h15v1.2H10zm-1.5-.8h1.2v2.8H8.5zm16.5 1l3-.6-3-.6v1.2z" fill="#FFFFFF" />
        {/* Stylized Arabic Inscription */}
        <g fill="#FFFFFF" opacity="0.95">
          <path d="M9.5 8h17v1.8h-17zm1.5 2.5h2v2h-2zm3.5 0h2v2h-2zm3.5 0h2v2h-2zm3.5 0h2v2h-2zm3.5 0h2v2h-2z" />
          <path d="M12 6.5h2v1.2h-2zm4 0h2v1.2h-2zm4 0h2v1.2h-2zm4 0h2v1.2h-2z" />
        </g>
      </svg>
    );
  }

  // 2. United Arab Emirates (UAE) - Red, Green, White, Black
  if (normalized === 'AE' || normalized === 'UNITED ARAB EMIRATES' || normalized === 'UAE') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of United Arab Emirates'}
        role="img"
      >
        <rect width="36" height="24" fill="#FFFFFF" />
        <rect x="0" y="0" width="36" height="8" fill="#00732F" />
        <rect x="0" y="8" width="36" height="8" fill="#FFFFFF" />
        <rect x="0" y="16" width="36" height="8" fill="#000000" />
        <rect x="0" y="0" width="9.5" height="24" fill="#FF0000" />
      </svg>
    );
  }

  // 3. Qatar (QA) - Maroon with 9 White Serrated Points
  if (normalized === 'QA' || normalized === 'QATAR') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of Qatar'}
        role="img"
      >
        <rect width="36" height="24" fill="#8D1B3D" />
        <path
          d="M0 0h12l3 1.33-3 1.33 3 1.34-3 1.33 3 1.34-3 1.33 3 1.33-3 1.34 3 1.33-3 1.33 3 1.34-3 1.33 3 1.33-3 1.34 3 1.33-3 1.33 3 1.34-3 1.33L0 24z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 4. Kuwait (KW) - Green, White, Red with Black Trapezoid
  if (normalized === 'KW' || normalized === 'KUWAIT') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of Kuwait'}
        role="img"
      >
        <rect width="36" height="24" fill="#FFFFFF" />
        <rect x="0" y="0" width="36" height="8" fill="#007A3D" />
        <rect x="0" y="8" width="36" height="8" fill="#FFFFFF" />
        <rect x="0" y="16" width="36" height="8" fill="#CE1126" />
        <path d="M0 0v24l9-8V8z" fill="#000000" />
      </svg>
    );
  }

  // 5. Oman (OM) - White, Red, Green with Red Hoist & National Emblem
  if (normalized === 'OM' || normalized === 'OMAN') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of Oman'}
        role="img"
      >
        <rect width="36" height="24" fill="#FFFFFF" />
        <rect x="0" y="0" width="36" height="8" fill="#FFFFFF" />
        <rect x="0" y="8" width="36" height="8" fill="#DB161B" />
        <rect x="0" y="16" width="36" height="8" fill="#008000" />
        <rect x="0" y="0" width="9.5" height="24" fill="#DB161B" />
        {/* Emblem */}
        <circle cx="4.7" cy="4.2" r="2" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.9" />
        <line x1="4.7" y1="2.2" x2="4.7" y2="6.2" stroke="#FFFFFF" strokeWidth="0.8" />
      </svg>
    );
  }

  // 6. Bahrain (BH) - Red with 5 White Serrated Points
  if (normalized === 'BH' || normalized === 'BAHRAIN') {
    return (
      <svg
        viewBox="0 0 36 24"
        className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
        aria-label={title || 'Flag of Bahrain'}
        role="img"
      >
        <rect width="36" height="24" fill="#DA291C" />
        <path
          d="M0 0h11l3 2.4-3 2.4 3 2.4-3 2.4 3 2.4-3 2.4 3 2.4-3 2.4 3 2.4-3 2.4L0 24z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 7. Other Region / Global
  return (
    <svg
      viewBox="0 0 36 24"
      className={`inline-block shrink-0 rounded-sm overflow-hidden ${className}`}
      aria-label={title || 'Global / Other Region'}
      role="img"
    >
      <rect width="36" height="24" fill="#1C1D22" stroke="#26282D" strokeWidth="1" />
      <circle cx="18" cy="12" r="7" fill="none" stroke="#A1A1AA" strokeWidth="1.2" />
      <ellipse cx="18" cy="12" rx="3.5" ry="7" fill="none" stroke="#A1A1AA" strokeWidth="1.2" />
      <line x1="11" y1="12" x2="25" y2="12" stroke="#A1A1AA" strokeWidth="1.2" />
    </svg>
  );
}
