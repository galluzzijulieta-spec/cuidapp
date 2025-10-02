import React from 'react';

interface SafetyMeterProps {
  level: 'safe' | 'caution' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function SafetyMeter({ level, size = 'md' }: SafetyMeterProps) {
  const getSafetyConfig = () => {
    switch (level) {
      case 'safe':
        return {
          emoji: '😊',
          label: '✅ Seguro',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'caution':
        return {
          emoji: '😐',
          label: '⚠️ Precaución',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
      case 'danger':
        return {
          emoji: '😰',
          label: '🚫 Peligroso',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
    }
  };

  const config = getSafetyConfig();
  
  const sizeClasses = {
    sm: { emoji: 'text-xl', container: 'px-2 py-1 text-xs', spacing: 'space-y-1' },
    md: { emoji: 'text-2xl', container: 'px-3 py-2 text-sm', spacing: 'space-y-2' },
    lg: { emoji: 'text-4xl', container: 'px-4 py-3 text-base', spacing: 'space-y-3' }
  };

  return (
    <div className={`flex flex-col items-center ${sizeClasses[size].spacing}`}>
      <div className={`${config.emoji} ${sizeClasses[size].emoji}`}>
        {config.emoji}
      </div>
      <div className={`inline-flex items-center rounded-full border-2 ${config.bgColor} ${config.borderColor} ${sizeClasses[size].container}`}>
        <span className={`font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}