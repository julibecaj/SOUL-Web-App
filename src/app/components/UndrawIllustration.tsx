'use client';

interface UndrawIllustrationProps {
  name: 'streaming' | 'headphones' | 'upload';
  color?: string;
  className?: string;
}

export default function UndrawIllustration({ name, color = '9333EA', className = '' }: UndrawIllustrationProps) {
  const illustrations = {
    streaming: (
      <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Background circles */}
        <circle cx="400" cy="300" r="200" fill={`#${color}`} opacity=".1"/>
        <circle cx="400" cy="300" r="120" fill={`#${color}`} opacity=".15"/>
        <circle cx="400" cy="300" r="60" fill={`#${color}`} opacity=".2"/>
        
        {/* Music notes and waves */}
        <g fill={`#${color}`}>
          {/* Speaker/Device */}
          <rect x="320" y="200" width="160" height="200" rx="10" fill={`#${color}`} opacity=".3"/>
          <rect x="340" y="220" width="120" height="160" rx="5" fill={`#${color}`}/>
          
          {/* Sound waves */}
          <path d="M280 300 Q300 280 320 300 T360 300" stroke={`#${color}`} strokeWidth="3" fill="none" opacity=".6"/>
          <path d="M280 300 Q300 260 320 300 T360 300" stroke={`#${color}`} strokeWidth="3" fill="none" opacity=".4"/>
          <path d="M480 300 Q500 280 520 300 T560 300" stroke={`#${color}`} strokeWidth="3" fill="none" opacity=".6"/>
          <path d="M480 300 Q500 260 520 300 T560 300" stroke={`#${color}`} strokeWidth="3" fill="none" opacity=".4"/>
          
          {/* Floating music notes */}
          <circle cx="250" cy="200" r="15" fill={`#${color}`} opacity=".5"/>
          <path d="M250 185 L250 220 L270 210 L250 200" fill={`#${color}`} opacity=".5"/>
          
          <circle cx="550" cy="400" r="15" fill={`#${color}`} opacity=".5"/>
          <path d="M550 385 L550 420 L570 410 L550 400" fill={`#${color}`} opacity=".5"/>
        </g>
      </svg>
    ),
    headphones: (
      <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Person silhouette */}
        <circle cx="400" cy="180" r="60" fill={`#${color}`} opacity=".2"/>
        <ellipse cx="400" cy="320" rx="80" ry="120" fill={`#${color}`} opacity=".2"/>
        
        {/* Headphones */}
        <g fill={`#${color}`}>
          {/* Left ear cup */}
          <circle cx="280" cy="200" r="50" fill={`#${color}`} opacity=".3"/>
          <circle cx="280" cy="200" r="35" fill={`#${color}`}/>
          
          {/* Right ear cup */}
          <circle cx="520" cy="200" r="50" fill={`#${color}`} opacity=".3"/>
          <circle cx="520" cy="200" r="35" fill={`#${color}`}/>
          
          {/* Headband */}
          <path d="M330 200 Q400 150 470 200" stroke={`#${color}`} strokeWidth="20" fill="none" strokeLinecap="round"/>
          
          {/* Music waves from headphones */}
          <path d="M230 200 Q210 180 190 200 T150 200" stroke={`#${color}`} strokeWidth="4" fill="none" opacity=".6"/>
          <path d="M570 200 Q590 180 610 200 T650 200" stroke={`#${color}`} strokeWidth="4" fill="none" opacity=".6"/>
        </g>
        
        {/* Floating notes */}
        <circle cx="200" cy="350" r="12" fill={`#${color}`} opacity=".4"/>
        <path d="M200 340 L200 370 L215 360 L200 350" fill={`#${color}`} opacity=".4"/>
        
        <circle cx="600" cy="350" r="12" fill={`#${color}`} opacity=".4"/>
        <path d="M600 340 L600 370 L615 360 L600 350" fill={`#${color}`} opacity=".4"/>
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Cloud/Upload area */}
        <ellipse cx="400" cy="250" rx="120" ry="80" fill={`#${color}`} opacity=".2"/>
        <ellipse cx="400" cy="240" rx="100" ry="60" fill={`#${color}`} opacity=".3"/>
        
        {/* Upload arrow */}
        <g fill={`#${color}`}>
          {/* Arrow pointing up */}
          <path d="M400 180 L380 220 L395 220 L395 280 L405 280 L405 220 L420 220 Z" fill={`#${color}`}/>
          
          {/* Base/platform */}
          <rect x="300" y="320" width="200" height="20" rx="10" fill={`#${color}`} opacity=".5"/>
          <rect x="320" y="340" width="160" height="15" rx="7" fill={`#${color}`} opacity=".3"/>
        </g>
        
        {/* Uploading files/documents */}
        <g fill={`#${color}`} opacity=".4">
          <rect x="350" y="150" width="30" height="40" rx="3" transform="rotate(-10 365 170)"/>
          <rect x="400" y="145" width="30" height="40" rx="3" transform="rotate(5 415 165)"/>
          <rect x="450" y="150" width="30" height="40" rx="3" transform="rotate(-5 465 170)"/>
        </g>
        
        {/* Progress indicator */}
        <rect x="300" y="380" width="200" height="8" rx="4" fill={`#${color}`} opacity=".2"/>
        <rect x="300" y="380" width="120" height="8" rx="4" fill={`#${color}`} opacity=".6"/>
      </svg>
    ),
  };

  return illustrations[name] || illustrations.streaming;
}

