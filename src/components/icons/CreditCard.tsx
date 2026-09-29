import React, { forwardRef } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const CreditCard = forwardRef<SVGSVGElement, IconProps>((
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
      viewBox="0 0 50 50"
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
      <path d="M48.5386,15.0176c0-2.7568-2.2432-5-5-5H6.4614c-2.7568,0-5,2.2432-5,5v19.9648c0,2.7569,2.2432,5,5,5h37.0772   c2.7568,0,5-2.2431,5-5V15.0176z M46.5386,34.9824c0,1.6543-1.3457,3-3,3H6.4614c-1.6543,0-3-1.3457-3-3V15.0176   c0-1.6543,1.3457-3,3-3h37.0772c1.6543,0,3,1.3457,3,3V34.9824z" fill="currentColor" className="svgShape color000000-0"/><path d="M17.4488 14.3701c-.951 0-1.8502.2174-2.6599.5955-.8303-.385-1.7352-.5974-2.6556-.5974-3.4785 0-6.3076 2.8359-6.3076 6.3213 0 3.4785 2.8291 6.3076 6.3076 6.3076.9197 0 1.8225-.2114 2.6507-.5949C15.5949 26.7817 16.4958 27 17.4488 27c3.4814 0 6.3144-2.833 6.3144-6.3144C23.7632 17.2031 20.9302 14.3701 17.4488 14.3701zM7.8257 20.6895c0-2.3829 1.9326-4.3213 4.3076-4.3213.2271 0 .4489.0222.668.0559-1.0321 1.1247-1.668 2.6183-1.668 4.2615 0 1.6406.6345 3.1324 1.6643 4.2564-.2178.0333-.4385.0551-.6643.0551C9.7583 24.9971 7.8257 23.0645 7.8257 20.6895zM17.4488 25c-2.3799 0-4.3155-1.9355-4.3155-4.3144 0-2.3799 1.9356-4.3155 4.3155-4.3155 2.3789 0 4.3144 1.9356 4.3144 4.3155C21.7632 23.0645 19.8277 25 17.4488 25zM22.7632 31.6914H7.314c-.5527 0-1 .4473-1 1s.4473 1 1 1h15.4492c.5527 0 1-.4473 1-1S23.3159 31.6914 22.7632 31.6914zM41.147 26.7744h-9.833c-.5527 0-1 .4473-1 1 0 .5528.4473 1 1 1h9.833c.5527 0 1-.4472 1-1C42.147 27.2217 41.6997 26.7744 41.147 26.7744zM41.147 31.6914h-9.833c-.5527 0-1 .4473-1 1s.4473 1 1 1h9.833c.5527 0 1-.4473 1-1S41.6997 31.6914 41.147 31.6914z" fill="currentColor" className="svgShape color000000-1"/>
    </svg>
  );
});

CreditCard.displayName = 'CreditCard';
export default CreditCard;
