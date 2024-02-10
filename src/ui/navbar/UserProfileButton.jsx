import { useState, useEffect, useRef } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import UserProfileMenu from "./UserProfileMenu";
import Avatar from "../../shared/Avatar";
import { allowWindowScroll } from "../../utils/helpers";

const menuIconsStyle = "w-8 h-8 text-white";

const UserProfileButton = ({ user }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const profileButtonRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setMenuIsOpen(false);
        allowWindowScroll(true);
      } else {
        setMenuIsOpen(!menuIsOpen);
        allowWindowScroll(menuIsOpen);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuIsOpen]);

  return (
    <div id="userButton" ref={profileButtonRef} className="relative cursor-pointer">
      <div className="hidden xsm:flex flex-col">
        <Avatar color={user.color} name={user.name} className="w-11 h-11 text-xl" />
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
