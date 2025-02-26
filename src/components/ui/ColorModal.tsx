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

import colors from "@/data/colors.json";

const ColorModal = ({
  isOpen,
  setIsOpen,
  selectedColor,
  setSelectedColor,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
}) => {

  const handleValidate = () => {
    if(selectedColor){
      setIsOpen(false)
    }
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
              Couleur
            </DialogTitle>
            <XMarkIcon
              className="absolute top-1 right-3 w-7 h-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="h-96 overflow-y-auto">
              <div className="w-full h-full">
                {/* Couleurs*/}
                { colors.map((color, index) => (
                <div  key={index} className="flex items-center justify-between w-full p-4 border-b border-darkGrey border-opacity-10 cursor-pointer" onClick={() => setSelectedColor(color.color)}>
                  <div className="flex items-center gap-2">
                    <span className={`h-6 w-6 rounded-full border`} style={{ backgroundColor: color.hex }}></span>
                    <span className="font-medium">{color.color}</span>
                  </div>

                  {/* Cercle selection */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border border-mainColor ${selectedColor === color.color && "bg-mainColor"}`}
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>
                ))}
              </div>
            </div>
            <div className="w-full p-4" onClick={handleValidate}>
              <Button
                bgColor={selectedColor === "" ? "bg-gray-200" : "bg-mainColor"}
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

export default ColorModal;
