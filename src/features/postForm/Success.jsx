import { twMerge } from "tailwind-merge";
import LinkButton from "../../shared/LinkButton";

const Success = ({ className, message }) => {
  return (
    <div className={twMerge("w-full h-full flex flex-col items-center justify-center gap-8", className)}>
      <h3 className="text-xl xs:text-2xl text-grey-800  text-center">{message}</h3>

      <LinkButton
        to="/"
        className="h-12 w-full max-w-xs flex items-center justify-center gap-2 bg-black rounded-md text-white hover:bg-primary focus-visible:outline-none focus-visible:text-lg select-none"
      >
        Am înțeles
      </LinkButton>
    </div>
  );
};

export default Success;
