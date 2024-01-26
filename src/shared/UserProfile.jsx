import { twMerge } from "tailwind-merge";
import { formatDateToRoumanian } from "../utils/helpers";
import Avatar from "./Avatar";

const UserProfile = ({ profile, className }) => {
  const createdDate = new Date(profile.createdAt);

  return (
    <div className={twMerge("flex gap-4 items-center justify-center select-none", className)}>
      <Avatar color={profile.color} name={profile.name} />

      <div>
        <p className="font-light text-grey-800">{profile.name}</p>
        <p className="text-sm font-light text-grey-500">
          Membru din <span className="font-medium">{formatDateToRoumanian(createdDate, false)}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
