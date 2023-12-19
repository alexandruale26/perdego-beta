import * as React from "react";
import { twMerge } from "tailwind-merge";
import Checkmark from "./Checkmark";
import { useController } from "../formBase/ControllerContext";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const { fieldState } = useController();
  const { isValid } = fieldState ? fieldState : { isValid: false };

  return (
    <div className="w-full relative h-[200px]">
      <textarea
        className={twMerge(
          "w-full h-full rounded-md border border-stone-300 bg-white py-2 pl-3 pr-8 text-sm transition-colors font-light placeholder:text-stone-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
      {isValid && <Checkmark className="items-start top-2" />}
    </div>
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
