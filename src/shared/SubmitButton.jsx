import { twMerge } from "tailwind-merge";

const SubmitButton = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "bg-black px-4 py-2 rounded-md text-white hover:bg-emerald-400 focus-visible:outline-none",
        className
      )}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
