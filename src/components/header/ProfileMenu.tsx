"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { logout } from "@/app/redux/slices/userSlice";

import { ChevronDownIcon, Cog6ToothIcon, DocumentTextIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const ProfileMenu = () => {

  const router = useRouter()

  //Création du dispatch
  const dispatch = useAppDispatch();

  //Récupération de l'utilisateur
  const user = useAppSelector((state) => state.user.value);

  //Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  };

  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-1 cursor-pointer group">
          <Image
            src={user.profilePicture || "https://res.cloudinary.com/dkf48p2ah/image/upload/v1739526042/idkhe6v85woa3fdoszls.jpg"}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <ChevronDownIcon className="size-2 text-darkGrey group-hover:text-black group-hover:size-3 transition-all duration-300" />
        </div>
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-96 shadow-md mt-5 rounded-sm p-1 bg-white z-20">
        <MenuItem>
          <Link className="p-3 block data-[focus]:bg-Grey" href={`/member/${user.username}`}>
            <div className="flex items-center gap-2">
              <Image
                src={user.profilePicture || "https://res.cloudinary.com/dkf48p2ah/image/upload/v1739526042/idkhe6v85woa3fdoszls.jpg"}
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
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="mt-2 p-3 block data-[focus]:bg-lightGrey" href="/settings/profile">
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Mes paramètres</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/orders" className="p-3 block data-[focus]:bg-lightGrey">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Mes commandes</span>
            </div>
          </Link>
        </MenuItem>
        <MenuItem>
          <div className="p-3 block data-[focus]:bg-lightGrey" onClick={handleLogout}>
            <div className="flex items-center gap-2">
              <ArrowRightStartOnRectangleIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Se déconnecter</span>
            </div>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
