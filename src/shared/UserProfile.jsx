import { twMerge } from "tailwind-merge";
import { PersonIcon } from "@radix-ui/react-icons";

const convertToUserProfileDate = (date) => date;

const UserProfile = ({ name, memberSinceDate, className }) => {
  return (
    <div className={twMerge("flex gap-4 items-center justify-center", className)}>
      <div className="flex items-center justify-center w-14 h-14 p-2 border-2 border-black rounded-full">
        <PersonIcon className="w-full h-full" />
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
