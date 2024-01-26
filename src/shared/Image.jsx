import { twMerge } from "tailwind-merge";

const placeholder = "placeholder.png";

const Image = ({ className, src = null }) => {
  const image = src === null ? placeholder : src;

  return <img src={image} alt="placeholder" className={twMerge("w-full h-full", className)} />;
};

export default Image;
