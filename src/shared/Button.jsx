import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button type="button" onClick={onClick} className={twMerge("focus-visible:outline-none", className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
