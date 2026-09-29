import React, { forwardRef } from 'react';
import * as Icons from './index';
import type { IconProps } from './index';

export type IconName = keyof Omit<typeof Icons, 'IconProps' | 'LucideIcon' | 'Icon'>;

export interface DynamicIconProps extends IconProps {
  name: IconName;
}

export const Icon = forwardRef<SVGSVGElement, DynamicIconProps>(({ name, ...props }, ref) => {
  const Component = (Icons as Record<string, any>)[name] as React.ComponentType<IconProps> | undefined;
  if (!Component) {
    console.warn(`Icon "${name}" not found in IconScout icon registry.`);
    return null;
  }
  return <Component ref={ref} {...props} />;
});

Icon.displayName = 'Icon';
export default Icon;
