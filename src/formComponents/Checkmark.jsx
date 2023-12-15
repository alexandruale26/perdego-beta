import { CheckIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

const Checkmark = ({ className, isValid }) => {
  return (
    <div
      className={twMerge(
        "flex justify-center items-center absolute w-8 h-full right-0 top-0 overflow-hidden",
        className
      )}
    >
      {isValid && (
        <div className="bg-emerald-500 rounded-full animate-in slide-in-from-right-10">
          <CheckIcon className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};

export default Checkmark;
