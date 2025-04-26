// components/base/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rightIcon, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div
          className={`relative flex items-center border rounded-lg overflow-hidden transition-all ${
            error
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus-within:border-[var(--primary)]'
          } ${className}`}
        >
          {icon && (
            <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500`}
            {...props}
          />
          {rightIcon && <div className="px-3 py-2">{rightIcon}</div>}
        </div>
        {error && <p className="text-red-500 text-xs mt-1 px-2">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
