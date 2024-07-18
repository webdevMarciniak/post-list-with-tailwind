import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Post } from "../interfaces/app_interfaces";

const SinglePost = ({ title, body, name }: Post) => {
  return (
    <div className="mx-auto w-full bg-white border-t cyan-700/20  lg:px-8">
      <Disclosure as="div" className="p-2 lg:p-2" defaultOpen={false}>
        {({ open }) => (
          <>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="pr-2 text-sm/6 font-medium text-cyan-950 group-data-[hover]:text-cyan-600 text-left">
                {title}
                <p className="text-sm/6 text-left text-cyan-950/50">
                  Author: {name}
                </p>
              </span>
              <ChevronDownIcon
                className={`min-w-6 size-5 fill-cyan-950 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </DisclosureButton>
            <DisclosurePanel
              className={`mt-4 text-sm/5 text-cyan-950 ${open ? "" : "hidden"}`}
            >
              {body}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default SinglePost;
