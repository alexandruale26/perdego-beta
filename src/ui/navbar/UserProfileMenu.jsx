import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BARS_HEIGHT } from "../../utils/sharedData";
import Separator from "../../formComponents/Separator";
import User from "./User";
import Button from "../../shared/button";
import LinkButton from "../../shared/LinkButton";
import { ReaderIcon, ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { logoutUser } from "../../services/userApi";
import { warningToast, successToast } from "../../shared/Toasts";

const iconsStyle = "w-5 h-5";
const linksStyle = "w-full flex items-center justify-start gap-2 p-1 xs:text-lg rounded-[4px]";

const UserProfileMenu = ({ user, isOnMobileDevice = true }) => {
  const [mainElDimensions, setMainElDimensions] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const bodyElement = document.querySelector("body");

      if (bodyElement) {
        const { width, height } = bodyElement.getBoundingClientRect();
        setMainElDimensions({ width, height: height - (BARS_HEIGHT.nav + BARS_HEIGHT.footer) });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const signOut = async () => {
    const response = await logoutUser();

    if (response.status !== "ok") return warningToast(response.message);

    successToast(response.message);
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        width: mainElDimensions.width,
        height: mainElDimensions.height,
        marginTop: isOnMobileDevice ? "51px" : "57px",
      }}
      className="flex justify-end absolute -right-4 animate-in slide-in-from-right-10 ease-out z-20 backdrop-blur-sm overflow-hidden cursor-default"
    >
      <div className="p-4">
        <div className="max-w-[300px] max-h-[261px] flex flex-col items-start py-4 bg-white shadow-[0px_2px_10px_1px_rgba(0,0,0,0.2)] rounded-md">
          <User className="px-4 pb-2" user={user} hideAvatar={!isOnMobileDevice} />
          <Separator className="mt-2 mb-4" />

          <div className="w-full flex flex-col items-start justify-center gap-1 px-2">
            {isOnMobileDevice && (
              <LinkButton to="/new" color={user.color} className={linksStyle}>
                <PlusIcon className={iconsStyle} />
                <span>Adaugǎ anunț nou</span>
              </LinkButton>
            )}
            <LinkButton to="/manageposts" color={user.color} className={linksStyle}>
              <ReaderIcon className={iconsStyle} />
              <span>Anunțurile mele</span>
            </LinkButton>
            <LinkButton color={user.color} className={linksStyle}>
              <GearIcon className={iconsStyle} />
              <span>Setǎri cont</span>
            </LinkButton>
            <Button onClick={signOut} color={user.color} className={linksStyle}>
              <ExitIcon className={iconsStyle} />
              <span>Ieșire cont</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileMenu;
