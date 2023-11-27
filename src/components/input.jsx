import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useSchema } from "../ui/SchemaContext";
import InputCheckmark from "../ui/InputCheckmark";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    // <input
    //   type={type}
    //   className={twMerge(
    //     "flex h-9 w-full flex-1 rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light font-light placeholder:text-slate-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 ",
    //     className
    //   )}
    //   ref={ref}
    //   {...props}
    // />

    <div className="h-9 relative">
      <input
        type={type}
        className={twMerge(
          "w-full h-full rounded-md border border-slate-700 bg-transparent pl-3 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light font-light placeholder:text-slate-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
      {props.isTouched && <InputCheckmark isValid={props.isTouched} />}
    </div>
  );
});
Input.displayName = "Input";

export default Input;