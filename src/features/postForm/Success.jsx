import { twMerge } from "tailwind-merge";
import LinkButton from "../../shared/LinkButton";

const Success = ({ className, message }) => {
  // TODO: different message for new and modified post

  return (
    <div className={twMerge("w-full h-full flex flex-col items-center justify-center gap-8", className)}>
      <h3 className="text-xl xs:text-2xl text-grey-800  text-center">{message}</h3>

      <LinkButton to="/" replace={true} disguiseAsFullButton={true}>
        Am înțeles
      </LinkButton>
    </div>
  );
};

export default Success;
