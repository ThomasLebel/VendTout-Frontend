"use client";
import { useState, useEffect } from "react";

import ProductCard from "../ui/ProductCard";
import { ProductType } from "@/types/ProductType";

const NewsFeed = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/find/${page}`);
    const data = await response.json();
    if (data.result) {
      setProducts([...products, ...data.products]);
      setHasMore(data.hasMore);
      setPage(page + 1);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold mb-5">Fil d'actu</h1>
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

export default NewsFeed;
