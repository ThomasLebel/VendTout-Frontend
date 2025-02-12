
interface ButtonProps {
  bgColor: string;
  textColor: string;
  textSize?: string;
  text: string;
  border? : boolean
  wfull?: boolean
}

const Button = ({ bgColor, textColor, text, textSize = "text-xs", border = false, wfull = false }: ButtonProps) => {
  return <button className={`${wfull ? "w-full" : ""} ${bgColor} ${textColor} px-4 py-2 rounded-md ${textSize} font-medium ${border && "border border-mainColor"}`}>
    {text}
  </button>;
};



export default Button;