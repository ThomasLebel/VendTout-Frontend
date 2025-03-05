import Image from "next/image";
import { useRouter } from "next/navigation";

const ArticleInformations = ({
  productID,
  title,
  condition,
  brand,
  price,
  photos,
}: {
  productID: string;
  title: string;
  condition: string;
  brand: string;
  price: number;
  photos: string[];
}) => {

  const router = useRouter()

  return (
    <div className="w-full p-6 bg-white">
      <span className="text-sm text-darkGrey">Commande</span>
      <div className="mt-8 flex justify-between items-center">
        <div className="flex gap-3 cursor-pointer" onClick={() => router.push(`/items/showitem/${productID}`)}>
          {photos[0] && (
            <div className="relative h-12 w-12">
              <Image
                src={photos[0]}
                alt={`Photo de`}
                className=" rounded-lg cursor-pointer object-cover"
                sizes="48px, 48px"
                fill
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            <span className="text-darkGrey">
              {condition} - {brand}
            </span>
          </div>
        </div>
        <span className="font-medium">{price.toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default ArticleInformations;
