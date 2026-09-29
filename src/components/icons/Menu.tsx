import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Menu = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 16.933 16.933"
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
      <path d="M12.271 1.323H1.984c-1.1-.042-1.1 1.63 0 1.588H12.23c1.08.042 1.122-1.588.042-1.588zM1.984 7.673c-1.058 0-1.058 1.587 0 1.587h5.8c1.08 0 1.08-1.587 0-1.587zm0 6.35c-1.058 0-1.058 1.587 0 1.587h12.997c1.058 0 1.058-1.587 0-1.587z" fill="currentColor" className="svgShape color000000-0"/>
    </svg>
  );
});

Menu.displayName = 'Menu';
export default Menu;
