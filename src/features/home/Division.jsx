import { twMerge } from "tailwind-merge";

const Division = ({ children, className }) => {
  return <div className={twMerge("flex flex-col xsm:flex-row w-full gap-4", className)}>{children}</div>;
};

export default Division;
