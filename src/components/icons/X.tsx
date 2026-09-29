import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const X = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 64 64"
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
      <line x1="60.92" x2="3.08" y1="5.92" y2="58.08" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4" className="svgStroke colorStroke010101-0"/><line x1="3.08" x2="60.92" y1="5.92" y2="58.08" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4" className="svgStroke colorStroke010101-1"/>
    </svg>
  );
});

X.displayName = 'X';
export default X;
