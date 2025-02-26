import { ChevronDownIcon } from "@heroicons/react/24/outline";

const CategoryButton = ({
  category,
  setOpenModal,
  value,
}: {
  category: string;
  setOpenModal: (openmodal: boolean) => void;
  value: string;
}) => {
  return (
    <div className={`border border-gray-300 rounded-full py-2 px-4 gap-2 flex justify-between items-center cursor-pointer ${value && "border-mainColor bg-mainColor bg-opacity-10"}`} onClick={() => setOpenModal(true)}>
      <span className="text-sm">{category}</span>
      <ChevronDownIcon className="w-5 h-5 " />
    </div>
  );
};

export default CategoryButton;
