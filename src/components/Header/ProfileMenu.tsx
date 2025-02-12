"use client";

import Image from "next/image";
import { ChevronDownIcon, Cog6ToothIcon, AdjustmentsHorizontalIcon, DocumentTextIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const ProfileMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-1 cursor-pointer group">
          <Image
            src="/images/avatar.jpg"
            alt="avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
          <ChevronDownIcon className="size-2 text-darkGrey group-hover:text-black group-hover:size-3 transition-all duration-300" />
        </div>
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-96 shadow-md mt-5 rounded-sm p-1 bg-white">
        <MenuItem>
          <a className="p-3 block data-[focus]:bg-Grey" href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-base font-medium">azzzert12</p>
                <p className="text-base text-darkGrey">Voir mon profil</p>
              </div>
            </div>
          </a>
        </MenuItem>
        <MenuItem>
          <a className="mt-2 p-3 block data-[focus]:bg-lightGrey" href="/">
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Mes paramètres</span>
            </div>
          </a>
        </MenuItem>
        <MenuItem>
          <a className="p-3 block data-[focus]:bg-lightGrey" href="/">
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Personnalisation</span>
            </div>
          </a>
        </MenuItem>
        <MenuItem>
          <a className="p-3 block data-[focus]:bg-lightGrey" href="/">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Mes commandes</span>
            </div>
          </a>
        </MenuItem>
        <MenuItem>
          <a className="p-3 block data-[focus]:bg-lightGrey" href="/">
            <div className="flex items-center gap-2">
              <ArrowRightStartOnRectangleIcon className="size-7 text-darkGrey" />
              <span className="text-base font-medium">Se déconnecter</span>
            </div>
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
