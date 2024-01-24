import { twMerge } from "tailwind-merge";
import { capitalizeFirstChar } from "../utils/helpers";

// TODO: user avatar color
// TODO: Avatar logic for 2 initials

const Avatar = ({ bgColor, userName, className }) => {
  return (
    <div
      className={twMerge(
        `flex items-center justify-center w-[52px] h-[52px] text-white text-2xl ${"bg-teal-500"} rounded-full overflow-hidden`,
        className
      )}
    >
      {userName}
    </div>
  );
};

export default Avatar;
