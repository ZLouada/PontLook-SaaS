import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const ArrowDown = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 24 24"
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
      <path d="M11.293,22.707a1,1,0,0,0,1.414,0l6-6a1,1,0,0,0-1.414-1.414L13,19.586V2a1,1,0,0,0-2,0V19.586L6.707,15.293a1,1,0,0,0-1.414,1.414Z" fill="currentColor"></path>
    </svg>
  );
});

ArrowDown.displayName = 'ArrowDown';
export default ArrowDown;
