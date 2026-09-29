import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Zap = forwardRef<SVGSVGElement, IconProps>((
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
      <rect width="256" height="256" fill="none"/><polygon fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" points="96 239.992 112 159.992 48 135.992 160 15.992 144 95.992 208 119.992 96 239.992" className="svgStroke colorStroke000000-1"/>
    </svg>
  );
});

Zap.displayName = 'Zap';
export default Zap;
