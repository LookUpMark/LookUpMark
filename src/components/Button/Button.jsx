import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
  className = '', // Allow custom classes
  as: Component = 'button', // Allow rendering as a different component, e.g., Link
  ...props // Pass through any other props like 'to' for Link
}) => {
  const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 transition-colors duration-150 ease-in-out inline-flex items-center justify-center'; // Added focus:ring-offset-2 for better focus visibility

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-400 disabled:hover:bg-blue-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 disabled:bg-gray-100 disabled:hover:bg-gray-100 disabled:text-gray-500',
    outline: 'bg-transparent hover:bg-gray-100 text-blue-600 border border-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-gray-400 disabled:border-gray-300',
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled && Component === 'button' ? 'cursor-not-allowed' : ''} // General cursor for disabled buttons if not covered by variant
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
