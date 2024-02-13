import TnCLink from "./TCLink";
import { ART_942 } from "../../utils/sharedData";

const NewPostLegalInfo = () => {
  return (
    <span className="block p-4 bg-grey-100 rounded-md text-grey-600 text-[13px] xs:text-[15px] leading-snug font-normal indent-1">
      &rarr; Conform{" "}
      <TnCLink href={ART_942} className="font-semibold">
        Art. 942 din Codului Civil
      </TnCLink>
      , bunul gǎsit trebuie restituit proprietarului în termen de 10 zile sau predat organului de poliție din
      localitatea în care a fost găsit.
    </span>
  );
};

export default NewPostLegalInfo;
