import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Building2 = forwardRef<SVGSVGElement, IconProps>((
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
      <path d="M34,4H12a6,6,0,0,0-6,6V54a6,6,0,0,0,6,6H52a6,6,0,0,0,6-6V32a6,6,0,0,0-6-6H40V10A6,6,0,0,0,34,4ZM8,54V10a4,4,0,0,1,4-4H34a4,4,0,0,1,4,4V58H30V45a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1V58H12A4,4,0,0,1,8,54Zm10,4V46H28V58ZM52,28a4,4,0,0,1,4,4V54a4,4,0,0,1-4,4H40V28Z" fill="currentColor" className="svgShape color000000-0"/><path d="M13 16h4a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H13a1 1 0 0 0-1 1v4A1 1 0 0 0 13 16zm1-4h2v2H14zM13 26h4a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1H13a1 1 0 0 0-1 1v4A1 1 0 0 0 13 26zm1-4h2v2H14zM17 36a1 1 0 0 0 1-1V31a1 1 0 0 0-1-1H13a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1zm-3-4h2v2H14zM29 16h4a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H29a1 1 0 0 0-1 1v4A1 1 0 0 0 29 16zm1-4h2v2H30zM29 26h4a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1H29a1 1 0 0 0-1 1v4A1 1 0 0 0 29 26zm1-4h2v2H30zM29 36h4a1 1 0 0 0 1-1V31a1 1 0 0 0-1-1H29a1 1 0 0 0-1 1v4A1 1 0 0 0 29 36zm1-4h2v2H30zM47 38h4a1 1 0 0 0 1-1V33a1 1 0 0 0-1-1H47a1 1 0 0 0-1 1v4A1 1 0 0 0 47 38zm1-4h2v2H48zM47 48h4a1 1 0 0 0 1-1V43a1 1 0 0 0-1-1H47a1 1 0 0 0-1 1v4A1 1 0 0 0 47 48zm1-4h2v2H48z" fill="currentColor" className="svgShape color000000-1"/>
    </svg>
  );
});

Building2.displayName = 'Building2';
export default Building2;
