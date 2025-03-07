"use client";
import { useState, useEffect } from "react";

import ProductCard from "../ui/ProductCard";
import { ProductType } from "@/types/ProductType";
import Button from "../ui/Button";

const NewsFeed = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/find/${page}`
    );
    const data = await response.json();
    if (data.result) {
      setProducts([...products, ...data.products]);
      setHasMore(data.hasMore);
      setPage(page + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [showMore]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold mb-5">Fil d&apos;actu</h1>
      <div className="flex flex-wrap justify-start ">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-transparent border-t-mainColor border-b-mainColor border-l-mainColor"></div>
        </div>
      )}
      {hasMore && !isLoading && (
        <div className="w-full flex justify-center items-center p-16">
          <div onClick={() => setShowMore(!showMore)}>
            <Button
              text="Afficher plus"
              textColor="text-white"
              bgColor="bg-mainColor"
              textSize="text-base"
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
