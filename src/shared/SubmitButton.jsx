import { twMerge } from "tailwind-merge";

const SubmitButton = ({ children, className, ...props }) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "flex items-center justify-center gap-2 bg-black rounded-md text-white hover:bg-primary focus-visible:outline-none focus-visible:text-lg select-none disabled:bg-grey-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
