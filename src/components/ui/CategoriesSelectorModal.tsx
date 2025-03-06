"use client";

import Image from "next/image";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import Button from "./Button";

import categories from "@/data/categories.json";

const CategoriesSelectorModal = ({
  isOpen,
  setIsOpen,
  selectedGender,
  setSelectedGender,
  selectedSubCategory,
  setSelectedSubCategory,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedGender: string;
  setSelectedGender: (selectedGender: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (selectedSubCategory: string) => void;
}) => {
  const handleValidate = () => {
    if (selectedSubCategory) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center  bg-black bg-opacity-50">
          <DialogPanel className="w-5/6 max-w-lg space-y-4 border bg-white  rounded-lg relative ">
            <DialogTitle className="font-medium text-base text-center pt-[22px]">
              Catégorie
            </DialogTitle>
            <XMarkIcon
              className="absolute top-1 right-3 w-7 h-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {/* Section Genre*/}
            <div className="h-96 overflow-y-auto">
              {/* Genres affichés uniquement si aucun genre sélectionné */}
              {!selectedGender &&
                categories.map((categorie, i) => {
                  return (
                    <div
                      className="w-full bg-white flex justify-between items-center px-3 py-4 hover:bg-gray-200 hover:bg-opacity-50 border-b border-darkGrey border-opacity-10"
                      onClick={() => setSelectedGender(categorie.name)}
                      key={i}
                    >
                      {/* Div logo et genre */}
                      <div className=" flex items-center">
                        <Image
                          src={categorie.logoURL}
                          width={25}
                          height={25}
                          alt={`logo ${categorie.name}`}
                        ></Image>
                        <span className="font-medium ml-2">
                          {categorie.name}
                        </span>
                      </div>
                      {/* Icone fleche */}
                      <div className="">
                        <ChevronRightIcon className="w-6 h-6 text-darkGrey"></ChevronRightIcon>
                      </div>
                    </div>
                  );
                })}
              {/* Sous-catégories affichées uniquement si un genre sélectionné */}
              {selectedGender && (
                <div className="w-full h-full">
                  {/* Affichage du genre sélectionné avec fleche retour */}
                  <div className="flex items-center justify-between w-full p-4 border-b border-darkGrey border-opacity-10">
                    <ArrowLeftIcon
                      className="w-5 h-5 text-black cursor-pointer"
                      onClick={() => setSelectedGender("")}
                    />
                    <span className="font-medium flex-grow text-center mr-5">
                      {selectedGender}
                    </span>
                  </div>

                  {/* Sous catégories */}

                  {categories.map((categorie) => {
                    if (categorie.name === selectedGender) {
                      return categorie.subCategories.map((subCategorie, i) => {
                        return (
                          <div
                            className="flex items-center justify-between w-full p-4 border-b border-darkGrey border-opacity-10 cursor-pointer"
                            key={i}
                            onClick={() => setSelectedSubCategory(subCategorie)}
                          >
                            <span className="font-medium">{subCategorie}</span>
                            {/* Cercle selection */}
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-full border border-mainColor ${
                                selectedSubCategory === subCategorie
                                  ? "bg-mainColor"
                                  : ""
                              }`}
                            >
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          </div>
                        );
                      });
                    }
                  })}
                </div>
              )}
            </div>
            <div className="w-full1 p-4" onClick={handleValidate}>
              <Button
                bgColor={selectedSubCategory ? "bg-mainColor" : "bg-gray-200"}
                textColor="text-white"
                text="Fait"
                wfull={true}
                textSize="text-sm"
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CategoriesSelectorModal;
