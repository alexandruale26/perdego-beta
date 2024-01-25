import Logo from "../shared/Logo";
import Avatar from "../shared/Avatar";
import LinkButton from "../shared/LinkButton";
import Button from "../shared/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { BARS_HEIGHT } from "../utils/sharedData";
import { useAppContext } from "../App";

const formPath = "/new";
const loginPath = "account/login";
const iconsStyle = "w-11 h-11 focus-visible:scale-110";

const Navbar = () => {
  const { user } = useAppContext();

  return (
    <div
      style={{ height: `${BARS_HEIGHT.nav}px` }}
      className={`flex w-full mx-auto max-w-6xl items-center justify-between px-6 text-white overflow-hidden`}
    >
      <LinkButton to="/">
        <Logo className="text-3xl xs:text-4xl" />
      </LinkButton>
      <div className="flex items-center justify-center gap-6">
        <LinkButton
          to={user !== null ? formPath : loginPath}
          className="min-h-[40px] bg-white text-black px-4 rounded-md focus-visible:scale-105 hover:text-white hover:bg-primary transition-all"
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

        {user !== null && (
          <Button className={`text-xl hover:scale-110 transition-transform ${iconsStyle}`}>
            <Avatar color={user.color} name={user.name} className="w-full h-full" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
