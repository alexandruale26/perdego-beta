import Logo from "../shared/icons/Logo";
import LinkButton from "../shared/LinkButton";
import { PersonIcon } from "@radix-ui/react-icons";
import { BARS_HEIGHT } from "../utils/sharedData";
import { useUserSessionContext } from "./UserSession";
import UserProfileButton from "./navbar/UserProfileButton";

const formPath = "/new";
const loginPath = "/login";
const iconsStyle = "w-11 h-11 focus-visible:scale-110";

const Navbar = () => {
  const { user } = useUserSessionContext();

  return (
    <div className="px-4">
      <div style={{ height: `${BARS_HEIGHT.nav}px` }} className={`flex w-full mx-auto items-center justify-between`}>
        <LinkButton to="/">
          <Logo className="text-3xl sm:text-4xl" />
        </LinkButton>

        <div className="flex items-center justify-center gap-8">
          <LinkButton
            to={user !== null ? formPath : loginPath}
            className="hidden xsm:flex min-h-[40px] bg-white text-black px-4 rounded-md focus-visible:scale-105 hover:text-white hover:bg-primary transition-all"
          >
            Adaugǎ anunț nou
          </LinkButton>

          {user === null && (
            <LinkButton
              to={loginPath}
              className={`text-black bg-white p-2 hover:bg-primary hover:text-white rounded-full ${iconsStyle}`}
            >
              <PersonIcon className="w-full h-full" />
            </LinkButton>
          )}

          {user !== null && <UserProfileButton user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
