interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = "", size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg 
          className={`${sizeClasses[size]} drop-shadow-lg`}
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="secondary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle cx="20" cy="20" r="18" fill="url(#primary-gradient)" />
          
          {/* Lightning Bolt (Speed) */}
          <path 
            d="M24 10L16 22H20L16 30L24 18H20L24 10Z" 
            fill="white" 
            stroke="none"
          />
          
          {/* Payment Card Icon */}
          <rect 
            x="26" 
            y="26" 
            width="12" 
            height="8" 
            rx="2" 
            fill="url(#secondary-gradient)"
            transform="rotate(-15 32 30)"
          />
          
          {/* Dollar Sign */}
          <circle cx="32" cy="8" r="6" fill="url(#accent-gradient)" />
          <text x="32" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">$</text>
        </svg>
        
        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse" />
      </div>
      
      {/* Brand Text */}
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          QuickPay
        </span>
      )}
    </div>
  );
}