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
  const initials = getNameInitials(name);

  return (
    <div
      style={{ backgroundColor: color }}
      className={twMerge(
        `flex items-center justify-center w-[52px] h-[52px] text-white text-2xl rounded-full overflow-hidden select-none ${
          initials.length === 1 ? "" : "tracking-wider pl-0.5"
        }`,
        className
      )}
    >
      {initials}
    </div>
  );
};

export default Avatar;
