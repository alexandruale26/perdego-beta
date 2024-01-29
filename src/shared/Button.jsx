import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, className, color = null, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverStyle = color !== null && isHovered ? { backgroundColor: color, color: "#fff" } : {};

  return (
    <button
      type="button"
      onClick={onClick}
      style={hoverStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge("focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
