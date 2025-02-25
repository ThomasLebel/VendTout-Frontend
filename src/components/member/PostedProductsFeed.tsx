"use client";
import { useState, useEffect } from "react";

import ProductCard from "../ui/ProductCard";
import OwnerProductCard from "../member/OwnerProductCard";
import DeleteProductModal from "./DeleteProductModal";
import { ProductType } from "@/types/ProductType";

const PostedProductsFeed = ({
  products,
  refresh = false,
  setRefresh = () => {},
}: {
  products: ProductType[];
  refresh? : boolean,
  setRefresh?: (refresh: boolean) => void;
}) => {
  const [openDeleteProductModal, setOpenDeleteProductModal] =
    useState<boolean>(false);
  const [productID, setProductID] = useState<string>("");

  return (
    <div className="mt-5">
      <h1 className="font-medium mb-5">
        {products.length > 1
          ? `${products.length} articles`
          : `${products.length} article`}
      </h1>
      <div className="flex flex-wrap justify-start ">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <OwnerProductCard
              product={product}
              setOpenDeleteProductModal={setOpenDeleteProductModal}
              setProductID={setProductID}
            />
          </div>
        ))}
      </div>
      <DeleteProductModal
        isOpen={openDeleteProductModal}
        setIsOpen={setOpenDeleteProductModal}
        productID={productID}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default PostedProductsFeed;
