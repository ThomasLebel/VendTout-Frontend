
interface ButtonProps {
  bgColor: string;
  textColor: string;
  text: string;
}

const Button = ({ bgColor, textColor, text }: ButtonProps) => {
  return <button className={`${bgColor} ${textColor} px-4 py-2 rounded-md text-xs font-semibold`}>
    {text}
  </button>;
};



export default Button;