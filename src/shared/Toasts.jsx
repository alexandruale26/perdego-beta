import toast from "react-hot-toast";
import WarningIcon from "./icons/WarningIcon";
import SuccessIcon from "./icons/SuccessIcon";

const largeIconsStyle = "w-12 h-12";
const smallIconsStyle = "w-8 h-8";

const errorToast = (message) =>
  toast(<span className="text-white">{message}</span>, {
    icon: <WarningIcon className={`text-white ${message.length > 30 ? largeIconsStyle : smallIconsStyle}`} />,
    style: { background: "#f87171" },
  });

const successToast = (message) =>
  toast(<span className="text-white">{message}</span>, {
    icon: <SuccessIcon className={`text-white ${message.length > 30 ? largeIconsStyle : smallIconsStyle}`} />,
    style: { background: "#4ade80" },
  });

export { errorToast, successToast };
