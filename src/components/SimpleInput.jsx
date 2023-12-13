import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import INPUT_MAX_WIDTH from "./constants";

const Input = forwardRef(({ className, type, ...props }, ref) => {
  <input
    type={type}
    className={twMerge(
      `${INPUT_MAX_WIDTH} flex h-9 flex-1 rounded-lg border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light font-light placeholder:text-slate-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 `,
      className
    )}
    ref={ref}
    {...props}
  />;
});
Input.displayName = "Input";

export default Input;
