import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Checkmark from "./Checkmark";
import { useController } from "../formBase/ControllerContext";

const ValidationInput = forwardRef(({ className, type, ...props }, ref) => {
  const { fieldState } = useController();
  const { isValid } = fieldState ? fieldState : { isValid: false };

  return (
    <div className="h-9 w-full relative">
      <input
        type={type}
        className={twMerge(
          `w-full h-full rounded-md border border-stone-300 bg-white pl-3 pr-9 text-sm font-light transition-colors placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700 disabled:bg-stone-100 disabled:cursor-not-allowed`,
          className
        )}
        ref={ref}
        {...props}
      />
      {isValid && <Checkmark />}
    </div>
  );
});
ValidationInput.displayName = "ValidationInput";

export default ValidationInput;
