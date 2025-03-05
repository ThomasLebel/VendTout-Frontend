
interface ButtonProps {
  bgColor: string;
  textColor: string;
  textSize?: string;
  text: string;
  border? : boolean
  borderColor? : string
  wfull?: boolean
  loading? : boolean
}

const Button = ({ bgColor, textColor, text, textSize = "text-xs", border = false, borderColor = "border-mainColor", wfull = false, loading = false }: ButtonProps) => {
  return <button className={`${wfull ? "w-full" : ""} ${bgColor} ${textColor} px-4 py-2 outline-none rounded-md ${textSize} font-medium ${border && `border ${borderColor}`} ${loading && '!bg-gray-400 cursor-wait'}`} disabled={loading}>
    {text}
  </button>;
};



export default Button;