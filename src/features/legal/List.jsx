import React from "react";
import { twMerge } from "tailwind-merge";

const List = ({ title = null, className, children, titleStyle }) => {
  return (
    <ul className={twMerge("flex flex-col items-start justify-start", className)}>
      {title !== null && (
        <p className={twMerge("text-sm xsm:text-base text-grey-800 font-medium leading-loose", titleStyle)}>{title}</p>
      )}
      {children}
    </ul>
  );
};

const ListItem = ({ className, children }) => {
  return (
    <li className={twMerge("ml-3  xsm:ml-4 list-disc text-start text-[13px] xsm:text-[15px] text-grey-700", className)}>
      {children}
    </li>
  );
};

export { List, ListItem };
