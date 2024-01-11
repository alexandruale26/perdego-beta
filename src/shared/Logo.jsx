import { twMerge } from "tailwind-merge";
import { LeftArrow, RightArrow } from "./LogoArrows";

const Logo = ({ className }) => {
  return (
    <div className={twMerge("text-5xl select-none text-primary", className)}>
      <LeftArrow /> perdego <RightArrow />
    </div>
  );
};

export default Logo;
