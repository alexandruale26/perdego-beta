import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../../../utils/sharedData";
import Button from "../../../shared/button";
import { getFromLocalStorage, saveToLocalStorage } from "../../../utils/helpers";
import { LOCAL_STORAGE_ITEMS } from "./cookiesData";

const Cookies = ({ className }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(!!getFromLocalStorage(LOCAL_STORAGE_ITEMS.cookies));

  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function observeCookiePosition() {
      const footerElement = document.getElementById("footer");

      const observer = new IntersectionObserver(
        ([entry]) => {
          const distance = entry.intersectionRect.height;
          if (distance <= BARS_HEIGHT.footer) setDistance(distance);
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: [0.01],
        }
      );

      observer.observe(footerElement);

      return () => {
        observer.disconnect();
      };
    }
    observeCookiePosition();
    window.addEventListener("scroll", observeCookiePosition);
    return () => window.removeEventListener("scroll", observeCookiePosition);
  }, []);

  const handleOnAcceptCookie = () => {
    setCookiesAccepted(true);
    saveToLocalStorage(LOCAL_STORAGE_ITEMS.cookies, true);
  };

  return cookiesAccepted === false ? (
    <div id="cookie" style={{ bottom: distance, left: 0 }} className={twMerge("fixed p-0 xs:p-4", className)}>
      <div className="flex flex-col items-center justify-start gap-1 max-w-full xs:max-w-[400px] p-4 border-2 border-[#76582712] bg-[#f8efe8] xs:rounded-md drop-shadow-[0_0_20px_rgba(0,0,0,0.25)]">
        <img
          src="cookies.png"
          alt="cookies"
          className="max-ww-[50px] xmd:max-w-[70] max-h-[50px] xmd:max-h-[70px] -mt-11 xmd:-mt-14 rotate-[5deg]"
        />

        <div className="flex flex-col items-start gap-2">
          <p className="w-full text-[#76453B]/90 text-sm xmd:text-base text-center font-medium">
            Poate nu știai, dar folosim <span className="whitespace-nowrap">Cookie-uri</span>
          </p>
          <span className="text-xs xmd:text-[13px] text-[#87451a]/70 indent-3">
            Utilizăm cookie-uri pentru a salva preferințele dvs. de navigare și a oferi o experiență de utilizare cât
            mai plăcută. Nu colectăm date despre activitatea dvs. în afara acestor preferințe și nu permitem urmărirea
            activității de către terțe părți.
          </span>
        </div>
        <Button
          onClick={handleOnAcceptCookie}
          className="w-full mt-4 bg-black p-2 rounded-md text-white hover:bg-primary"
        >
          Am înțeles
        </Button>
      </div>
    </div>
  ) : null;
};

export default Cookies;
