"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/store";

import Button from "../ui/Button";
import AuthModal from "../header/AuthModal";

const HeroSection = () => {

  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const router = useRouter()
  const user = useAppSelector((state) => state.user.value);

  const handleSellNow = () => {
    if (user.token) {
      router.push(`/items/additem`);
    } else {
      setOpenAuthModal(true);
    }
  }

  return (
    <section className="mt-24">
      <div
        className="relative w-full h-[40vh] lg:h-[65vh] bg-mainColor bg-right bg-cover"
        style={{ backgroundImage: "url('/images/hero-banner.webp')" }}
      >
        <div className="h-full w-1/2 flex items-center justify-center">
          <div className=" bg-white p-10 rounded-lg hidden lg:block">
            <h1 className="text-2xl font-medium mb-5">
              Prêts à faire <br />
              du tri dans vos placards ?
            </h1>
            <div onClick={handleSellNow}>
              <Button
                bgColor="bg-mainColor"
                textColor="text-white"
                text="Vends Maintenant"
                wfull={true}
                textSize="text-base"
              />
            </div>
          </div>
        </div>
        <img
          src="/images/separator.svg"
          alt="separator"
          className="absolute -bottom-1 right-0 lg:w-1/2"
        />
      </div>
      <div className="mt-3 lg:hidden w-full p-4 flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-5 w-full text-center">
          Prêts à faire du tri dans vos placards ?
        </h1>
        <div onClick={handleSellNow}>
          <Button
            bgColor="bg-mainColor"
            textColor="text-white"
            text="Vends Maintenant"
            wfull={true}
            textSize="text-base"
          />
        </div>
      </div>
      <AuthModal isAuthModalOpen={openAuthModal} setIsAuthModalOpen={setOpenAuthModal}/>
    </section>
  );
};

export default HeroSection;
