import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Loader2 = forwardRef<SVGSVGElement, IconProps>((
  {
    size = 24,
    strokeWidth,
    className = '',
    style,
    color = 'currentColor',
    ...props
  },
  ref
) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      {...(strokeWidth ? { strokeWidth } : {})}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <rect width="256" height="256" fill="none"/><line x1="128" x2="128" y1="32" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-1"/><line x1="195.882" x2="173.255" y1="60.118" y2="82.745" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-2"/><line x1="224" x2="192" y1="128" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-3"/><line x1="195.882" x2="173.255" y1="195.882" y2="173.255" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-4"/><line x1="128" x2="128" y1="224" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-5"/><line x1="60.118" x2="82.745" y1="195.882" y2="173.255" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-6"/><line x1="32" x2="64" y1="128" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-7"/><line x1="60.118" x2="82.745" y1="60.118" y2="82.745" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" className="svgStroke colorStroke000000-8"/>
    </svg>
  );
});

Loader2.displayName = 'Loader2';
export default Loader2;
