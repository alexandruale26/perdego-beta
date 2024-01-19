import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

import React from "react";

const LinkButton = ({ to, replace = false, children, className, disguiseAsFullButton = false }) => {
  const style = disguiseAsFullButton
    ? "min-h-[48px] w-full max-w-xs gap-2 bg-black rounded-md text-white text-center hover:bg-primary focus-visible:outline-none focus-visible:text-lg select-none"
    : "focus-visible:outline-none select-none";

  return (
    <Link to={to} replace={replace} className={twMerge(`flex items-center justify-center ${style}`, className)}>
      {children}
    </Link>
  );
};

export default LinkButton;
