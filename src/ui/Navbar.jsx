import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-[70px] xsm:h-[80px] w-full mx-auto max-w-6xl justify-between items-center px-6  text-white">
      <a href="/" className="text-4xl select-none text-primary">
        &lt;&gt; perdego
      </a>
      <div className="flex items-center justify-center gap-12">
        <a
          href="/"
          className="text-white pt-[3px] border-b-[3px] text-lg text-center border-b-transparent hover:border-primary"
        >
          Autentificare
        </a>
      </div>
    </div>
  );
};

export default Navbar;
