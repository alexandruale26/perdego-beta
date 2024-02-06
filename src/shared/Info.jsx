import { twMerge } from "tailwind-merge";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const Info = ({ className, iconStyle, children }) => {
  return (
    <div className={twMerge("flex items-center justify-center gap-2", className)}>
      <InfoCircledIcon className={twMerge("w-5 h-5 text-orange-600 shrink-0", iconStyle)} />
      {children}
    </div>
  );
};

export default Info;
