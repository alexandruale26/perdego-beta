import { twMerge } from "tailwind-merge";

const ControlledInput = ({ className, type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={twMerge(
        "h-9 w-full rounded-md border border-stone-300 bg-white px-3 py-1 text-sm transition-colors font-light placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700 disabled:bg-stone-100 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
};
ControlledInput.displayName = "ControlledInput";

export default ControlledInput;