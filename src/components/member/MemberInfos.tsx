"use client";

import { useAppSelector } from "@/app/redux/store";

import { CheckCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";

import Image from "next/image";


const MemberInfos = ({userInfos} : {userInfos : {username: string, profilePicture: string, country: string, city: string, aboutDescription: string}}) => {

  const user = useAppSelector((state) => state.user.value);

  return (
    <div className="">
      {/* Section pseudo et évaluation */}
      <div className="flex items-center border-b border-gray-200 pb-4">
        <Image
          src={
            user.profilePicture ||
            "https://res.cloudinary.com/dkf48p2ah/image/upload/v1739809289/VendToutAvatars/mk8ihczepktfn61qdzh1.jpg"
          }
          alt={`Photo de l'utilisateur ${userInfos.username}`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-3 flex flex-col gap-0">
          <div className="text-[22px] font-medium">{userInfos.username}</div>
          <div className="text-darkGrey text-[16px]">
            Pas encore d'évaluation
          </div>
        </div>
      </div>
      {/* Section infos utilisateurs*/}
      <div className="w-full border-b border-gray-200 py-4">
        {/* Section Email*/}
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-darkGrey" />
          <span className="text-darkGrey text-[16px]">Email</span>
        </div>
        {/* Section Ville et Pays*/}
        {userInfos.city && (
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-darkGrey" />
            <span className="text-darkGrey text-[16px]">{`${userInfos.city}, ${userInfos.country}`}</span>
          </div>
        )}
      </div>

      {/* Section infos utilisateurs*/}
      {userInfos.aboutDescription && (
        <div className="w-full py-4">
          {/* Section Description*/}
          <span className="text-darkGrey text-[16px]">
            {user.aboutDescription}
          </span>
        </div>
      )}

      {/* Menu dressing*/}
      <div className="w-full border-b border-gray-200 pb-2 mt-8 ">
        {/* Section Description*/}
        <span className="text-sm border-b-2 border-mainColor p-[10px]">
          Dressing
        </span>
      </div>
    </div>
  );
};

export default MemberInfos;
