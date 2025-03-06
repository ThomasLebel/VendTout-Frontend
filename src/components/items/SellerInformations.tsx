import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { ProductType } from "@/types/ProductType";

const SellerInformations = ({ product }: { product: ProductType }) => {

  const router = useRouter();

  return (
    <div className=" w-full mt-5 border border-gray-200 rounded-lg  flex flex-col gap-4">
      <div
        className="p-4 w-full pb-4 hover:bg-gray-200 hover:bg-opacity-25 cursor-pointer"
        onClick={() => router.push(`/member/${product.userID.username}`)}
      >
        <div className="flex items-center ">
          {product.userID.profilePicture && <Image
            src={product.userID.profilePicture}
            alt={`avatar de ${product.userID.username}`}
            width={50}
            height={50}
            className="rounded-full"
          />}
          <div className="flex justify-between items-center w-full">
            <div className="ml-3 flex flex-col gap-0">
              <span className="font-medium ">{product.userID.username}</span>
              <span className="text-darkGrey text-[16px]">Pas encore d&apos;évaluation</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-darkGrey" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInformations;
