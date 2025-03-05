"use client";

import ProductCard from "../ui/ProductCard";
import { ProductType } from "@/types/ProductType";

const CatalogFeed = ({products} : {products: ProductType[]}) => {


  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-darkGrey mb-5">{`${products.length} résultats`}</h1>
        <div className="flex flex-wrap justify-start ">
          {products.map((product) => (
            <div key={product._id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default CatalogFeed;
