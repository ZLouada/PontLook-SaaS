import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const BadgeCheck = forwardRef<SVGSVGElement, IconProps>((
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
      fill="none"
      stroke="currentColor"
      {...(strokeWidth ? { strokeWidth } : {})}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <path fill="none" stroke="currentColor" d="M12 2L15 6L20 7L17 12L18 18L12 15L6 18L7 12L4 7L9 6L12 2Z"></path><path fill="none" stroke="currentColor" d="M9 10.5L11.5 13L15.5 9"></path>
    </svg>
  );
});

BadgeCheck.displayName = 'BadgeCheck';
export default BadgeCheck;
