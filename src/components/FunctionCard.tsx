import Input from "./Input";
import Select from "./Select";

interface FunctionCardProps {
  index: string;
  equation: string;
  output: number;
  next: number | null;
  onEquationChange: (index: string, newEquation: string) => void;
}

interface FunctionCardHeaderProps {
  title: string;
}

const FunctionCardHeader: React.FC<FunctionCardHeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex items-center align-left space-x-2 text-[#A5A5A5]">
      <div className="flex-shrink-0">
        <div className="grid grid-cols-3 gap-0.5">
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
          <span className="block w-[3px] h-[3px] bg-[#CDCDCD] rounded-full"></span>
        </div>
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
};

const FunctionCard: React.FC<FunctionCardProps> = ({ index, equation, output, next, onEquationChange }) => {
  const options = next
    ? [{ label: `Function ${next}`, value: next }]
    : [{ label: '-', value: '-' }];

  return (
    <div className="w-[235px] h-[251px] rounded-2xl border-[1px] border-[#DFDFDF] p-6 bg-white shadow-functionCard flex flex-col items-center space-y-3">
      <FunctionCardHeader title={'Function'} />
      <Input
        label='Equation'
        value={equation}
        onChange={(e) => onEquationChange(index, e.target.value)}
      />
      <Select
        value={options[0].value}
        options={options}
        onChange={() => { }} // Disabled select; no change needed
        disabled={true}
        label='Next Function'
      />
    </div>
  );
};

export default FunctionCard;