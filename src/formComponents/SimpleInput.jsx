import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SimpleInput = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        "h-9 w-full rounded-md border border-grey-300 bg-white px-3 py-1 text-sm transition-colors font-light placeholder:text-grey-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 disabled:bg-grey-100 disabled:cursor-not-allowed select-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
