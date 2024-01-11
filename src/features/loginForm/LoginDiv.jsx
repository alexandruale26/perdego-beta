import { twMerge } from "tailwind-merge";

const LoginDiv = ({ className, children }) => {
  return (
    <div className={twMerge("w-1/2 h-full min-h-screen flex items-center justify-center", className)}>{children}</div>
  );
};

export default LoginDiv;
