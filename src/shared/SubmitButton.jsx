import { twMerge } from "tailwind-merge";

const SubmitButton = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "flex items-center justify-center gap-2 bg-black rounded-md text-white hover:bg-primary focus-visible:outline-none focus-visible:text-lg select-none",
        className
      )}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
