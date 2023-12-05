import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

const Checkmark = ({ className, isValid }) => {
  const style = "w-5 h-5";

  return (
    <div className={twMerge("flex justify-center items-center absolute w-8 h-full right-0 top-0", className)}>
      {isValid ? (
        <CheckIcon className={`${style} text-emerald-400`} />
      ) : (
        <Cross2Icon className={`${style} text-rose-400`} />
      )}
    </div>
  );
};

export default Checkmark;
