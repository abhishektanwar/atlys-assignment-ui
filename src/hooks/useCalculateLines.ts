import { useCallback, useState } from 'react';

interface FunctionConfig {
  next: number | null;
}

interface FunctionsState {
  [key: string]: FunctionConfig;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isStraight?: boolean;
  isCurvedRight?: boolean;
}

interface UseCalculateLinesProps {
  functions: FunctionsState;
  functionRefs: React.RefObject<(HTMLDivElement | null)[]>;
  inputRef: React.RefObject<HTMLDivElement>;
  outputRef: React.RefObject<HTMLDivElement>;
}

const useCalculateLines = ({
  functions,
  functionRefs,
  inputRef,
  outputRef,
}: UseCalculateLinesProps) => {
  const [lines, setLines] = useState<Line[]>([]);

  const calculateLines = useCallback(() => {
    const newLines: Line[] = [];

    const firstFunctionIndex = 0;
    const lastFunctionIndex = Object.keys(functions).findIndex(
      (key) => functions[key].next === null
    );

    if (inputRef.current && functionRefs.current && functionRefs.current[firstFunctionIndex]) {
      const inputBox = inputRef.current.getBoundingClientRect();
      const firstCardInputBox = functionRefs.current[firstFunctionIndex]
        ?.querySelector('.input-point')!
        .getBoundingClientRect();

      newLines.push({
        x1: inputBox.right,
        y1: firstCardInputBox.top + firstCardInputBox.height / 2,
        x2: firstCardInputBox.left,
        y2: firstCardInputBox.top + firstCardInputBox.height / 2,
        isStraight: true,
      });
    }

    Object.keys(functions).forEach((key, index) => {
      const currentIndex = parseInt(key) - 1;
      const nextIndex = functions[key].next ? functions[key].next - 1 : null;

      if (functionRefs.current &&
        functionRefs.current[currentIndex] &&
        nextIndex !== null &&
        functionRefs.current[nextIndex]
      ) {
        const currentCardOutputBox = functionRefs.current[currentIndex]
          ?.querySelector('.output-point')!
          .getBoundingClientRect();
        const nextCardInputBox = functionRefs.current[nextIndex]
          ?.querySelector('.input-point')!
          .getBoundingClientRect();

        newLines.push({
          x1: currentCardOutputBox.right,
          y1: currentCardOutputBox.top + currentCardOutputBox.height / 2,
          x2: nextCardInputBox.left,
          y2: nextCardInputBox.top + nextCardInputBox.height / 2,
          isCurvedRight: index === 2 || index === 4, // Example logic for adding curved lines
        });
      }
    });

    if (functionRefs.current &&
      outputRef.current &&
      lastFunctionIndex !== -1 &&
      functionRefs.current[lastFunctionIndex]
    ) {
      const outputBox = outputRef.current.getBoundingClientRect();
      const lastCardOutputBox = functionRefs.current[lastFunctionIndex]
        ?.querySelector('.output-point')!
        .getBoundingClientRect();

      newLines.push({
        x1: lastCardOutputBox.right,
        y1: lastCardOutputBox.top + lastCardOutputBox.height / 2,
        x2: outputBox.left,
        y2: lastCardOutputBox.top + lastCardOutputBox.height / 2,
        isStraight: true,
      });
    }

    setLines(newLines)
  }, [functions, functionRefs, inputRef, outputRef]);

  return { lines, calculateLines };
};

export default useCalculateLines;
