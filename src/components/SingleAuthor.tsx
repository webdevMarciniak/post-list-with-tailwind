import React from "react";
import { ListboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Author } from "../interfaces/app_interfaces";

const SingleAuthor = ({ name }: Author) => {
  return (
    <ListboxOption
      value={name}
      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-cyan-950 data-[focus]:bg-cyan-600 data-[focus]:text-white"
    >
      <div className="flex items-center">
        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
          {name}
        </span>
      </div>

      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
        <CheckIcon aria-hidden="true" className="h-5 w-5" />
      </span>
    </ListboxOption>
  );
};

export default SingleAuthor;
