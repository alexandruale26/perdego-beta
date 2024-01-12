import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Button from "../../shared/button";

const iconStyle = "w-5 h-5 text-grey-700";

const VisibilityButton = ({ visible, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="flex justify-center items-center absolute right-1 top-0 overflow-hidden h-full px-2 focus-visible:scale-125 hover:scale-125 transition-transform"
    >
      {!visible ? <EyeClosedIcon className={iconStyle} /> : <EyeOpenIcon className={iconStyle} />}
    </Button>
  );
};

export default VisibilityButton;
