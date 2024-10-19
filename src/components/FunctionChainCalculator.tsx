import React, { useCallback, useEffect, useRef, useState } from "react";
import { Position } from "../hooks/useUpdatePositions";
import useEvaluateEquation from "../hooks/useEvaluateEquation";
import useCalculateLines from "../hooks/useCalculateLines";
import Connectors from "./Connectors";
import FunctionCard from "./FunctionCard";
import InputOutputDisplay from "./InputOutputDisplay";

interface FunctionConfig {
  equation: string;
  next: number | null;
  error: string;
}

interface FunctionsState {
  [key: string]: FunctionConfig;
}

const FunctionChainCalculator: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(2);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const functionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowFirstRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Position>({ inputTop: 0, outputTop: 0 });

  const [functions, setFunctions] = useState<FunctionsState>({
    1: { equation: 'x^2', next: 2, error: '' },
    2: { equation: '2*x+4', next: 4, error: '' },
    3: { equation: 'x^2+20', next: null, error: '' },
    4: { equation: 'x-2', next: 5, error: '' },
    5: { equation: 'x/2', next: 3, error: '' },
  });

  const { finalOutput, handleEquationChange } = useEvaluateEquation(
    initialValue,
    functions,
    setFunctions
  );

  const { lines, calculateLines } = useCalculateLines(
    {
      functions,
      functionRefs,
      inputRef,
      outputRef,
      finalOutput,
      initialValue
    }
  );

  const updatePositions = useCallback(() => {
    const firstRowBottom = functionRefs.current[0]?.getBoundingClientRect().top ?? 0;
    setPositions({ inputTop: firstRowBottom, outputTop: firstRowBottom });
    calculateLines();
  }, [calculateLines]);

  useEffect(() => {
    requestAnimationFrame(updatePositions);
    window.addEventListener('resize', updatePositions);
    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, [updatePositions]);

  const firstRow = Object.keys(functions).slice(0, 3);
  const secondRow = Object.keys(functions).slice(3);

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-10 flex justify-center items-center">
      <Connectors lines={lines} />
      <div className="flex flex-col items-center w-full relative">
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-24 mb-6" ref={rowFirstRef}>
            {firstRow.map((key, index) => (
              <div
                key={key}
                ref={(el) => (functionRefs.current[index] = el)}
                className="w-[250px] relative"
              >
                <FunctionCard
                  index={key}
                  equation={functions[key].equation}
                  next={functions[key].next}
                  error={functions[key].error}
                  onEquationChange={handleEquationChange}
                />
              </div>
            ))}
          </div>

          {secondRow.length > 0 && (
            <div className="flex justify-center gap-24 mt-6">
              {secondRow.map((key, index) => (
                <div
                  key={key}
                  ref={(el) => (functionRefs.current[index + 3] = el)}
                  className="w-[250px] relative"
                >
                  <FunctionCard
                    index={key}
                    equation={functions[key].equation}
                    next={functions[key].next}
                    error={functions[key].error}
                    onEquationChange={handleEquationChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <InputOutputDisplay
          rowFirstRef={rowFirstRef}
          positions={positions}
          inputRef={inputRef}
          outputRef={outputRef}
          initialValue={initialValue}
          setInitialValue={setInitialValue}
          finalOutput={finalOutput}
        />
      </div>
    </div>
  );

}

export default FunctionChainCalculator;