import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Lock = forwardRef<SVGSVGElement, IconProps>((
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
      <rect width="44" height="32" x="10" y="30" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4" className="svgStroke colorStroke010101-0"/><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="4" d="M46,30H18V16A14,14,0,0,1,32,2h0A14,14,0,0,1,46,16Z" className="svgStroke colorStroke010101-1"/>
    </svg>
  );
});

Lock.displayName = 'Lock';
export default Lock;
