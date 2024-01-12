import { twMerge } from "tailwind-merge";

const Div = ({ className, children }) => {
  return (
    <div
      className={twMerge("w-full sm:w-1/2 h-full min-h-0 sm:min-h-screen flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
};

export default Div;
