import React from "react";

const Navbar = () => {
  return (
    <nav className="h-[60px] w-full bg-black">
      <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4 text-white">
        <a href="/" className="uppercase">
          Pufisimo 🐶
        </a>
        <div className="flex items-center justify-center gap-6">
          <a
            href="/"
            className="w-20 text-white border-b-[3px] text-center border-b-transparent hover:border-emerald-400"
          >
            Favorites
          </a>
          <a
            href="/"
            className="w-20 text-white border-b-[3px] text-center border-b-transparent hover:border-emerald-400"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
