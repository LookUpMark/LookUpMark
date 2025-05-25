import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'block w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150 ease-in-out';
  
  const disabledStyles = 'bg-gray-100 cursor-not-allowed';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    />
  );
};

export default Input;
