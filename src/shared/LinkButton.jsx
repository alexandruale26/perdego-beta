import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const LinkButton = ({ to, replace = false, children, className, color = null, displayAsButton = false, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverStyle = color !== null && isHovered ? { backgroundColor: color, color: "#fff" } : {};

  const linkClassStyle = displayAsButton
    ? "min-h-[48px] w-full max-w-xs gap-2 bg-grey-900 rounded-md text-white text-center hover:bg-primary focus-visible:outline-none focus-visible:text-lg select-none"
    : "focus-visible:outline-none select-none";

  return (
    <Link
      to={to}
      replace={replace}
      style={hoverStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(`flex items-center justify-center ${linkClassStyle}`, className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
