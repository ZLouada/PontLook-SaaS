import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const User = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 48 48"
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
      <path fill="currentColor" d="M31.64,27.72a13.94,13.94,0,0,1-15.28,0A18,18,0,0,0,6.05,42.94a1,1,0,0,0,.27.75,1,1,0,0,0,.73.31H41a1,1,0,0,0,.73-.31,1,1,0,0,0,.27-.75A18,18,0,0,0,31.64,27.72Z" className="svgShape color42c3cf-0"/><circle cx="24" cy="16" r="12" fill="currentColor" className="svgShape color42c3cf-1"/>
    </svg>
  );
});

User.displayName = 'User';
export default User;
