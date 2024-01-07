import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

import React from "react";

const LinkButton = ({ to, children, className }) => {
  return (
    <Link to={to} className={twMerge("flex items-center justify-center focus-visible:outline-none", className)}>
      {children}
    </Link>
  );
};

export default LinkButton;
