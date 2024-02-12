import { useState, useEffect, useRef } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import UserProfileMenu from "./UserProfileMenu";
import { allowWindowScroll } from "../../utils/helpers";
import UserIcon from "../../shared/icons/UserIcon";

const menuIconsStyle = "block xsm:hidden w-8 h-8 text-white hover:text-primary";

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
      <div>
        {menuIsOpen ? <Cross1Icon className={menuIconsStyle} /> : <HamburgerMenuIcon className={menuIconsStyle} />}
        <UserIcon className="hidden xsm:block p-1.5" />
        {menuIsOpen && <UserProfileMenu user={user} />}
      </div>
    </div>
  );
};

export default UserProfileButton;
