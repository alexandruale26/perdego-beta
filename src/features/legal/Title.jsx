import { twMerge } from "tailwind-merge";

const Title = ({ title, className }) => {
  return <h1 className={twMerge("text-2xl font-medium text-grey-800 leading-none", className)}>{title}</h1>;
};

export default Title;
