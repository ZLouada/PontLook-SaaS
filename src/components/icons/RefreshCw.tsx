import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const RefreshCw = forwardRef<SVGSVGElement, IconProps>((
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
      <path d="M12 4a8 8 0 0 1 4.985 1.758H15.242a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 1 0-2 0V4.206A9.983 9.983 0 0 0 2 12a1 1 0 0 0 2 0A8.009 8.009 0 0 1 12 4zM21 11a1 1 0 0 0-1 1A7.986 7.986 0 0 1 7.015 18.242H8.757a1 1 0 1 0 0-2h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V19.794A9.984 9.984 0 0 0 22 12 1 1 0 0 0 21 11z" fill="currentColor" className="svgShape color000000-0"/>
    </svg>
  );
});

RefreshCw.displayName = 'RefreshCw';
export default RefreshCw;
