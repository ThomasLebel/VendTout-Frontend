"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

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

const SearchBar = () => {

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");


  return (
    <div className="w-full bg-lightGray flex  rounded-md">
      <div className="w-28 relative border-r border-darkGray border-opacity-20 p-1">
        <Listbox value={selectedOption} onChange={setSelectedOption}>
          <div className="flex items-center justify-center h-full">
            <ListboxButton className="flex items-center justify-between px-4 text-sm text-darkGray font-semibold">
              <span>{selectedOption.name}</span>
              <ChevronDownIcon className="w-4 h-4 ml-2 text-darkGray" />
            </ListboxButton>
          </div>
          <ListboxOptions className="absolute w-full mt-3 bg-white rounded-md border border-gray-200 p-2 z-10">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className="mb-2 text-darkGray"
              >
                {option.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className="flex items-center justify-center p-2">
        <MagnifyingGlassIcon className="w-5 h-5 ml-2 text-darkGray" />
        <input
          type="text"
          placeholder={`Rechercher des ${selectedOption.name.toLowerCase()}`}
          className="ml-2 w-full bg-transparent outline-none text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

  );
};

export default SearchBar;
