import { twMerge } from "tailwind-merge";
import { capitalizeJustFirstChar } from "../utils/helpers";

const convertToUserProfileDate = (date) => date;

// TODO: user account should store profile color

const UserProfile = ({ name, memberSinceDate, className }) => {
  return (
    <div className={twMerge("flex gap-4 items-center justify-center select-none", className)}>
      <div className="flex items-center justify-center w-[52px] h-[52px] text-white text-3xl bg-lime-500 rounded-full">
        {capitalizeJustFirstChar(name)}
      </div>

      <div>
        <p className="font-light text-stone-800">{name}</p>
        <p className="text-sm font-light text-stone-500">
          Membru din <span className="font-medium">{convertToUserProfileDate(memberSinceDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
