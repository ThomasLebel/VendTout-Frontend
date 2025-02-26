"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { logout } from "@/app/redux/slices/userSlice";

import Button from "../ui/Button";

import {
  ChevronDownIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface DrawerProps {
  isLogged?: boolean;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

interface Category {
  name: string;
  icon: string;
  link: string;
}

const categories: Category[] = [
  {
    name: "Femmes",
    icon: "https://images1.vinted.net/t/02_00c5c_bzPpha4dS84spMpDR2Dg1EUq/1739275102.png?s=974838d23d6c350dbbeb16ccef9a7a79d00c6377",
    link: "/",
  },
  {
    name: "Hommes",
    icon: "https://images1.vinted.net/t/01_009f9_96Aj8KkPmWx9cqt6d61jAQJB/1739275096.png?s=0e4f5e43b67b5f2fb593ebd2b2417d57852a9c03",
    link: "/",
  },
  {
    name: "Enfants",
    icon: "https://images1.vinted.net/t/04_0228c_JL5wH587wvW78QcpBLAAEiWr/1739275100.png?s=79e0a687c8bb18903a3bb0303cf864bb60503739",
    link: "/",
  },
];

const Drawer = ({ isLogged, setIsAuthModalOpen, setIsDrawerOpen }: DrawerProps) => {

  const router = useRouter()

  //Création du dispatch
  const dispatch = useAppDispatch();

  //Récupération de l'utilisateur
  const user = useAppSelector((state) => state.user.value);

  //Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSellNow = () => {
    if (user.token) {
      router.push(`/items/additem`);
    } else {
      setIsAuthModalOpen(true);
    }
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-white flex flex-col items-center z-50">
      {/* Section Boutons */}
      <div className="w-full border-b border-vendtoutGrey border-opacity-20 pb-5">
        <div className="mt-10 w-full px-5">
          <div onClick={handleSellNow}>
            <Button
              bgColor="bg-mainColor"
              textColor="text-white"
              text="Vends tes articles"
              wfull={true}
              textSize="text-base"
            />
          </div>
        </div>
        {!isLogged && (
          <div
            className="mt-2 w-full px-5"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <Button
              bgColor="bg-white"
              textColor="text-mainColor"
              text="S'inscrire | Se connecter"
              border={true}
              wfull={true}
              textSize="text-base"
            />
          </div>
        )}
      </div>
      {/* Section Catégories */}
      <div className="w-full">
        <div className="mt-10 w-full px-5">
          <h2 className="text-darkGrey text-sm mb-5">Parcourir</h2>
          {categories.map((category, i) => {
            return (
              <div
                className="flex gap-2 border-b border-vendtoutGrey border-opacity-20 py-3 hover:bg-lightGrey"
                key={i}
              >
                <Image
                  src={category.icon}
                  alt="Woman Icon"
                  width={24}
                  height={24}
                />
                <h2 className="text-darkGrey">{category.name}</h2>
              </div>
            );
          })}
        </div>
        {/* Section Mon Compte */}
        {isLogged && (
          <div className="mt-10 w-full px-5">
            <h2 className="text-darkGrey text-sm mb-5">Mon Compte</h2>
            <a
              className="block hover:bg-lightGrey border-b border-vendtoutGrey border-opacity-20 py-4"
              href="/"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={
                    user.profilePicture ||
                    "https://res.cloudinary.com/dkf48p2ah/image/upload/v1739526042/idkhe6v85woa3fdoszls.jpg"
                  }
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="text-base font-medium">{user.username}</p>
                  <p className="text-base text-darkGrey">Voir mon profil</p>
                </div>
              </div>
            </a>
            <Link
              className="block hover:bg-lightGrey border-b border-vendtoutGrey border-opacity-20 py-4"
              href="/settings/profile"
            >
              <div className="flex items-center gap-2">
                <Cog6ToothIcon className="size-7 text-darkGrey" />
                <span className="text-base font-medium">Mes paramètres</span>
              </div>
            </Link>
            <a
              className="block hover:bg-lightGrey border-b border-vendtoutGrey border-opacity-20 py-4"
              href="/"
            >
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="size-7 text-darkGrey" />
                <span className="text-base font-medium">Personnalisation</span>
              </div>
            </a>
            <a
              className="block hover:bg-lightGrey border-b border-vendtoutGrey border-opacity-20 py-4"
              href="/"
            >
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="size-7 text-darkGrey" />
                <span className="text-base font-medium">Mes commandes</span>
              </div>
            </a>
            <a
              className="block hover:bg-lightGrey border-b border-vendtoutGrey border-opacity-20 py-4"
              href="/"
            >
              <div className="flex items-center gap-2">
                <ArrowRightStartOnRectangleIcon className="size-7 text-darkGrey" />
                <span className="text-base font-medium" onClick={handleLogout}>
                  Se déconnecter
                </span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
