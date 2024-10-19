import React from 'react';

interface SelectProps {
  value: string | number;
  options: Array<{ label: string; value: string | number }>;
  onChange: (value: string | number) => void;
  label?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ value, options, onChange, label, disabled = false }) => {
  return (
    <div className=' w-full '>
      {label && <label className="text-xs text-[#252525] font-medium">{label}</label>}
      <div className='flex flex-col relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`appearance-none bg-white p-2 border-[1px] border-[#D3D3D3] rounded-lg text-xs font-medium ${disabled ? 'bg-[#eeeeee] text-[#858585]' : ''}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#858585]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;