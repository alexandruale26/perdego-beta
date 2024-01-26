import { twMerge } from "tailwind-merge";

const LeftArrow = ({ className }) => {
  return <div className={twMerge("text-primary inline-block", className)}>&lt;</div>;
};

const RightArrow = ({ className }) => {
  return <div className={twMerge("text-primary inline-block", className)}>&gt;</div>;
};

export { LeftArrow, RightArrow };
