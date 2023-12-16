import React from "react";

const Navbar = () => {
  return (
    <nav className="h-[80px] w-full">
      <div className="mx-auto flex max-w-7xl justify-between px-6 py-4 text-stone-700">
        <a href="/" className="uppercase">
          Pufisimo 🐶
        </a>
        <div className="flex gap-6">
          <a href="/" className="px-3 py-2 rounded-full hover:bg-lime-200 ">
            Favorites
          </a>
          <a href="/" className="px-3 py-2 rounded-full hover:bg-lime-200">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
