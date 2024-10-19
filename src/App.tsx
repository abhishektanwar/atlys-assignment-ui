import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import FunctionCard from './components/FunctionCard';
import Connectors from './components/Connectors';
import Input from './components/Input';

interface FunctionConfig {
  equation: string;
  next: number | null;
  error: string;
}

interface FunctionsState {
  [key: string]: FunctionConfig;
}

interface Outputs {
  [key: string]: number;
}

interface Position {
  inputTop: number;
  outputTop: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isStraight?: boolean;
  isCurvedRight?: boolean;
}

function App() {
  const [initialValue, setInitialValue] = useState<number>(2);
  const [lines, setLines] = useState<Line[]>([]);
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

  const evaluateEquation = useCallback((equation: string, x: number): number => {
    try {
      const parsedEquation = equation.replace(/\^/g, '**');
      return new Function('x', `return ${parsedEquation}`)(x);
    } catch {
      return x;
    }
  }, []);

  const { outputs, finalOutput } = useMemo(() => {
    const newOutputs: Outputs = {};
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
      : 'Invalid equation. Only numbers, x, +, -, *, /, ^, and parentheses are allowed.';

    setFunctions((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        equation: newEquation,
        error,
      },
    }));
  };

  const calculateLines = useCallback(() => {
    const newLines: Line[] = [];

    const firstFunctionIndex = 0;
    const lastFunctionIndex = Object.keys(functions).findIndex(
      (key) => functions[key].next === null
    );

    if (inputRef.current && functionRefs.current[firstFunctionIndex]) {
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

      if (
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
          isCurvedRight: index === 2 || index === 4,
        });
      }
    });

    if (
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

    setLines(newLines);
  }, [functions]);

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
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
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
                  output={outputs[key]}
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
                    output={outputs[key]}
                    next={functions[key].next}
                    error={functions[key].error}
                    onEquationChange={handleEquationChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute space-y-2 w-[115px]" ref={inputRef} style={{
          left: 'max(20px, 5%)',
          top: `${positions.inputTop}px`,
        }}>
          <div className="text-white bg-[#E29A2D] text-xs font-semibold flex justify-center items-center p-1 rounded-[14px]">Initial value of x</div>
          <div className="flex h-[50px] rounded-lg border-2 border-[#FFC267] outline-none">
            <div className="w-[80px] h-full">
              <Input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
                inputFieldClass="h-full border-0 rounded-r-none p-4"
                className="h-full"
              />
            </div>
            <div className="w-[35px] h-full border-l-[#FFEED5] border-0 border-l-[1px] bg-white rounded-r-lg"></div>
          </div>
        </div>

        <div className="absolute space-y-2 w-[115px]" ref={outputRef} style={{
          right: 'min(20px, 1%)',
          top: `${positions.outputTop}px`,
        }}>
          <div className="text-white bg-[#4CAF79] text-xs font-semibold flex justify-center items-center p-1 rounded-[14px]">Final output y</div>
          <div className="flex h-[50px] rounded-lg border-2 border-[#2DD179] outline-none">
            <div className="w-[35px] h-full border-r-[#C5F2DA] border-0 border-r-[1px] bg-white rounded-l-lg"></div>
            <span className="w-[80px] h-full flex items-center justify-end p-2 text-right bg-white rounded-r-lg">
              {finalOutput}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
