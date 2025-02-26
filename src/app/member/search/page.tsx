"use client";

import Image from "next/image";

import Header from "@/components/header/Header";

import { useSearchParams } from "next/navigation";

const search = () => {

  const searchParams = useSearchParams();
    console.log(searchParams.get("username"));
  return (
    <div>
      <Header />
      <div className="mt-32 w-full">
        <div className="max-w-screen-xl mx-auto p-6 w-full">
          <h1 className=" font-medium text-black border-b border-gray-200 pb-2">
            Recherche par membre
          </h1>
          <div className="flex flex-wrap p-5 w-full">
            <div className="flex items-center gap-2  w-full lg:w-1/4 md:w-1/3 rounded-md p-4">
                <Image src="https://res.cloudinary.com/dkf48p2ah/image/upload/v1740500082/VendToutAvatars/cecvvkli3ze6sdqokb7r.jpg" alt="avatar" width={50} height={50} className="rounded-full"/>
                <div className="flex flex-col">
                    <span className="font-medium">TestCompte38</span>
                    <span className="text-darkGrey text-xs">Pas encore d'évaluation</span>
                </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default search;
