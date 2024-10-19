import React, { Dispatch, SetStateAction } from 'react';
import Input from './Input';
import { Position } from '../hooks/useUpdatePositions';

interface InputOutputDisplayProps {
  inputRef: React.RefObject<HTMLDivElement>;
  outputRef: React.RefObject<HTMLDivElement>;
  positions: Position;
  rowFirstRef: React.RefObject<HTMLDivElement>;
  initialValue: number;
  setInitialValue: Dispatch<SetStateAction<number>>;
  finalOutput: number;
}

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({
  inputRef,
  outputRef,
  positions,
  rowFirstRef,
  initialValue,
  setInitialValue,
  finalOutput,
}) => {
  return (
    <>
      <div className='absolute space-y-2  w-[115px]' ref={inputRef} style={{
        left: 'max(20px, 5%)',
        top: rowFirstRef.current && inputRef.current
          ? `${rowFirstRef.current.offsetHeight - inputRef.current.offsetHeight}px`
          : positions.outputTop,
      }}>
        <div className='text-white bg-[#E29A2D] text-xs font-semibold flex justify-center items-center p-1 rounded-[14px]'>Initial value of x</div>
        <div
          className='flex h-[50px] rounded-lg border-2 border-[#FFC267] outline-none'
        >
          <div className='w-[80px] h-full'>
            <Input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(Number(e.target.value))}
              inputFieldClass='h-full border-none rounded-r-none p-4'
              className='h-full'
            />
          </div>
          <div className='w-[35px] h-full border-l-[#FFEED5] border-0 border-l-[1px] bg-white rounded-r-lg'></div>
        </div>
      </div>
      <div className='absolute space-y-2  w-[115px]' ref={outputRef} style={{
        right: 'max(20px, 5%)',
        top: rowFirstRef.current && outputRef.current
          ? `${rowFirstRef.current.offsetHeight - outputRef.current.offsetHeight}px`
          : positions.outputTop,
      }}>
        <div className='text-white bg-[#4CAF79] text-xs font-semibold flex justify-center items-center p-1 rounded-[14px]'>Final output y</div>
        <div
          className='flex h-[50px] rounded-lg border-2 border-[#2DD179] outline-none'
        >
          <div className='w-[35px] h-full border-r-[#C5F2DA] border-0 border-r-[1px] bg-white rounded-l-lg'></div>
          <span className='w-[80px] h-full flex items-center justify-end p-2 text-right bg-white rounded-r-lg'>
            {finalOutput}
          </span>
        </div>
      </div>

    </>
  );
};

export default InputOutputDisplay;
