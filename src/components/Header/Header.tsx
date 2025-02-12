"use client";

import { useState } from "react";
import Image from "next/image";

import {
  EnvelopeIcon,
  BellIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import ProfileMenu from "./ProfileMenu";
import Drawer from "./Drawer";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <header className="relative">
        <div className="border-b border-vendtoutGrey border-opacity-20">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 ">
            <Image src="/images/logo-vendtout.png" alt="VendTout" width={150} height={42} />
            <div className="hidden lg:block w-3/6">
              <SearchBar />
            </div>
            <nav>
              {isLogged && (
                <ul className="flex gap-5 items-center">
                  <li>
                    <EnvelopeIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                  </li>
                  <li>
                    <BellIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                  </li>
                  <li>
                    <HeartIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                  </li>

                  <li className="lg:hidden">
                    {!isDrawerOpen && (
                      <Bars3Icon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                    {isDrawerOpen && (
                      <XMarkIcon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                  </li>
                  <div className="hidden lg:flex">
                    <li className="relative">
                      <ProfileMenu />
                    </li>
                    <li className="ml-2">
                      <Button
                        bgColor="bg-mainColor"
                        textColor="text-white"
                        text="Vends tes articles"
                      />
                    </li>
                  </div>
                </ul>
              )}
              {!isLogged && (
                <ul className="flex gap-2 items-center">
                  <li className="ml-2 hidden lg:block" onClick={() => setIsAuthModalOpen(true)}>
                    <Button
                      bgColor="bg-white"
                      textColor="text-mainColor"
                      text="S'inscrire | Se connecter"
                      border={true}
                    />
                  </li>
                  <li className="ml-2 hidden lg:block">
                    <Button
                      bgColor="bg-mainColor"
                      textColor="text-white"
                      text="Vends tes articles"
                    />
                  </li>
                  <li className="lg:hidden">
                    {!isDrawerOpen && (
                      <Bars3Icon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                    {isDrawerOpen && (
                      <XMarkIcon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
      {isDrawerOpen && (
        <div className="relative lg:hidden">
          <Drawer isLogged={isLogged} setIsAuthModalOpen={setIsAuthModalOpen} />
        </div>
      )}
      <div className="p-2 lg:hidden">
        <SearchBar />
      </div>
      <div className="hidden lg:block border-b border-vendtoutGrey border-opacity-20">
        <div className="max-w-screen-xl mx-auto p-4 w-full h-10 flex items-center gap-8 text-sm ">
          <p className="text-darkGrey hover:text-mainColor cursor-pointer">
            Femmes
          </p>
          <p className="text-darkGrey hover:text-mainColor cursor-pointer">
            Hommes
          </p>
          <p className="text-darkGrey hover:text-mainColor cursor-pointer">
            Enfants
          </p>
        </div>
      </div>
      <AuthModal isAuthModalOpen={isAuthModalOpen} setIsAuthModalOpen={setIsAuthModalOpen} />
    </div>
  );
};

export default Header;
