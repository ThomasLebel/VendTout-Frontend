"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/redux/store";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Header = () => {
  
  const router = useRouter()
  const user = useAppSelector((state) => state.user.value);

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [nbChatsNotSeen, setNbChatsNotSeen] = useState<number>(0);

  useEffect(() => {
      setIsLogged(!!user.token);
  }, [user.token]);

  useEffect(() => {
    if (user.username) {
      const querySnapshot = query(
        collection(db, "chats"),
        where("participantsUsername", "array-contains", user.username),
      );
      const unsubscribeChats = onSnapshot(querySnapshot, (snapshot) => {
        setNbChatsNotSeen(snapshot.docs.filter((doc) => !doc.data().lastMessageSeenBy.includes(user.username)).length)
      })
      
      return () => {
        unsubscribeChats();
      }
    }
  }, [user]);

  const handleSellNow = () => {
    if (user.token) {
      router.push(`/items/additem`);
    } else {
      setIsAuthModalOpen(true);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white">
      {/* Barre de navigation */}
      <header className="relative">
        {/* Logo Vendtout*/}
        <div className="border-b border-vendtoutGrey border-opacity-20">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 ">
            <Link href="/">
              <Image
                src="/images/logo-vendtout.png"
                alt="VendTout"
                width={150}
                height={42}
                priority={true}
              />
            </Link>
            {/* Barre de recherche */}
            <div className="hidden lg:block w-3/6">
              <SearchBar id="desktop-searchbar" />
            </div>
            {/* Menu de navigation */}
            <nav>
              {/* Affichage des icones sur mobile si l'utilisateur est connecté */}
              {isLogged && (
                <ul className="flex gap-2 items-center">
                  <Link href='/inbox' className="relative p-2">
                    <EnvelopeIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                    {nbChatsNotSeen > 0 && <div className="h-4 w-4 rounded-full bg-[#D04555] absolute top-1 right-1 flex justify-center items-center">
                      <span className="text-[10px] text-white font-medium">{nbChatsNotSeen}</span>
                    </div>}
                  </Link>
                  <li className="p-2">
                    <BellIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                  </li>
                  <Link href="/favourite_list">
                    <li className="p-2">
                      <HeartIcon className="size-6 text-iconGrey hover:text-mainColor cursor-pointer" />
                    </li>
                  </Link>

                  {/* Icône de menu pour mobile */}
                  <li className="lg:hidden">
                    {!isDrawerOpen && (
                      <Bars3Icon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                    {/* Icône de fermeture du menu pour mobile */}
                    {isDrawerOpen && (
                      <XMarkIcon
                        className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      />
                    )}
                  </li>

                  {/* Affichage des icones sur pc si l'utilisateur est connecté */}
                  <div className="hidden lg:flex">
                    <li className="relative">
                      <ProfileMenu />
                    </li>
                    <div onClick={handleSellNow}>
                      <li className="ml-2">
                        <Button
                          bgColor="bg-mainColor"
                          textColor="text-white"
                          text="Vends tes articles"
                        />
                      </li>
                    </div>
                  </div>
                </ul>
              )}
              {/* Affichage des boutons si l'utilisateur n'est pas connecté */}
              {!isLogged && (
                <ul className="flex gap-2 items-center">
                  <li
                    className="ml-2 hidden lg:block"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <Button
                      bgColor="bg-white"
                      textColor="text-mainColor"
                      text="S'inscrire | Se connecter"
                      border={true}
                    />
                  </li>
                  <li className="ml-2 hidden lg:block">
                    <div onClick={handleSellNow}>
                      <Button
                        bgColor="bg-mainColor"
                        textColor="text-white"
                        text="Vends tes articles"
                      />
                    </div>
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
      {/* Menu de navigation pour mobile */}
      {isDrawerOpen && (
        <div className="relative lg:hidden">
          <Drawer
            isLogged={isLogged}
            setIsAuthModalOpen={setIsAuthModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
      )}
      {/* Barre de recherche pour mobile */}
      <div className="p-2 lg:hidden">
        <SearchBar id="mobile-searchbar" />
      </div>
      {/* Menu de navigation catégories pour desktop */}
      <div className="hidden lg:block border-b border-vendtoutGrey border-opacity-20">
        <div className="max-w-screen-xl mx-auto p-4 w-full h-10 flex items-center gap-8 text-sm ">
          <Link href='/catalog?gender=Femme'>
          <p className="text-darkGrey hover:text-mainColor cursor-pointer ml-5">
            Femmes
          </p>
          </Link>
          <Link href='/catalog?gender=Homme'>
          <p className="text-darkGrey hover:text-mainColor cursor-pointer">
            Hommes
          </p>
          </Link>
          <Link href='/catalog?gender=Enfants'>
          <p className="text-darkGrey hover:text-mainColor cursor-pointer">
            Enfants
          </p>
          </Link>
        </div>
      </div>
      {/* Modal de connexion */}
      <AuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
    </div>
  );
};

export default Header;
