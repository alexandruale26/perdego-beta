import { twMerge } from "tailwind-merge";
import Avatar from "./Avatar";

const convertToUserProfileDate = (date) => date;

const UserProfile = ({ name, memberSinceDate, className }) => {
  return (
    <div className={twMerge("flex gap-4 items-center justify-center select-none", className)}>
      <Avatar />

      <div>
        <p className="font-light text-grey-800">{name}</p>
        <p className="text-sm font-light text-grey-500">
          Membru din <span className="font-medium">{convertToUserProfileDate(memberSinceDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
