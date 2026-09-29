import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Mail = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 512 512"
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
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="20" d="M27.878,115.042c5.583-4.59,12.742-7.335,20.532-7.335H463.59c7.79,0,14.95,2.745,20.532,7.346" className="svgStroke colorStroke000000-0"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="20" d="M496,140.117v231.766c0,17.893-14.506,32.41-32.41,32.41H48.41c-17.9,0-32.41-14.511-32.41-32.41V140.117   c0-10.114,4.625-19.131,11.878-25.075l215.499,172.878c7.375,5.917,17.871,5.917,25.246,0l215.499-172.867   C491.375,120.986,496,130.003,496,140.117z" className="svgStroke colorStroke000000-1"/><line x1="195.769" x2="27.878" y1="249.727" y2="396.958" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="20" className="svgStroke colorStroke000000-2"/><line x1="316.359" x2="484.25" y1="249.727" y2="396.958" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="20" className="svgStroke colorStroke000000-3"/>
    </svg>
  );
});

Mail.displayName = 'Mail';
export default Mail;
