import { useNavigate } from "react-router-dom";
import Separator from "../../formComponents/Separator";
import User from "./User";
import Button from "../../shared/button";
import LinkButton from "../../shared/LinkButton";
import { ReaderIcon, ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { logoutUser } from "../../services/userApi";
import { errorToast, successToast } from "../../shared/Toasts";
import Modal from "../../shared/Modal";

const iconsStyle = "w-5 h-5";
const linksStyle = "w-full flex items-center justify-start gap-2 p-1 xs:text-lg rounded-[4px]";

const UserProfileMenu = ({ user, isOnMobileDevice = true }) => {
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await logoutUser();

    if (response.status !== "ok") return errorToast(response.message);

    successToast(response.message);
    navigate("/", { replace: true });
  };

  return (
    <Modal className="items-start justify-end animate-in slide-in-from-right-10 ease-out z-20 overflow-hidden cursor-default">
      <div className="max-w-[300px] max-h-[261px] flex flex-col items-start py-4 bg-white shadow-large rounded-md select-none">
        <User className="px-4 pb-2" user={user} hideAvatar={!isOnMobileDevice} />
        <Separator className="mt-2 mb-4" />

        <div className="w-full flex flex-col items-start justify-center gap-1 px-2">
          {isOnMobileDevice && (
            <LinkButton to="/new" color={user.color} className={linksStyle}>
              <PlusIcon className={iconsStyle} />
              <span>Adaugǎ anunț nou</span>
            </LinkButton>
          )}
          <LinkButton to="/edit" color={user.color} className={linksStyle}>
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
    </Modal>
  );
};

export default UserProfileMenu;
