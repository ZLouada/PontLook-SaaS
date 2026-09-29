import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const SlidersHorizontal = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 4.233 4.233"
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
      <g id="layer1" transform="translate(73.405 -1.965)"><g id="g1564"><g id="g4067"><g id="g7841"><g id="g7841-3"><g id="g8091"><g id="g8578"><g id="g10360"><g id="g10566" transform="translate(0 .002)"><g id="g10761" transform="translate(.02)"><g id="g2441" transform="translate(.267)"><g id="g24609"><path id="path24499" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="M -71.576532,5.3540879 V 5.8006272" paint-order="markers fill stroke" className="svgStroke colorStroke000000-12"/><path id="path24503" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="m -71.16727,4.860406 c 0,0.2260263 -0.183231,0.4092568 -0.409257,0.4092565 -0.226026,-2e-7 -0.409256,-0.1832306 -0.409256,-0.4092565 0,-0.2260259 0.18323,-0.4092561 0.409256,-0.4092564 0.226026,-3e-7 0.409257,0.1832301 0.409257,0.4092564 z" paint-order="markers fill stroke" className="svgStroke colorStroke000000-13"/><path id="path24506" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="M -71.576532,2.3558762 V 3.7368053" paint-order="markers fill stroke" className="svgStroke colorStroke000000-14"/><path id="path24508" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="m -72.886283,4.0513672 v 1.74926" paint-order="markers fill stroke" className="svgStroke colorStroke000000-15"/><path id="path24510" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="m -72.477021,3.5576853 c 0,0.2260263 -0.183231,0.4092568 -0.409257,0.4092565 -0.226026,-2e-7 -0.409256,-0.1832305 -0.409256,-0.4092565 0,-0.2260259 0.18323,-0.4092561 0.409256,-0.4092564 0.226026,-3e-7 0.409257,0.1832301 0.409257,0.4092564 z" paint-order="markers fill stroke" className="svgStroke colorStroke000000-16"/><path id="path24512" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="M -72.886283,2.3558762 V 2.6201198" paint-order="markers fill stroke" className="svgStroke colorStroke000000-17"/><path id="path24514" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="m -70.265993,4.0513672 v 1.74926" paint-order="markers fill stroke" className="svgStroke colorStroke000000-18"/><path id="path24516" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="m -69.856731,3.5576853 c 0,0.2260263 -0.183231,0.4092568 -0.409257,0.4092565 -0.226026,-2e-7 -0.409256,-0.1832305 -0.409256,-0.4092565 0,-0.2260259 0.18323,-0.4092561 0.409256,-0.4092564 0.226026,-3e-7 0.409257,0.1832301 0.409257,0.4092564 z" paint-order="markers fill stroke" className="svgStroke colorStroke000000-19"/><path id="path24518" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" d="M -70.265993,2.3558762 V 2.6201198" paint-order="markers fill stroke" className="svgStroke colorStroke000000-20"/></g></g></g></g></g></g></g></g></g></g></g></g>
    </svg>
  );
});

SlidersHorizontal.displayName = 'SlidersHorizontal';
export default SlidersHorizontal;
