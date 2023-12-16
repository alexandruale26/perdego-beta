import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Checkmark from "./Checkmark";
import { useController } from "../formBase/ControllerContext";
import { INPUT_MAX_WIDTH } from "./constants";

const ValidationInput = forwardRef(({ className, type, ...props }, ref) => {
  const { fieldState } = useController();
  const { errorMessage, isValid } = fieldState ? fieldState : { errorMessage: null, isValid: false };

  return (
    <div className={`h-9 ${INPUT_MAX_WIDTH} relative`}>
      <input
        type={type}
        className={twMerge(
          `w-full h-full rounded-lg border border-stone-300 bg-transparent pl-3 pr-9 text-sm font-light shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 `,
          className
        )}
        ref={ref}
        {...props}
      />
      {(errorMessage || isValid) && <Checkmark isValid={isValid} />}
    </div>
  );
});
ValidationInput.displayName = "ValidationInput";

export default ValidationInput;
