import Logo from "../shared/Logo";
import Avatar from "../shared/Avatar";
import LinkButton from "../shared/LinkButton";
import { PersonIcon } from "@radix-ui/react-icons";
import { BARS_HEIGHT } from "../sharedData";

const Navbar = () => {
  return (
    <div
      style={{ height: `${BARS_HEIGHT.nav}px` }}
      className={`flex w-full mx-auto max-w-6xl items-center justify-between px-6 text-white overflow-hidden`}
    >
      <LinkButton to="/">
        <Logo className="text-3xl xs:text-4xl" />
      </LinkButton>
      <ul className="flex items-center justify-center gap-4">
        <LinkButton to="/" disguiseAsFullButton={true} className="text-white px-4">
          Adaugǎ anunț nou
        </LinkButton>

        {/*  add hover effect to links login, logout, account if logged */}
        <PersonIcon className="w-8 h-8" />
      </ul>
    </div>
  );
};

export default Navbar;
