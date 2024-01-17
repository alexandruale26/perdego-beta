import { twMerge } from "tailwind-merge";
import WarningIcon from "./WarningIcon";

const genericMessage = "Pagina nu existǎ :(";

const Error = ({ className, errorMessage = null }) => {
  const message = errorMessage === null ? genericMessage : errorMessage;

  // TODO: min-h-screen - nav + footer

  return (
    <div
      className={twMerge("w-full h-full min-h-screen flex flex-col items-center justify-center gap-2 p-4", className)}
    >
      <WarningIcon />
      <span className="font-light text-lg text-grey-700">{message}</span>
    </div>
  );
};

export default Error;
