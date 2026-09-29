import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const TrendingUp = forwardRef<SVGSVGElement, IconProps>((
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
      <g id="layer1" transform="translate(73.405 -1.965)"><g id="g1564"><g id="g4067"><g id="g7841"><g id="g7841-3"><g id="g8091"><g id="g8578"><g id="g10360"><g id="g10447" transform="translate(.273)"><g id="g22519"><g id="g22540"><g id="g22938"><g id="g23361"><g id="g9487" strokeDasharray="none" strokeMiterlimit="4" transform="rotate(44 -61.835 -22.694)scale(.7)"><g id="g23535"><g id="g23432" transform="rotate(45 -71.288 4.081)"><g id="g24518"><g id="g29828"><g id="g29823" transform="translate(.674 -.187)"><path id="path29817" fill="none" stroke="currentColor" strokeDasharray="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" strokeWidth=".374" d="M -73.647323,3.3339598 V 2.2114199 c 0,-0.2220428 0.150625,-0.3741831 0.374178,-0.3741831 h 1.122532" paint-order="markers fill stroke" className="svgStroke colorStroke000000-19"/><path id="path29819" fill="none" stroke="currentColor" strokeDasharray="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4" strokeWidth=".374" d="m -73.488003,1.9965571 1.75907,1.7590752 c 0.219396,0.2288407 0.198713,0.5390743 0.02816,0.7096289 -0.261204,0.2612043 -0.235593,0.598795 0.02129,0.8556736 l 1.401473,1.3813505" paint-order="markers fill stroke" className="svgStroke colorStroke000000-20"/></g></g></g></g></g></g></g></g></g></g></g></g></g></g></g></g></g></g></g>
    </svg>
  );
});

TrendingUp.displayName = 'TrendingUp';
export default TrendingUp;
