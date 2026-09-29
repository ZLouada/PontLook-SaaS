import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const ChevronUp = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 2000 2000"
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
      <path d="M1744,1436c-16.4,0-32.8-6.2-45.3-18.7L1000,718.5l-698.7,698.7c-25,25-65.5,25-90.5,0c-25-25-25-65.5,0-90.5l744-744c25-25,65.5-25,90.5,0l744,744c25,25,25,65.5,0,90.5C1776.8,1429.8,1760.4,1436,1744,1436z" fill="currentColor"></path>
    </svg>
  );
});

ChevronUp.displayName = 'ChevronUp';
export default ChevronUp;
