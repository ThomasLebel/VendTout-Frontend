import {
  EnvelopeIcon,
  BellIcon,
  HeartIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b border-vendtoutGrey border-opacity-20">
        <h1 className="text-mainColor text-2xl font-bold cursor-pointer">
          VendTout
        </h1>
        <div className="hidden lg:block w-3/6">
          <SearchBar />
        </div>
        <nav>
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
              <Bars3Icon className="size-6 text-[#8C9AAD] hover:text-mainColor cursor-pointer" />
            </li>
            <div className="hidden lg:flex">
              <li>
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
        </nav>
      </div>
      <div className="p-4 lg:hidden">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
