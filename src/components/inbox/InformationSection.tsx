import {
  ArrowLeftIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import { ProductType } from "@/types/ProductType";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InformationSection = ({
  chatPartner,
  product,
}: {
  chatPartner: string | undefined;
  product: ProductType;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="p-4 flex justify-between border-b border-t border-gray-200">
        <ArrowLeftIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => router.push("/inbox")}
        />
        {chatPartner !== "Accès non autorisé à cette conversation" ? (
          <Link
            href={`/member/${chatPartner}`}
            className="text-mainColor font-medium cursor-pointer"
          >
            {chatPartner}
          </Link>
        ) : (
          <span className="text-red-500 cursor-pointer">{chatPartner}</span>
        )}
        <InformationCircleIcon className="h-6 w-6" />
      </div>
      {product.photos.length > 0 && (
        <div className="w-full flex gap-2 p-4 border-b border-gray-200">
          <div className="relative h-12 w-12">
            <Image
              src={product.photos[0]}
              alt={`Photo de ${product.title}`}
              className=" rounded-lg cursor-pointer object-cover"
              fill
              onClick={() => router.push(`/items/showitem/${product._id}`)}
            />
          </div>
          <div className="flex flex-col">
            <span
              className="font-medium cursor-pointer"
              onClick={() => router.push(`/items/showitem/${product._id}`)}
            >
              {product.title}
            </span>
            <span className="text-darkGrey text-sm">
              {product.price.toFixed(2)}€
            </span>
            <div className="flex items-center">
              <span className="text-mainColor">
                {(product.price + 0.7 + product.price * 0.05).toFixed(2)} €
              </span>
              <ShieldCheckIcon className="ml-1 w-4 h-4 text-mainColor" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationSection;
