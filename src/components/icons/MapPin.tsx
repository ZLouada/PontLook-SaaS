import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const MapPin = forwardRef<SVGSVGElement, IconProps>((
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
      fill="currentColor"
      stroke="none"
      {...(strokeWidth ? { strokeWidth } : {})}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <path fill="currentColor" d="M51.9,19.9C51.9,30.9,32,64,32,64S12.1,30.9,12.1,19.9S21,0,32,0S51.9,8.9,51.9,19.9z" className="svgShape colore95c60-0"/><circle cx="32" cy="19.9" r="12.3" fill="currentColor" transform="rotate(-76.714 32.003 19.925)" className="svgShape colorffffff-1"/>
    </svg>
  );
});

MapPin.displayName = 'MapPin';
export default MapPin;
