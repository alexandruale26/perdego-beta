import React from "react";
import { ART_942 } from "../../utils/sharedData";

const LegalInfo = () => {
  return (
    <span className="block p-4 bg-grey-100 rounded-md text-orange-500 text-xs xs:text-sm font-medium">
      &rarr; Conform{" "}
      <a
        href={ART_942}
        target="_blank"
        className="font-bold underline focus-visible:outline-none focus-visible:text-black"
        rel="noreferrer"
      >
        Art. 942 din Codului Civil
      </a>
      , bunul gǎsit trebuie restituit proprietarului în termen de 10 zile sau predat organului de poliție din
      localitatea în care a fost găsit.
    </span>
  );
};

export default LegalInfo;
