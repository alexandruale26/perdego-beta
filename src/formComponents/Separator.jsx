import React from "react";
import { twMerge } from "tailwind-merge";

const Separator = ({ className }) => {
  return <div className={twMerge("w-full h-[1px] bg-stone-300", className)} />;
};

export default Separator;
