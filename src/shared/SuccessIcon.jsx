import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@radix-ui/react-icons";

const SuccessIcon = ({ className }) => {
  return <CheckIcon className={twMerge("w-8 h-8 text-green-600", className)} />;
};

export default SuccessIcon;
