import { twMerge } from "tailwind-merge";

const FormContainer = ({ className, children }) => {
  return <div className={twMerge("space-y-8 sm:space-y-10 w-full max-w-lg p-6", className)}>{children}</div>;
};

export default FormContainer;
