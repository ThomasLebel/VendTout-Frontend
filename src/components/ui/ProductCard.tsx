"use client";

import { JSX, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { updateUser } from "@/app/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";

import AuthModal from "../header/AuthModal";
import { ProductType } from "@/types/ProductType";

const ProductCard = ({product}: {product: ProductType}) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.value);

  const [nbLikes, setNbLikes] = useState<number>(product.nbLikes);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  
  // Choix de l'icône du coeur en fonction de si le produit est liké ou non par l'utilisateur
  let heartIcon : JSX.Element = <HeartIcon className="w-5 h-5 text-darkGrey" />
  if (user.likedProducts) {
    if (user.likedProducts.includes(product._id)) {
      heartIcon = <HeartIconFilled className="w-5 h-5 text-[#CC4454]" />
    }
  }

  // Fonction pour rediriger vers la page de l'article
  const handleItemClick = () => {
    router.push(`/items/showitem/${product._id}`);
  };

  // Fonction pour liker un produit
  const handleLike = () => {
    if (!user.token) {
      setOpenAuthModal(true);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        id: product._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setNbLikes(data.nbLikes);
          dispatch(updateUser(data.userInfos));
        }
      });
  };


  return (
    <div>
        {/* Image produit et like */}
      <div className="w-full bg-red-500 rounded-lg flex items-end justify-end relative">
        <Image
          src={product.photos[0]}
          height={1500}
          width={1000}
          alt={`photo ${product.title} de ${product.userID.username}`}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={handleItemClick}
        />
        <div className="absolute bottom-0 right-0 p-2 m-2 bg-white rounded-full flex items-center gap-1 cursor-pointer" onClick={handleLike}>
          {heartIcon}
          {nbLikes > 0 && <span className="text-xs text-darkGrey">{nbLikes}</span>}
        </div>
      </div>
      {/* Section marque et taille*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGrey">{product.brand}</span>
        <span className="text-xs font-normal text-darkGrey">{product.size}</span>
      </div>
      {/* Section prix*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGrey">{product.price.toFixed(2)}€</span>
        <div className="flex items-end gap-1">
          <span className="text-sm font-normal text-mainColor">{(product.price + 0.7 + product.price * 0.05).toFixed(2)}€</span>
          <div className="flex items-center">
          <span className="text-xs font-normal text-mainColor">incl.</span>
          <ShieldCheckIcon className="ml-1 w-[14px] h-[14px] text-mainColor"/>
          </div>
        </div>
      </div>
      {openAuthModal && <AuthModal isAuthModalOpen={openAuthModal} setIsAuthModalOpen={setOpenAuthModal}/>}
    </div>
  );
};

export default ProductCard;
