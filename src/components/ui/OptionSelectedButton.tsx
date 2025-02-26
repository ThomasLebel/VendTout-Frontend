import { XMarkIcon} from "@heroicons/react/24/outline";

const OptionSelectedButton = ({
  optionValue,
  setOptionValue,
}: {
  optionValue: string;
  setOptionValue: (optionValue: string) => void;
}) => {
  return (
    <div className={`border border-gray-300 rounded-full py-2 px-4 gap-2 flex justify-between items-center cursor-pointer bg-darkGrey bg-opacity-20`} onClick={() => setOptionValue("")}>
      <span className="text-sm">{optionValue}</span>
      <XMarkIcon className="w-5 h-5" />
    </div>
  );
};

export default OptionSelectedButton;
