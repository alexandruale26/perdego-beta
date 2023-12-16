import * as React from "react";
import { twMerge } from "tailwind-merge";
import Checkmark from "./Checkmark";
import { useController } from "../formBase/ControllerContext";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const { fieldState } = useController();
  const { errorMessage, isValid } = fieldState ? fieldState : { errorMessage: null, isValid: false };

  return (
    <div className="w-full max-w-xs relative">
      <textarea
        className={twMerge(
          "w-full h-[200px] rounded-lg border border-stone-300 bg-transparent py-2 pl-3 pr-8 text-sm shadow-md transition-colors font-light placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
      {(errorMessage || isValid) && <Checkmark isValid={isValid} className="items-start top-2" />}
    </div>
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
