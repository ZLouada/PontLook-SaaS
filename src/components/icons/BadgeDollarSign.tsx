import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const BadgeDollarSign = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 30 30"
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
      <path d="M15.5 14h-1a2.5 2.5 0 0 1 0-5H19a1 1 0 0 0 0-2h-2V4a1 1 0 0 0-2 0v3h-.5a4.5 4.5 0 0 0 0 9h1a2.5 2.5 0 0 1 0 5H11a1 1 0 0 0 0 2h2v3a1 1 0 0 0 2 0v-3h.5a4.5 4.5 0 0 0 0-9Z" fill="currentColor"></path>
    </svg>
  );
});

BadgeDollarSign.displayName = 'BadgeDollarSign';
export default BadgeDollarSign;
