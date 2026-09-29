import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Layers = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 96 96"
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
      <g clipPath="url(#clip0_1073_6628)"><path stroke="currentColor" strokeWidth="5" d="M15.5259 37.7862C12.1857 35.8631 12.1857 31.0432 15.5259 29.12L44.5073 12.4338C46.6694 11.1889 49.3306 11.1889 51.4927 12.4338L80.4741 29.12C83.8143 31.0432 83.8143 35.8631 80.4741 37.7862L51.4927 54.4725C49.3306 55.7173 46.6694 55.7173 44.5072 54.4724L15.5259 37.7862Z" fill="none" className="svgStroke colorStroke000000-1"/><path stroke="currentColor" strokeWidth="5" d="M20.6316 40.7273L15.5259 43.6669C12.1857 45.5901 12.1857 50.4099 15.5259 52.3331L44.5072 69.0193C46.6694 70.2642 49.3306 70.2642 51.4927 69.0193L80.4741 52.3331C83.8143 50.4099 83.8143 45.5901 80.4741 43.6669L75.3684 40.7273" fill="none" className="svgStroke colorStroke000000-2"/><path stroke="currentColor" strokeWidth="5" d="M20.6316 55.2741L15.5259 58.2138C12.1857 60.1369 12.1857 64.9568 15.5259 66.88L44.5072 83.5662C46.6694 84.8111 49.3306 84.8111 51.4927 83.5662L80.4741 66.88C83.8143 64.9568 83.8143 60.1369 80.4741 58.2138L74.6667 54.8701" fill="none" className="svgStroke colorStroke000000-3"/></g><defs><clipPath id="clip0_1073_6628"><rect width="96" height="96" fill="currentColor"/></clipPath></defs>
    </svg>
  );
});

Layers.displayName = 'Layers';
export default Layers;
