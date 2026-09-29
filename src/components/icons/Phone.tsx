import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Phone = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 100000 100000"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      {...(strokeWidth ? { strokeWidth } : {})}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <path d="M49999 9958c22115,0 40043,17928 40043,40043 0,22114 -17928,40042 -40043,40042 -22114,0 -40042,-17928 -40042,-40042 0,-22115 17928,-40043 40042,-40043zm-10333 30403c5529,-3856 5706,-3809 948,-11922 -4758,-8112 -6899,-6064 -15259,1718 -12043,11210 32729,56990 44425,44425 7781,-8361 9830,-10501 1719,-15259 -8113,-4758 -8067,-4582 -11923,947 -6320,9054 -28964,-13590 -19910,-19909z" fill="currentColor" className="svgShape color000000-0"/>
    </svg>
  );
});

Phone.displayName = 'Phone';
export default Phone;
