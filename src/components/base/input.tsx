// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: 'text' | 'number' | 'file' | 'select' | 'textarea';
  name: string;
  value: string | string[]; 
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  error?: string;
  options?: string[]; 
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  options,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {type === 'select' ? (
        <select
          name={name}
          value={value as string} 
          onChange={onChange}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{placeholder}</option>
          {options?.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value as string} 
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
