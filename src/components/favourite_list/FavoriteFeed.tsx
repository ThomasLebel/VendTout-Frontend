"use client";

import { useState, useEffect, use } from "react";
import { useAppSelector } from "@/app/redux/store";
import { useRouter } from 'next/navigation'

import ProductCard from "../ui/ProductCard";
import { ProductType } from "@/types/ProductType";

const FavoriteFeed = () => {

  const router = useRouter();

  const user = useAppSelector((state) => state.user.value);

  const [products, setProducts] = useState<ProductType[]>([]);


  const fetchProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/favourites/${user.token}`);
    const data = await response.json();
    if (data.result) {
      setProducts(data.products);
    }
  }

  useEffect(() => {
    if (user.token){
      fetchProducts();
    } else {
      // router.push("/");
    }
    
  }, [user]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold mb-5">Articles Favoris</h1>
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

export default FavoriteFeed;
