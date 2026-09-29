import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Check = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 500 500"
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
      <path d="M355 425H145c-38.66 0-70-31.34-70-70V145c0-38.66 31.34-70 70-70h210c38.66 0 70 31.34 70 70v210c0 38.66-31.34 70-70 70" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path><path d="m137 240.99 86.99 86.99L466.11 85.86" fill="none" stroke="#c33" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
    </svg>
  );
});

Check.displayName = 'Check';
export default Check;
