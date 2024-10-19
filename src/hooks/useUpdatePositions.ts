import { useCallback, RefObject } from 'react';

interface UseUpdatePositionsProps {
  rowFirstRef: RefObject<HTMLDivElement>;
  functionRefs: RefObject<(HTMLDivElement | null)[]>;
  inputRef: RefObject<HTMLDivElement>;
  outputRef: RefObject<HTMLDivElement>;
  calculateLines: () => void;
}

export interface Position {
  inputTop: number;
  outputTop: number;
}

const useUpdatePositions = ({
  rowFirstRef,
  functionRefs,
  inputRef,
  outputRef,
  calculateLines,
}: UseUpdatePositionsProps) => {
  const updatePositions = useCallback(() => {
    if (!rowFirstRef.current) return;

    const firstRowBottom = rowFirstRef.current.offsetTop + rowFirstRef.current.offsetHeight;

    if (inputRef.current) {
      inputRef.current.style.top = `${firstRowBottom - inputRef.current.offsetHeight}px`;
    }

    if (outputRef.current) {
      outputRef.current.style.top = `${firstRowBottom - outputRef.current.offsetHeight}px`;
    }

    calculateLines();
  }, [rowFirstRef, inputRef, outputRef, calculateLines]);

  return updatePositions;
};

export default useUpdatePositions;
