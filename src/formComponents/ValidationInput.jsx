import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Checkmark from "./variousComponents/Checkmark";
import VisibilityButton from "./variousComponents/VisibilityButton";
import { useController } from "../formBase/ControllerContext";

const ValidationInput = forwardRef(({ className, type, ...props }, ref) => {
  const isPasswordType = type === "password";

  const [visible, setVisible] = useState(isPasswordType);
  const { fieldState } = useController();
  const { isValid } = fieldState ? fieldState : { isValid: false };

  const onHandleClick = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="h-9 w-full relative">
      <input
        type={isPasswordType ? (visible ? "password" : "text") : type}
        className={twMerge(
          "flex h-9 w-full rounded-md border border-grey-300 bg-transparent px-3 py-1 pr-8 text-sm font-light shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-500 placeholder:font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grey-800 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-grey-100",
          className
        )}
        ref={ref}
        {...props}
      />
      {isValid && !isPasswordType && <Checkmark />}
      {isPasswordType && <VisibilityButton name="show input values" visible={visible} onClick={onHandleClick} />}
    </div>
  );
});
ValidationInput.displayName = "ValidationInput";

export default ValidationInput;
