import { twMerge } from "tailwind-merge";

const LoginDiv = ({ className, children }) => {
  return (
    <div className={twMerge("w-full sm:w-1/2 h-full sm:min-h-screen flex items-center justify-center", className)}>
      {children}
    </div>
  );
};

export default LoginDiv;
