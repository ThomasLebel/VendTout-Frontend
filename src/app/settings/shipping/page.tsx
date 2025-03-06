"use client";

import { useState} from "react";
import { useAppSelector } from "@/app/redux/store";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import SettingsSection from "@/components/settings/SettingsSection";
import ShippingModal from "@/components/settings/shipping/ShippingModal";

const Shipping = () => {
  //Récupération de l'utilisateur
  const user = useAppSelector((state) => state.user.value);

  //Déclaration des états
  const [isShippingModalOpen, setIsShippingModalOpen] =
    useState<boolean>(false);

  console.log(isShippingModalOpen);

  return (
    <div>
      <Header />
      <div className="bg-lightGrey min-h-screen">
        <div className="lg:max-w-screen-xl mx-auto lg:flex">
          <SettingsSection />
          <div className="w-screen flex flex-col items-center px-8 lg:pt-32">
            {/* Adresse de livraison */}
            <div className="bg-white mt-5 w-full">
              <div className="mt-5 mb-2">
                <span className="text-sm text-darkGrey p-6">Mon adresse</span>
              </div>
              <div
                className="w-full flex justify-between items-center p-6 hover:bg-gray-200 hover:bg-opacity-25 cursor-pointer"
                onClick={() => setIsShippingModalOpen(true)}
              >
                <span className="text-base font-medium">
                  {user.shippingAddress?.street ? (
                    <div className="flex flex-col ">
                      <span>{user.shippingAddress.fullName}</span>
                      <span className="text-base font-normal text-darkGrey">
                        {user.shippingAddress.street}
                      </span>
                      <span className="text-base font-normal text-darkGrey">
                        {user.shippingAddress.zipCode}, {user.shippingAddress.city}
                      </span>
                    </div>
                  ) : (
                    "Ajouter l'adresse de livraison"
                  )}
                </span>
                <div>
                  <span className="text-xl font-semibold text-darkGrey">
                    {">"}
                  </span>
                </div>
              </div>
            </div>
            {/* Modale pour changer d'email */}
            <ShippingModal
              isOpen={isShippingModalOpen}
              setIsOpen={setIsShippingModalOpen}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Shipping;
