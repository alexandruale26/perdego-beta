import { twMerge } from "tailwind-merge";

const SecondaryTitle = ({ className, text }) => {
  return <p className={twMerge("text-grey-800 text-sm xsm:text-base font-semibold", className)}>{text}</p>;
};

export default SecondaryTitle;
