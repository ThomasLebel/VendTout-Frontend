"use client";

import { useState } from "react";

import ShippingModal from "../settings/shipping/ShippingModal";

const ShippingAdress = ({
  fullName,
  street,
  zipCode,
  city,
}: {
  fullName: string | null | undefined;
  street: string | null | undefined;
  zipCode: string | null | undefined;
  city: string | null | undefined;
}) => {

  const [isShippingModalOpen, setIsShippingModalOpen] =
    useState<boolean>(false);

  return (
    <div className="w-full p-6 bg-white">
      <span className="text-sm text-darkGrey">Adresse de livraison</span>
      <div
        className="mt-6 w-full flex justify-between items-center hover:bg-gray-200 hover:bg-opacity-25 cursor-pointer"
        onClick={() => setIsShippingModalOpen(true)}
      >
        <span className="text-base font-medium">
          {street ? (
            <div className="flex flex-col ">
              <span>{fullName}</span>
              <span className="text-base font-normal text-darkGrey">
                {street}
              </span>
              <span className="text-base font-normal text-darkGrey">
                {zipCode}, {city}
              </span>
            </div>
          ) : (
            "Ajouter l'adresse de livraison"
          )}
        </span>
        <div>
          <span className="text-xl font-semibold text-darkGrey">{">"}</span>
        </div>
      </div>
      <ShippingModal
        isOpen={isShippingModalOpen}
        setIsOpen={setIsShippingModalOpen}
      />
    </div>
  );
};

export default ShippingAdress;
