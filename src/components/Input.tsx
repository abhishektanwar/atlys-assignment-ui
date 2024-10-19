import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  inputFieldClass?: string
  error?: string;
}

const Input: React.FC<InputProps> = ({ type = "text", className, label, inputFieldClass, error, ...props }) => {
  return (
    <div className={`w-full ${className ?? ""}`}>
      {label ? <label className="text-xs text-[#252525] font-medium">{label}</label> : null}
      <input
        type={type}
        {...props}
        className={`w-full border-[#D3D3D3] border-[1px] rounded-lg p-2 text-[#252525] focus:outline-none placeholder-subtitle ${inputFieldClass}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Input;