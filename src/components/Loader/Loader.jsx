import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-[6px]',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          border-blue-500 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
      ></div>
      {/* Basic CSS for spin animation is part of Tailwind's default 'animate-spin' */}
    </div>
  );
};

export default Loader;
