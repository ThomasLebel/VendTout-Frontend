import { useEffect, useState } from "react";
import Link from "next/link";

const SettingsSection = () => {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="flex flex-col text-center lg:text-left lg:w-3/6 lg:bg-lightGrey bg-white pt-36 pb-5 shadow-sm lg:shadow-none">
      <h1 className="text-xl font-semibold mb-5 px-4">Mes paramètres</h1>
      <Link
        href="/settings/profile"
        className={`text-base font-medium text-gray-500 cursor-pointer py-4 px-4 hover:bg-gray-200 hover:bg-opacity-25 ${
          currentPath === "/settings/profile" && "!text-black"
        }`}
      >
        Détails du profil
      </Link>
      <Link
        href="/settings/account"
        className={`text-base font-medium text-gray-500 cursor-pointer py-4 px-4 hover:bg-gray-200 hover:bg-opacity-25 ${
          currentPath === "/settings/account" && "!text-black"
        }`}
      >
        Paramètres du compte
      </Link>
      <Link
        href="/settings/shipping"
        className={`text-base font-medium text-gray-500 cursor-pointer py-4 px-4 hover:bg-gray-200 hover:bg-opacity-25 ${
          currentPath === "/settings/shipping" && "!text-black"
        }`}
      >
        Envoi
      </Link>
    </div>
  );
};

export default SettingsSection;
