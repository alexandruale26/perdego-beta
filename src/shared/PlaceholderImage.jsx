import { twMerge } from "tailwind-merge";

const placeholder = "../../public/placeholder.png";

const PlaceholderImage = ({ className, src = null }) => {
  const image = src === null ? placeholder : src;

  return <img src={image} alt="placeholder" className={twMerge("w-full h-full", className)} />;
};

export default PlaceholderImage;
