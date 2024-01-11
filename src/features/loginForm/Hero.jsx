import Logo from "../../shared/Logo";
import { LeftArrow, RightArrow } from "../../shared/LogoArrows";
import LoginDiv from "./LoginDiv";

const Hero = () => {
  return (
    <LoginDiv className="bg-black min-h-0">
      <div className="flex flex-col items-start justify-start w-full max-w-lg sm:min-h-[450px] p-6">
        <h1>
          <Logo className="text-3xl xs:text-4xl lg:text-5xl" />
        </h1>
        <h3 className="xs:text-lg lg:text-xl text-white font-light py-6 xs:py-10">
          <LeftArrow className="text-lg lg:text-xl" /> Recupereazǎ-ți obiectele pierdute sau ajutǎ pe alți utilizatori
          să-și găsească bunurile <RightArrow className="text-lg lg:text-xl" />
        </h3>
      </div>
    </LoginDiv>
  );
};

export default Hero;
