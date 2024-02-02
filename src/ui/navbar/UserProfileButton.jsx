import { useState } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import UserProfileMenu from "./UserProfileMenu";
import Avatar from "../../shared/Avatar";
import { allowWindowScroll } from "../../utils/helpers";

const menuIconsStyle = "w-8 h-8 text-white";

const UserProfileButton = ({ user }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
    allowWindowScroll(menuIsOpen);
  };

  return (
    <div onClick={handleOnClick} className="relative cursor-pointer">
      <div className="hidden xsm:flex flex-col">
        <Avatar color={user.color} name={user.name} className="w-11 h-11" />
        {menuIsOpen && <UserProfileMenu user={user} isOnMobileDevice={false} />}
      </div>

      <div className="flex xsm:hidden flex-col">
        {menuIsOpen ? (
          <Cross1Icon className={`${menuIconsStyle} ${!menuIsOpen ? "" : "hover:text-primary"}`} />
        ) : (
          <HamburgerMenuIcon className={`${menuIconsStyle} ${menuIsOpen ? "" : "hover:text-primary"}`} />
        )}

        {menuIsOpen && <UserProfileMenu user={user} />}
      </div>
    </div>
  );
};

export default UserProfileButton;
