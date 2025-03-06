
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const OrderItem = () => {
  return (
    <div className="p-4 w-full flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-12  rounded-md">
          <Image
            src="https://res.cloudinary.com/dkf48p2ah/image/upload/v1740650648/VendToutProducts/mte0ndi6okzignnzqg82.jpg"
            fill
            sizes="64px, 48px"
            alt="Photo de l'article"
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium">Ensemble Rouge</span>
          <span className="text-darkGrey text-sm">55,00€</span>
          <span className="text-darkGrey text-sm">
            Commande finalisée - l&apos;acheteur a confirmé la réception edfezfze
          </span>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-darkGrey" />
    </div>
  );
};

export default OrderItem;
