import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const FormContainer = forwardRef(({ className, children, style }, ref) => {
  return (
    <div
      style={style}
      ref={ref}
      className={twMerge("space-y-8 sm:space-y-10 w-full max-w-lg pt-12 pb-24 sm:pb-20 px-6 ", className)}
    >
      {children}
    </div>
  );
});

export default FormContainer;
