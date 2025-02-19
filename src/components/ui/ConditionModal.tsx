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
} from "@heroicons/react/24/outline";

import Button from "./Button";

import conditions from "@/data/conditions.json";

const ConditionModal = ({
  isOpen,
  setIsOpen,
  selectedCondition,
  setSelectedCondition,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCondition: string;
  setSelectedCondition: (selectedCondition: string) => void;
}) => {
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
              État
            </DialogTitle>
            <XMarkIcon
              className="absolute top-1 right-3 w-7 h-7 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <div className="h-96 overflow-y-auto">
              <div className="w-full h-full">
                {/* Couleurs*/}
                {conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between w-full p-4 border-b border-darkGrey border-opacity-10 cursor-pointer" onClick={() => setSelectedCondition(condition.condition)}>
                  <div className="flex flex-col max-w-[90%]">
                    <span className="font-medium">{condition.condition}</span>
                    <span className="font-light text-darkGrey">{condition.description}</span>
                  </div>

                  {/* Cercle selection */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border border-mainColor ${selectedCondition === condition.condition && "bg-mainColor"}`}
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                </div>
                ))}
              </div>
            </div>
            <div className="w-full p-4" onClick={() => setIsOpen(false)}>
              <Button
                bgColor={selectedCondition === "" ? "bg-gray-200" : "bg-mainColor"}
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

export default ConditionModal;
