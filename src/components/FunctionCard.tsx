import React from 'react';
import Input from './Input';
import Select from './Select';

interface FunctionCardProps {
  index: string;
  equation: string;
  output: number;
  next: number | null;
  onEquationChange: (index: string, newEquation: string) => void;
  error?: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  index,
  equation,
  output,
  next,
  onEquationChange,
  error,
}) => {
  const options = next
    ? [{ label: `Function ${next}`, value: next }]
    : [{ label: '-', value: '-' }];

  return (
    <div className="w-[235px] h-[251px] rounded-xl border border-gray-300 p-4 bg-white shadow-lg relative flex flex-col items-center">
      <h3 className="text-sm font-semibold mb-2">Function {index}</h3>
      <Input
        label="Equation"
        value={equation}
        onChange={(e) => onEquationChange(index, e.target.value)}
        error={error}
      />
      <div className="mt-4 w-full">
        <Select
          value={options[0].value}
          options={options}
          onChange={() => { }}
          disabled={true}
          label="Next Function"
        />
      </div>

      {/* Input and Output Points at the Bottom */}
      <div className="w-full mt-auto flex justify-between items-center mb-1">
        <div className='border-2 border-[#DBDBDB] p-[2px] rounded-full'>
          <div className="input-point w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <div className='border-2 border-[#DBDBDB] p-[2px] rounded-full'>
          <div className="output-point w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
