import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

const Checkmark = ({ className, isValid }) => {
  const style = "w-6 h-6 text-white";

  return (
    <div className={twMerge("flex justify-center items-center absolute w-8 h-full right-0 top-0", className)}>
      {isValid ? (
        <div className="bg-emerald-500 rounded-md">
          <CheckIcon className={`${style}`} />
        </div>
      ) : (
        <div className="bg-rose-500 rounded-md">
          <Cross2Icon className={`${style}`} />
        </div>
      )}
    </div>
  );
};

export default Checkmark;
