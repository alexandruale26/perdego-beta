import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

const InputCheckmark = ({ isValid }) => {
  const style = "w-5 h-5";

  return (
    <div className="flex justify-center items-center absolute w-8 h-full right-0 top-0">
      {isValid ? (
        <CheckIcon className={`${style} text-emerald-400`} />
      ) : (
        <Cross2Icon className={`${style} text-rose-400`} />
      )}
    </div>
  );
};

export default InputCheckmark;
