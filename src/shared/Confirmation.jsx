import { useState } from "react";
import { twMerge } from "tailwind-merge";
import LinkButton from "./LinkButton";
import Spinner from "./Spinner";

const confetti = "../../public/confetti.svg";

const Confirmation = ({ className, message, buttonTitle = null }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const buttonText = buttonTitle ? buttonTitle : "Am înțeles";

  return (
    <div className={twMerge("w-full h-full flex flex-col items-center justify-center gap-6 select-none", className)}>
      {isLoading && <Spinner fullHeight={false} />}
      <img
        src={confetti}
        alt="confetti"
        onLoad={handleImageLoad}
        style={{ display: isLoading ? "none" : "block" }}
        className="max-w-[120px] max-h-[120px]"
      />
      <h3 className="pt-6 text-lg text-grey-600 text-center">{message}</h3>

      <LinkButton to="/" replace={true} displayAsButton={true}>
        {buttonText}
      </LinkButton>
    </div>
  );
};

export default Confirmation;
