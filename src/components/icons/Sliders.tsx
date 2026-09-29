import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Sliders = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 256.001 256.001"
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
      <rect width="256" height="256" fill="none"/><line x1="127.999" x2="127.999" y1="108" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-1"/><line x1="127.999" x2="127.999" y1="40" y2="68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-2"/><circle cx="127.999" cy="88" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-3"/><line x1="199.999" x2="200" y1="188" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-4"/><line x1="200" x2="199.999" y1="40" y2="148" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-5"/><circle cx="199.999" cy="168" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-6"/><line x1="55.999" x2="55.998" y1="156" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-7"/><line x1="55.998" x2="55.999" y1="40" y2="116" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-8"/><circle cx="55.999" cy="136" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" className="svgStroke colorStroke000000-9"/>
    </svg>
  );
});

Sliders.displayName = 'Sliders';
export default Sliders;
