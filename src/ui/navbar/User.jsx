import { twMerge } from "tailwind-merge";
import Avatar from "../../shared/Avatar";

const textStyle = "w-[180px] xs:w-[220px] text-start truncate";

const User = ({ className, hideAvatar, user }) => {
  return (
    <div className={twMerge("flex items-center justify-center gap-2 select-none", className)}>
      {hideAvatar === false && <Avatar color={user.color} name={user.name} className="w-10 h-10" />}
      <div className="flex flex-col items-start justify-center">
        <p className={`text-sm text-grey-800 ${textStyle}`}>{user.name}</p>
        <p className={`text-xs text-grey-700 ${textStyle}`}>{user.email}</p>
      </div>
    </div>
  );
};

export default User;
