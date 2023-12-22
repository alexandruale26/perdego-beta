import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={twMerge("focus-visible:outline-none", className)}>
      {children}
    </button>
  );
};

export default Button;
