import { twMerge } from "tailwind-merge";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const WarningIcon = ({ className }) => {
  return <ExclamationTriangleIcon className={twMerge("w-8 h-8 text-orange-600", className)} />;
};

export default WarningIcon;
