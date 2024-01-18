import { twMerge } from "tailwind-merge";
import Logo from "../../shared/Logo";
import { LeftArrow, RightArrow } from "../../shared/LogoArrows";
import HalfWidthDiv from "./HalfWidthDiv";

const Hero = ({ className }) => {
  return (
    <HalfWidthDiv className="bg-black">
      <div className={twMerge("flex flex-col items-start justify-start w-full max-w-lg p-6", className)}>
        <h1>
          <Logo className="text-3xl xs:text-4xl lg:text-5xl" />
        </h1>
        <h3 className="xs:text-lg lg:text-xl text-white font-light py-6 xs:py-10 mt-4 sm:mt-0">
          <LeftArrow className="text-lg lg:text-xl" />
          <RightArrow className="text-lg lg:text-xl" /> Recupereazǎ-ți obiectele pierdute sau ajutǎ pe alți utilizatori
          să-și găsească bunurile
        </h3>
      </div>
    </HalfWidthDiv>
  );
};

export default Hero;
