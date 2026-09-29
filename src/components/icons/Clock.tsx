import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const Clock = forwardRef<SVGSVGElement, IconProps>((
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
      <path fill="currentColor" d="M11.726 58.967a2.68 2.68 0 1 0 4.641 2.682l3.46-5.767a25.766 25.766 0 0 1-4.426-3.03zM48.6 52.852a25.823 25.823 0 0 1-4.426 3.03l3.46 5.767a2.68 2.68 0 1 0 4.641-2.682z" className="svgShape colorf0534a-0"/><path fill="currentColor" d="M11.726 58.967a2.68 2.68 0 1 0 4.641 2.682l2.275-3.792A28.169 28.169 0 0 1 14.2 54.852zM49.8 54.852a28.123 28.123 0 0 1-4.443 3.005l2.275 3.792a2.68 2.68 0 1 0 4.641-2.682z" className="svgShape colorf0534a-1"/><path fill="currentColor" d="M15.4 52.852l-1.2 2a28.169 28.169 0 0 0 4.443 3.005l1.185-1.975A25.766 25.766 0 0 1 15.4 52.852zM48.6 52.852a25.823 25.823 0 0 1-4.426 3.03l1.185 1.975A28.123 28.123 0 0 0 49.8 54.852z" className="svgShape colore44d44-2"/><circle cx="32" cy="33.254" r="26" fill="currentColor" className="svgShape colorf9b534-3"/><path fill="currentColor" d="M32,7.254q-.984,0-1.95.072A26.005,26.005,0,0,0,43.3,55.7c.656,0,1.3-.029,1.948-.077A26,26,0,0,0,32,7.254Z" className="svgShape colorf9cb4e-4"/><path fill="currentColor" d="M41.462 20.191a1 1 0 0 0-1.4.23L32.437 31.045a2.384 2.384 0 0 1 1.62 1.174l7.634-10.632A1 1 0 0 0 41.462 20.191zM32.147 35.754a.994.994 0 0 0 .062.1l6.736 6.961a1 1 0 0 0 1.438-1.39l-6.45-6.665A2.379 2.379 0 0 1 32.147 35.754z" className="svgShape colorffffff-5"/><path fill="currentColor" d="M32 7.254c-.335 0-.668.007-1 .019V11.25a1 1 0 0 0 2 0V7.279C32.668 7.267 32.335 7.254 32 7.254zM31.989 53.947a1 1 0 0 0-1 1v4.282c.336.012.672.025 1.011.025s.66-.013.989-.025V54.947A1 1 0 0 0 31.989 53.947zM6.033 34.549h3.991a1 1 0 1 0 0-2H6.018c-.006.235-.018.469-.018.7C6 33.688 6.012 34.12 6.033 34.549zM52.789 33.254a1 1 0 0 0 1 1h4.186c.012-.332.025-.665.025-1s-.013-.668-.025-1H53.789A1 1 0 0 0 52.789 33.254z" className="svgShape colorf4991e-6"/><path fill="currentColor" d="M26.318 4.816a10.987 10.987 0 0 0-18.194 12A29.061 29.061 0 0 1 26.318 4.816zM55.876 16.82a10.988 10.988 0 0 0-18.194-12A29.061 29.061 0 0 1 55.876 16.82z" className="svgShape colorf0534a-7"/><circle cx="31.989" cy="33.385" r="2.684" fill="currentColor" className="svgShape colorf0534a-8"/>
    </svg>
  );
});

Clock.displayName = 'Clock';
export default Clock;
