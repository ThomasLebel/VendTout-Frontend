import { HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  return (
    <div>
        {/* Image produit et like */}
      <div className="w-full bg-red-500 rounded-lg flex items-end justify-end relative">
        <img
          src="https://images1.vinted.net/t/04_021bb_aMaY5DymJPK4Ub9VxoA1U1WP/f800/1739282030.jpeg?s=a45166cbab45b443e77b1cf960e5046b5188ebe4"
          alt="product"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-0 right-0 p-2 m-2 bg-white rounded-full flex items-center gap-1">
          <HeartIcon className="w-5 h-5 text-darkGray" />
          <span className="text-xs text-darkGray">5</span>
        </div>
      </div>
      {/* Section marque et taille*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGray">Bershka</span>
        <span className="text-xs font-normal text-darkGray">S</span>
      </div>
      {/* Section prix*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGray">10.00€</span>
        <div className="flex items-end gap-1">
          <span className="text-sm font-normal text-mainColor">11.25€</span>
          <div className="flex items-center">
          <span className="text-xs font-normal text-mainColor">incl.</span>
          <ShieldCheckIcon className="ml-1 w-[14px] h-[14px] text-mainColor"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
