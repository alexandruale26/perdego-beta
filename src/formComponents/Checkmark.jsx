import { CheckIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

const Checkmark = ({ className }) => {
  return (
    <div
      className={twMerge(
        "flex justify-center items-center absolute w-8 h-full right-1 top-0 overflow-hidden",
        className
      )}
    >
      <div className="bg-emerald-500 rounded-full animate-in slide-in-from-right-10">
        <CheckIcon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default Checkmark;
