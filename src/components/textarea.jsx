import * as React from "react";
import { twMerge } from "tailwind-merge";
import Checkmark from "./Checkmark";
import { useController } from "../reactForm/ControllerContext";

const CheckmarkTextarea = React.forwardRef(({ className, ...props }, ref) => {
  const { fieldState } = useController();
  const { errorMessage, isValid } = fieldState ? fieldState : { errorMessage: null, isValid: false };

  return (
    <div className="relative">
      <textarea
        className={twMerge(
          "w-full rounded-md border border-slate-700 bg-transparent py-2 pl-3 pr-8 text-sm shadow-sm transition-colors font-light placeholder:text-slate-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        rows={10}
        ref={ref}
        {...props}
      />
      {(errorMessage || isValid) && <Checkmark isValid={isValid} className="items-start top-2" />}
    </div>
  );
});
CheckmarkTextarea.displayName = "CheckmarkInput";

export { CheckmarkTextarea };
