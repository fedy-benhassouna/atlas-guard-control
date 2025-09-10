import React from 'react';

interface MoroccanFlagProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MoroccanFlag: React.FC<MoroccanFlagProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-4',
    md: 'w-8 h-6',
    lg: 'w-12 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-sm border border-border/20 shadow-sm`}>
      {/* Red background */}
      <div className="absolute inset-0 bg-morocco-red" />
      
      {/* Green pentagram (simplified star) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className="w-1/2 h-1/2 fill-morocco-green stroke-morocco-green stroke-1"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  );
};

export default MoroccanFlag;