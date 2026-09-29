import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Sparkles = forwardRef<SVGSVGElement, IconProps>((
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
      <path fill="currentColor" d="M39.927,32.1C27.165,35.386,24.386,38.165,21.1,50.927a.1.1,0,0,1-.19,0C17.614,38.165,14.835,35.386,2.073,32.1a.1.1,0,0,1,0-.19c12.762-3.291,15.541-6.07,18.832-18.832a.1.1,0,0,1,.19,0c3.291,12.762,6.07,15.541,18.832,18.832A.1.1,0,0,1,39.927,32.1Z" className="svgShape color9ceaef-0"/><path fill="currentColor" d="M25.939,31.912c-2.979-1.037-3.858-3.749-4.854-6.849a.089.089,0,0,0-.17,0c-1,3.1-1.875,5.812-4.854,6.849a.094.094,0,0,0,0,.176c2.979,1.037,3.858,3.749,4.854,6.849a.089.089,0,0,0,.17,0c1-3.1,1.875-5.812,4.854-6.849A.094.094,0,0,0,25.939,31.912Z" className="svgShape colore9ff70-1"/><path fill="currentColor" d="M61.926,15.094c-8.868,2.125-10.707,3.964-12.832,12.832a.1.1,0,0,1-.188,0c-2.125-8.868-3.964-10.707-12.832-12.832a.1.1,0,0,1,0-.188c8.868-2.125,10.707-3.964,12.832-12.832a.1.1,0,0,1,.188,0c2.125,8.868,3.964,10.707,12.832,12.832A.1.1,0,0,1,61.926,15.094Z" className="svgShape color07beb8-2"/><rect width="2" height="2" x="48" y="12" fill="currentColor" className="svgShape color9ceaef-3"/><rect width="2" height="2" x="48" y="16" fill="currentColor" className="svgShape color9ceaef-4"/><rect width="2" height="2" x="50" y="14" fill="currentColor" className="svgShape color9ceaef-5"/><rect width="2" height="2" x="46" y="14" fill="currentColor" className="svgShape color9ceaef-6"/><path fill="currentColor" d="M61.926,49.094c-8.868,2.125-10.707,3.964-12.832,12.832a.1.1,0,0,1-.188,0c-2.125-8.868-3.964-10.707-12.832-12.832a.1.1,0,0,1,0-.188c8.868-2.125,10.707-3.964,12.832-12.832a.1.1,0,0,1,.188,0c2.125,8.868,3.964,10.707,12.832,12.832A.1.1,0,0,1,61.926,49.094Z" className="svgShape color07beb8-7"/><rect width="2" height="2" x="48" y="46" fill="currentColor" className="svgShape color9ceaef-8"/><rect width="2" height="2" x="48" y="50" fill="currentColor" className="svgShape color9ceaef-9"/><rect width="2" height="2" x="50" y="48" fill="currentColor" className="svgShape color9ceaef-10"/><rect width="2" height="2" x="46" y="48" fill="currentColor" className="svgShape color9ceaef-11"/>
    </svg>
  );
});

Sparkles.displayName = 'Sparkles';
export default Sparkles;
