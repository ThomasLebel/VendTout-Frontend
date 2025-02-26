import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../ui/Button";
import DeleteProductModal from "../member/DeleteProductModal";
import { ProductType } from "@/types/ProductType";
import moment from "moment";
import "moment/locale/fr";

const ItemInformations = ({ product, ownProduct }: { product: ProductType, ownProduct: boolean }) => {

  const [openDeleteProductModal, setOpenDeleteProductModal] = useState<boolean>(false)
 

  {/* Fonction pour supprimer un produit */}
  const handleDeleteProduct = () => {
    setOpenDeleteProductModal(true)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      {/* Nom de l'article */}
      <h1 className="font-medium">{product.title}</h1>

      {/*  Section Taille / Etat / Marque */}
      <div className="flex gap-1 items-center">
        {/* Taille */}
        <span className="text-darkGrey ">{product.size}</span>
        <span className="text-darkGrey pb-2">.</span>
        {/* Etat */}
        <span className="text-darkGrey ">{product.condition}</span>
        <span className="text-darkGrey pb-2">.</span>
        {/* Marque */}
        <span className="text-darkGrey ">{product.brand}</span>
      </div>

      {/* Section Prix */}
      <div className="mt-4 flex flex-col border-b border-gray-200 pb-4">
        {/* Prix vendeur */}
        <span className="text-darkGrey text-sm">
          {product.price.toFixed(2)} €
        </span>
        {/* Prix acheteur */}
        <span className="text-mainColor font-medium ">
          {(product.price + 0.7 + product.price * 0.05).toFixed(2)} €
        </span>
        {/* Protection acheteurs */}
        <div className="flex items-center">
          <span className="text-sm font-normal text-mainColor">
            Inclut la Protection acheteurs
          </span>
          <ShieldCheckIcon className="ml-1 w-[15px] h-[15px] text-mainColor" />
        </div>
      </div>

      {/* Section Spécifications */}
      <div className="mt-4 flex flex-col gap-2 border-b border-gray-200 pb-4">
        {/* Marque */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">Marque</span>
          <span className="text-mainColor w-1/2 text-sm font-medium">
            {product.brand}
          </span>
        </div>
        {/* Taille */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">Taille</span>
          <span className="text-darkGrey w-1/2 text-sm font-medium">
            {product.size}
          </span>
        </div>
        {/* Etat */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">État</span>
          <span className="text-darkGrey w-1/2 text-sm font-medium">
            {product.condition}
          </span>
        </div>
        {/* Couleur */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">Couleur</span>
          <span className="text-darkGrey w-1/2 text-sm font-medium">
            {product.color}
          </span>
        </div>
        {/* Nombre de vues */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">Nombre de vues</span>
          <span className="text-darkGrey w-1/2 text-sm font-medium">
            {product.nbViews}
          </span>
        </div>
        {/* Ajouté il y a */}
        <div className="w-full flex justify-between">
          <span className="text-darkGrey w-1/2 text-sm">Ajouté</span>
          <span className="text-darkGrey w-1/2 text-sm font-medium">
            {moment(product.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Section Description */}
      <div className="mt-4 flex flex-col gap-2 border-b border-gray-200 pb-4 ">
        <span
          className={`text-darkGrey whitespace-pre-line`}
        >
          {product.description}
        </span>
      </div>

      {/* Section prix livraison */}
      <div className="mt-4 flex justify-between gap-2">
        <span className="text-darkGrey text-sm">Envoi</span>
        <span className="text-darkGrey text-sm">à partir de 3,89 €</span>
      </div>

      {/* Affichage des boutons si le produit n'appartient pas à l'utilisateur connecté */}
      {!ownProduct && <>
      {/* Bouton acheter */}
      <div className="mt-6 flex justify-center">
        <Button
          bgColor="bg-mainColor"
          textColor="text-white"
          text="Acheter"
          wfull={true}
          textSize="text-base"
        />
      </div>

      {/* Bouton Faire une offre */}
      <div className="mt-4 flex justify-center">
        <Button
          bgColor="bg-white"
          border={true}
          textColor="text-mainColor"
          text="Faire une offre"
          wfull={true}
          textSize="text-base"
        />
      </div>

      {/* Bouton Message */}
      <div className="mt-4 flex justify-center">
        <Button
          bgColor="bg-white"
          border={true}
          textColor="text-mainColor"
          text="Message"
          wfull={true}
          textSize="text-base"
        />
      </div>
      </>}

      {/* Bouton supprimer si le propriétaire est connecté */}
      { ownProduct && <div className="mt-4 flex justify-center" onClick={handleDeleteProduct}>
        <Button
          bgColor="bg-white"
          textColor="text-red-500"
          border={true}
          borderColor="border-red-500"
          text="Supprimer"
          textSize="text-sm"
          wfull={true}
        />
      <DeleteProductModal isOpen={openDeleteProductModal} setIsOpen={setOpenDeleteProductModal} productID={product._id} fromShowItem={true}/>
      </div>}

    </div>
  );
};

export default ItemInformations;
