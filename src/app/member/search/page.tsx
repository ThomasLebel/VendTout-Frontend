"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";


import { useSearchParams } from "next/navigation";

const Search = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<
    { username: string; profilePicture: string }[]
  >([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${searchParams.get(
        "username"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setUsers(data.users);
        }
      });
  }, [searchParams]);

  const handleClick = (username: string) => {
    router.push(`/member/${username}`)
  };

  return (
    <div>
      <Header />
      <div className="mt-32 w-full min-h-[700px]">
        <div className="max-w-screen-xl mx-auto p-6 w-full">
          <h1 className=" font-medium text-black border-b border-gray-200 pb-2">
            Recherche par membre
          </h1>
          <div className="flex flex-wrap p-5 w-full">
            {users.map((user, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2  w-full lg:w-1/4 md:w-1/3 rounded-md p-4 cursor-pointer hover:bg-gray-200 hover:bg-opacity-30"
                  onClick={() => handleClick(user.username)}
                >
                  <Image
                    src={user.profilePicture}
                    alt={`avatar of ${user.username}`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-darkGrey text-xs">
                      Pas encore d&apos;évaluation
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer/>
     
    </div>
  );
};

// Enveloppez le composant Search dans Suspense
const SearchWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Search />
  </Suspense>
);

export default SearchWithSuspense;
