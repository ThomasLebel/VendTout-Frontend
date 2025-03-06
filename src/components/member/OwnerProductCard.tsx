"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";


import Image from "next/image";
import Button from "../ui/Button";
import AuthModal from "../header/AuthModal";

import { ProductType } from "@/types/ProductType";

const OwnerProductCard = ({
  product,
  setOpenDeleteProductModal,
  setProductID,
}: {
  product: ProductType;
  setOpenDeleteProductModal: (isOpen: boolean) => void;
  setProductID: (productID: string) => void;
}) => {

    
  const router = useRouter();



  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  // // Choix de l'icône du coeur en fonction de si le produit est liké ou non par l'utilisateur
  // let heartIcon: JSX.Element = <HeartIcon className="w-5 h-5 text-darkGrey" />;
  // if (user.likedProducts) {
  //   if (user.likedProducts.includes(product._id)) {
  //     heartIcon = <HeartIconFilled className="w-5 h-5 text-[#CC4454]" />;
  //   }
  // }

  // Fonction pour rediriger vers la page de l'article
  const handleItemClick = () => {
    router.push(`/items/showitem/${product._id}`);
  };

  // Fonction pour supprimer une annonce
  const handleDeleteProduct = () => {
    setOpenDeleteProductModal(true);
    setProductID(product._id);
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
      </div>
      {/* Section marque et taille*/}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-normal text-darkGrey">
          {product.title}
        </span>
        <span className="text-xs font-normal text-darkGrey">{`${product.nbViews} vues`}</span>
      </div>

      {/* Section prix*/}
      <span className="text-xs font-normal text-darkGrey">
        {product.price.toFixed(2)}€
      </span>

      {/* Bouton supprimer */}

      <div
        className="w-full mt-3"
        onClick={handleDeleteProduct}
      >
        <Button
          bgColor="bg-white"
          textColor="text-red-500"
          border={true}
          borderColor="border-red-500"
          text="Supprimer"
          textSize="text-sm"
          wfull={true}
        />
      </div>

      {openAuthModal && (
        <AuthModal
          isAuthModalOpen={openAuthModal}
          setIsAuthModalOpen={setOpenAuthModal}
        />
      )}
    </div>
  );
};

export default OwnerProductCard;
