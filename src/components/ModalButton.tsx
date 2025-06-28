import React from 'react';

interface ModalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant: 'cancel' | 'primary';
  disabled?: boolean;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant,
  disabled = false,
}) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-md transition-colors';
  
  const variantClasses = {
    cancel: 'text-gray-700 bg-gray-100 hover:bg-gray-200',
    primary: disabled
      ? 'text-white bg-blue-400 cursor-not-allowed'
      : 'text-white bg-green-600 hover:bg-green-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};
