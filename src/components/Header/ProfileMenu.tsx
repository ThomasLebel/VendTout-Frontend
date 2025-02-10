import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
          <ChevronDownIcon className="size-2 text-lightGrey group-hover:text-black group-hover:size-3 transition-all duration-300" />
        </div>
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-72 shadow-md mt-5 p-2 rounded-sm">
        <MenuItem >
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
