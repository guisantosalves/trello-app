import * as React from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header>
      <Image
        src={"https://links.papareact.com/c2cdd5"}
        alt="trello logo"
        width={300}
        height={200}
        className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
      />
      <div>
        {/* search box */}
        <form>
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input type="text" placeholder="Search"/>
          <button hidden>Search</button>
        </form>

        {/* avatar */}
      </div>
    </header>
  );
}
