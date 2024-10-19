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

interface FunctionCardHeaderProps {
  title: string;
}

const FunctionCardHeader: React.FC<FunctionCardHeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex items-center space-x-2 text-[#A5A5A5]">
      <div className="flex-shrink-0">
        <div className="w-4 flex flex-col gap-0.5">
          <div className="flex justify-between gap-0.5">
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          </div>
          <div className="flex justify-between gap-0.5">
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
            <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-[#A5A5A5]">{title}</h3>
    </div>
  );
};

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
      <FunctionCardHeader title={`Function ${index}`} />
      <Input
        label="Equation"
        value={equation}
        onChange={(e) => onEquationChange(index, e.target.value)}
        error={error}
        className='mt-2'
        inputFieldClass='h-[33px]'
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
      <div className="w-full mt-auto flex justify-between items-center">
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
