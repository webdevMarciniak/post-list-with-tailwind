import React from "react";
import { Disclosure } from "@headlessui/react";

interface Profile {
  name: string;
  linkedInName: string;
  linkedIn: string;
  imageUrl: string;
}
const user: Profile = {
  name: "Paulina Marciniak",
  linkedInName: "linkedIn",
  linkedIn: "https://www.linkedin.com/in/webdev-marciniak/",
  imageUrl:
    "https://avatars.githubusercontent.com/u/51324090?s=400&u=3a69a88e30782b226b2450fbc4790e05f0194183&v=4",
};

const Header = () => {
  return (
    <>
      <Disclosure as="nav" className="bg-blue-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-start">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  alt="Profile"
                  src={user.imageUrl}
                  className="h-14 w-14 rounded-full"
                />
              </div>

              <div className="ml-4 flex items-baseline">
                <span
                  className="text-white bg-gradient-to-r from-cyan-600 to-emerald-300 hover:text-white
                    px-5 py-5 text-base font-medium"
                >
                  {user.name}
                </span>
                <a
                  href={user.linkedIn}
                  className="text-white hover:bg-gradient-to-r from-cyan-600 to-emerald-300 hover:text-white
                    p-5 text-base font-medium"
                >
                  {user.linkedInName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-cyan-950">
            Blog posts list
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
