import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Separator from "../../formComponents/Separator";
import User from "./User";
import Button from "../../shared/button";
import LinkButton from "../../shared/LinkButton";
import { ReaderIcon, ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { logoutUser } from "../../services/userApi";
import toastNotification from "../../shared/Toasts";
import Modal from "../../shared/Modal";

const iconsStyle = "w-5 h-5";
const linksStyle = "w-full flex items-center justify-start gap-2 p-1 xsm:text-lg rounded-[6px]";

const UserProfileMenu = ({ user }) => {
  const [buttonRightDistance, setButtonRightDistance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const updateDistanceFromRight = () => {
      const userButton = document.getElementById("userButton");

      if (userButton) {
        const rect = userButton.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const distance = windowWidth - rect.right;
        setButtonRightDistance(distance);
      }
    };

    updateDistanceFromRight();
    window.addEventListener("resize", updateDistanceFromRight);
    return () => window.removeEventListener("resize", updateDistanceFromRight);
  }, [buttonRightDistance]);

  const signOut = async () => {
    const response = await logoutUser();

    if (response.status !== "ok") return toastNotification(response.message);

    toastNotification(response.message, true);
    navigate("/", { replace: true });
  };

  return (
    <Modal className="items-start justify-end pr-0 animate-in slide-in-from-right-20 duration-50 z-20 overflow-hidden cursor-default">
      <div
        style={{ marginRight: buttonRightDistance }}
        className="max-w-[300px] max-h-[261px] flex flex-col items-start py-4 px-2 bg-white shadow-large rounded-md select-none"
      >
        <User className="pb-2 px-1" user={user} />

        <Separator className="mt-2 mb-3" />

        <LinkButton to="/new" color={user.color} className={`xsm:hidden  ${linksStyle}`}>
          <PlusIcon className={iconsStyle} />
          <span>Adaugǎ anunț nou</span>
        </LinkButton>
        <LinkButton to="/manage" color={user.color} className={linksStyle}>
          <ReaderIcon className={iconsStyle} />
          <span>Anunțurile mele</span>
        </LinkButton>
        <LinkButton to="account" color={user.color} className={linksStyle}>
          <GearIcon className={iconsStyle} />
          <span>Setǎri cont</span>
        </LinkButton>
        <Button onClick={signOut} color={user.color} className={linksStyle}>
          <ExitIcon className={iconsStyle} />
          <span>Ieșire cont</span>
        </Button>
      </div>
    </Modal>
  );
};

export default UserProfileMenu;
