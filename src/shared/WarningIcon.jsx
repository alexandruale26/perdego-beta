import { twMerge } from "tailwind-merge";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const WarningIcon = ({ className }) => {
  return <ExclamationTriangleIcon className={twMerge("w-12 h-12 text-orange-600", className)} />;
};

export default WarningIcon;
