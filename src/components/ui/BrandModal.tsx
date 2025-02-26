"use client";

import { useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "./Button";

const BrandModal = ({
  isOpen,
  setIsOpen,
  selectedBrand,
  setSelectedBrand,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedBrand: string;
  setSelectedBrand: (selectedColor: string) => void;
}) => {

  const [brand, setBrand] = useState<string>("");

  const handleValidate = () => {
    if (brand) {
      setSelectedBrand(brand);
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
              Marque
            </DialogTitle>
            <XMarkIcon
              className="absolute top-1 right-3 w-7 h-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="h-96 overflow-y-auto">
              <div className="w-full h-full p-4">
                <span>Saisis une marque</span>
                <input
                  type="text"
                  placeholder="Ex : Nike"
                  className="w-full mt-4 border-b border-grey-300 pb-2 outline-none"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="w-full p-4" onClick={handleValidate}>
              <Button
                bgColor={brand === "" ? "bg-gray-200" : "bg-mainColor"}
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

export default BrandModal;
