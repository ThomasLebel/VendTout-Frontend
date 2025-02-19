"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Description,
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

import sizes from "@/data/sizes.json";

const SizeModal = ({
  isOpen,
  setIsOpen,
  selectedSize,
  setSelectedSize,
  selectedSubCategory,
  selectedGender,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedSize: string;
  setSelectedSize: (selectedSize: string) => void;
  selectedSubCategory: string;
  selectedGender: string;
}) => {
  let sizesToDisplay: string[] = [];

  if (selectedGender !== "Enfants" && selectedSubCategory !== "Chaussures") {
    const sizesSelected = sizes.filter((size) => size.name === "All");
    sizesToDisplay = sizesSelected[0].sizes;
  } else if (
    selectedGender === "Enfants" &&
    selectedSubCategory !== "Chaussures"
  ) {
    const sizesSelected = sizes.filter((size) => size.name === "Enfants");
    sizesToDisplay = sizesSelected[0].sizes;
  } else if (
    selectedGender === "Enfants" &&
    selectedSubCategory === "Chaussures"
  ) {
    const sizesSelected = sizes.filter((size) => size.name === "Chaussures enfants");
    sizesToDisplay = sizesSelected[0].sizes;
  } else if (selectedSubCategory === "Chaussures") {
    const sizesSelected = sizes.filter((size) => size.name === "Chaussures");
    sizesToDisplay = sizesSelected[0].sizes;
  }

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
              Taille
            </DialogTitle>
            <XMarkIcon
              className="absolute top-1 right-3 w-7 h-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="h-96 overflow-y-auto">
              <div className="w-full h-full">
                {/* Tailles*/}
                {sizesToDisplay.map((size, index) => (
                <div key={index} className="flex items-center justify-between w-full p-4 border-b border-darkGrey border-opacity-10 cursor-pointer" onClick={() => setSelectedSize(size)}>
                  <span className="font-medium">{size}</span>
                  {/* Cercle selection */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border border-mainColor ${selectedSize === size && "bg-mainColor"}`}
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>
                ))}
              </div>
            </div>
            <div className="w-full1 p-4" onClick={() => setIsOpen(false)}>
              <Button
                bgColor={selectedSize ? "bg-mainColor" : "bg-gray-200"}
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

export default SizeModal;
