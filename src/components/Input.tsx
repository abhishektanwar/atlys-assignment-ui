import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // className?: string;
  label?: string
}

const Input: React.FC<InputProps> = (props) => {
  const { type = "text", className, label, ...propsToForward } = props;
  return (
    <div className={`w-full ${className ?? ""}`}>
      {label ? <label className="text-sm mb-2">{label}</label> : null}
      <input
        type={type}
        {...propsToForward}
        className="w-full border-[#D3D3D3] border-[1px] bg-[#FFFFFF] rounded-lg p-2 text-title focus:outline-none placeholder-subtitle"
      />
    </div>
  )
}

export default Input;