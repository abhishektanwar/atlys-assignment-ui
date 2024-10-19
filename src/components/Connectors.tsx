import React from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isStraight?: boolean;
  isCurvedRight?: boolean;
}

interface ConnectorProps {
  lines: Line[];
}

const Connectors: React.FC<ConnectorProps> = ({ lines }) => {
  const generatePath = ({ x1, y1, x2, y2, isStraight, isCurvedRight = false }: Line) => {
    if (isStraight) {
      // Render a straight line if `isStraight` is true
      return `M ${x1 - 4},${y1} L ${x2 + 4},${y2}`;
    }
    else if (isCurvedRight) {
      // Apply a rightward curve if `isCurvedRight` is true
      const curveOffset = 100;
      return `M ${x1 - 6},${y1} C ${x1 + curveOffset},${y1} ${x2 + curveOffset},${y2} ${x2 + 6},${y2}`;
    }
    else if (y1 === y2) {
      // If y1 and y2 are the same, bend the line downward
      const curveHeight = 30;
      return `M ${x1 - 4},${y1} C ${x1},${y1 + curveHeight} ${x2},${y2 + curveHeight} ${x2 + 4},${y2}`;
    }
    // Default behavior: smooth curve between the points
    const dx = Math.abs(x2 - x1) * 0.4;
    return `M ${x1 - 4},${y1} C ${x1},${y1 + dx} ${x2},${y2 - dx} ${x2 + 4},${y2}`;
  };

  return (
    <svg className="absolute z-10 inset-0 w-full h-full pointer-events-none">
      {lines.map((line, index) => (
        <path
          key={index}
          d={generatePath({ x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2, isStraight: line.isStraight, isCurvedRight: line.isCurvedRight })}
          stroke="rgba(0, 102, 255, 0.3)"
          strokeWidth="8"
          fill="none"
        />
      ))}
    </svg>
  );
};

export default Connectors;