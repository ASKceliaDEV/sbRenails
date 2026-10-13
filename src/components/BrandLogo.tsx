import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = false,
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#fdfaf8' : '#1a1016';
  const starColor = isLight ? '#e8a598' : '#2e1a23';

  // Sizing map
  const dimensions = {
    sm: { width: 110, height: 48, fontSizeSB: 34, fontSizeRenails: 30 },
    md: { width: 140, height: 60, fontSizeSB: 44, fontSizeRenails: 38 },
    lg: { width: 180, height: 78, fontSizeSB: 56, fontSizeRenails: 48 },
    xl: { width: 240, height: 105, fontSizeSB: 74, fontSizeRenails: 64 },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 260 115"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-102"
      >
        {/* Sparkles / 4-pointed stars */}
        {/* Top left star */}
        <path
          d="M 52 28 Q 52 35 45 35 Q 52 35 52 42 Q 52 35 59 35 Q 52 35 52 28 Z"
          fill={starColor}
        />
        {/* Tiny star left */}
        <path
          d="M 32 40 Q 32 43 29 43 Q 32 43 32 46 Q 32 43 35 43 Q 32 43 32 40 Z"
          fill={starColor}
          opacity="0.85"
        />
        {/* Middle top star */}
        <path
          d="M 69 49 Q 69 53 65 53 Q 69 53 69 57 Q 69 53 73 53 Q 69 53 69 49 Z"
          fill={starColor}
        />
        {/* Top right star */}
        <path
          d="M 205 32 Q 205 36 201 36 Q 205 36 205 40 Q 205 36 209 36 Q 205 36 205 32 Z"
          fill={starColor}
        />
        {/* Far right star */}
        <path
          d="M 228 46 Q 228 54 220 54 Q 228 54 228 62 Q 228 54 236 54 Q 228 54 228 46 Z"
          fill={starColor}
        />
        {/* Far left star */}
        <path
          d="M 33 60 Q 33 64 29 64 Q 33 64 33 68 Q 33 64 37 64 Q 33 64 33 60 Z"
          fill={starColor}
        />
        {/* Small star right */}
        <path
          d="M 207 72 Q 207 75 204 75 Q 207 75 207 78 Q 207 75 210 75 Q 207 75 207 72 Z"
          fill={starColor}
          opacity="0.8"
        />

        {/* Brand Text: SB */}
        <text
          x="130"
          y="52"
          textAnchor="middle"
          fill={textColor}
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            fontWeight: 800,
            fontSize: '56px',
            letterSpacing: '1px',
          }}
        >
          SB
        </text>

        {/* Brand Text: Renails */}
        <text
          x="130"
          y="98"
          textAnchor="middle"
          fill={textColor}
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '44px',
            letterSpacing: '-0.5px',
          }}
        >
          Renails
        </text>
      </svg>

      {showSubtitle && (
        <span
          className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
            isLight ? 'text-[#fceee9]/80' : 'text-[#a85243]'
          }`}
        >
          Press-on Nails • Azazga
        </span>
      )}
    </div>
  );
};
