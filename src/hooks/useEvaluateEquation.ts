import { useMemo, useCallback } from 'react';

interface FunctionConfig {
  equation: string;
  next: number | null;
  error: string;
}

interface FunctionsState {
  [key: string]: FunctionConfig;
}

const useEvaluateEquation = (
  initialValue: number,
  functions: FunctionsState,
  setFunctions: React.Dispatch<React.SetStateAction<FunctionsState>>
) => {
  const evaluateEquation = useCallback((equation: string, x: number): number => {
    try {
      const parsedEquation = equation.replace(/\^/g, '**');
      return new Function('x', `return ${parsedEquation}`)(x);
    } catch {
      return x;
    }
  }, []);

  const { outputs, finalOutput } = useMemo(() => {
    const newOutputs: Record<string, number> = {};
    let currentValue = initialValue;
    let currentKey: string | null = '1';

    while (currentKey) {
      const currentFunction: FunctionConfig = functions[currentKey];
      const newOutput = evaluateEquation(currentFunction.equation, currentValue);
      newOutputs[currentKey] = newOutput;
      currentValue = newOutput;

      currentKey = currentFunction.next ? currentFunction.next.toString() : null;
    }

    return { outputs: newOutputs, finalOutput: currentValue };
  }, [initialValue, evaluateEquation, functions]);

  const handleEquationChange = (index: string, newEquation: string) => {
    const validEquationPattern = /^[0-9x\s\+\-\*\/\^()]*$/;
    const isValid = validEquationPattern.test(newEquation);
    const error = isValid
      ? ''
      : 'Invalid equation';

    setFunctions((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        equation: newEquation,
        error,
      },
    }));
  };

  return { outputs, finalOutput, handleEquationChange };
};

export default useEvaluateEquation;
