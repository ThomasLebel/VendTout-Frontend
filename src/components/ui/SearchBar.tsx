"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface Option {
    id: number;
    name: string;
}

const options: Option[] = [
  { id: 1, name: "Articles" },
  { id: 2, name: "Membres" },
];

const SearchBar = ({id}: {id: string}) => {

  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedOption.name === "Articles"){
        router.push(`/catalog?search=${searchQuery}`);
      } else {
        router.push(`/member/search?username=${searchQuery}`);
      }
    }
  };


  return (
    <div className="w-full bg-lightGrey flex  rounded-md">
      <div className="w-28 relative border-r border-darkGrey border-opacity-20 p-1">
        <Listbox value={selectedOption} onChange={setSelectedOption}>
          <div className="flex items-center justify-center h-full">
            <ListboxButton className="flex items-center justify-between px-4 text-sm text-darkGrey font-semibold">
              <span>{selectedOption.name}</span>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-darkGrey" />
            </ListboxButton>
          </div>
          <ListboxOptions className="absolute w-full mt-3 bg-white rounded-md border border-gray-200 z-50">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className="px-2 py-2  text-darkGrey cursor-pointer hover:bg-gray-100"
              >
                {option.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className="flex items-center justify-center p-2 w-full">
        <MagnifyingGlassIcon className="w-5 h-5 ml-2 text-darkGrey" />
        <input
          id={id}
          type="text"
          placeholder={`Rechercher des ${selectedOption.name.toLowerCase()}`}
          className="ml-2 w-full bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>

  );
};

export default SearchBar;
