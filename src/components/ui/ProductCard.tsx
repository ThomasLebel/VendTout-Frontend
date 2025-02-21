"use client";

import { HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  return (
    <div>
      {/* section utilisateur et avatar*/}
      <div className="w-full flex gap-2 items-center p-2">
        <img src="/images/avatar.jpg" className="w-6 h-6 rounded-full"></img>
        <span className="text-xs font-normal text-darkGrey">Thomas</span>
      </div>
        {/* Image produit et like */}
      <div className="w-full bg-red-500 rounded-lg flex items-end justify-end relative">
        <img
          src="https://images1.vinted.net/t/04_01d89_5hfBFyRmyTBoYX1pdz1yYoLs/f800/1739963972.jpeg?s=e2fccb66b8ebf57f9974a1ac69058aa650589c27"
          alt="product"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-0 right-0 p-2 m-2 bg-white rounded-full flex items-center gap-1">
          <HeartIcon className="w-5 h-5 text-darkGrey" />
          <span className="text-xs text-darkGrey">5</span>
        </div>
      </div>
      {/* Section marque et taille*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGrey">Lacoste</span>
        <span className="text-xs font-normal text-darkGrey">M</span>
      </div>
      {/* Section prix*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGrey">10.00€</span>
        <div className="flex items-end gap-1">
          <span className="text-sm font-normal text-mainColor">11.20€</span>
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
