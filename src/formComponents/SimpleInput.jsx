import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  <input
    type={type}
    className={twMerge(
      "flex h-9 w-full rounded-md border border-stone-300 bg-white px-3 py-1 text-sm transition-colors font-light placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700",
      className
    )}
    ref={ref}
    {...props}
  />;
});
Input.displayName = "Input";

export default Input;
