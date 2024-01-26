import toast from "react-hot-toast";
import WarningIcon from "../shared/WarningIcon";
import SuccessIcon from "./SuccessIcon";

const warningToast = (message) =>
  toast(<span className="text-white">{message}</span>, {
    icon: <WarningIcon className={`text-white ${message.length > 30 ? "w-12 h-12" : "w-8 h-8"}`} />,
    style: { background: "#f87171" },
  });

const successToast = (message) =>
  toast(<span className="text-white">{message}</span>, {
    icon: <SuccessIcon className={`text-white ${message.length > 30 ? "w-12 h-12" : "w-8 h-8"}`} />,
    style: { background: "#4ade80" },
  });

export { warningToast, successToast };
