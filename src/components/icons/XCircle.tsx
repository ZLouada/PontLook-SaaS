import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const XCircle = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 1024 1024"
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
      <path fill="currentColor" fillRule="evenodd" d="M512.13 529.678L609.357 626.905L627.035 609.227L529.808 512L627.035 414.773L609.357 397.095L512.13 494.322L414.903 397.095L397.225 414.773L494.452 512L397.225 609.227L414.903 626.905L512.13 529.678Z" clipRule="evenodd" className="svgShape color000000-0"/><path fill="currentColor" fillRule="evenodd" d="M512 737C636.264 737 737 636.264 737 512C737 387.736 636.264 287 512 287C387.736 287 287 387.736 287 512C287 636.264 387.736 737 512 737ZM512 762C650.071 762 762 650.071 762 512C762 373.929 650.071 262 512 262C373.929 262 262 373.929 262 512C262 650.071 373.929 762 512 762Z" clipRule="evenodd" className="svgShape color000000-1"/>
    </svg>
  );
});

XCircle.displayName = 'XCircle';
export default XCircle;
