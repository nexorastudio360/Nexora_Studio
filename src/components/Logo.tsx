import React from 'react';
import nexoraLogo from '../assets/images/nexora_logo.jpg';

interface LogoProps {
  className?: string;
  variant?: 'icon' | 'horizontal' | 'vertical'; // Kept for backwards compatibility
  theme?: 'dark' | 'light' | 'blue'; // Kept for backwards compatibility
  iconSize?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant,
  theme,
  iconSize,
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`} id="nexora-brand-horizontal">
      <img
        src={nexoraLogo}
        alt="Nexora Official Brand Logo"
        referrerPolicy="no-referrer"
        className={`object-contain transition-all duration-300 ${
          iconSize ? '' : 'h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px] w-auto'
        }`}
        style={iconSize ? { width: iconSize, height: iconSize } : undefined}
        id="nexora-monogram-img"
      />
    </div>
  );
};
