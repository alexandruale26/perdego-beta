import { twMerge } from "tailwind-merge";
import { capitalizeFirstChar } from "../utils/helpers";

const getNameInitials = (name) => {
  const words = name.split(" ");
  return words.reduce((acc, word, index) => {
    if (index > 1) return acc;
    return acc + capitalizeFirstChar(word);
  }, "");
};

const Avatar = ({ color, name, className }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={twMerge(
        `flex items-center justify-center w-[52px] h-[52px] text-white text-xl sm:text-2xl rounded-full overflow-hidden select-none`,
        className
      )}
    >
      {getNameInitials(name)}
    </div>
  );
};

export default Avatar;
