import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../utils/sharedData";
import Button from "./button";

const Cookies = ({ handleOnAcceptCookie, className }) => {
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

  return (
    <div
      id="cookie"
      style={{ bottom: distance, right: 0 }}
      className={twMerge("fixed w-full flex items-center justify-center p-4", className)}
    >
      <div className="flex flex-col items-center justify-start gap-2 max-w-[400px] p-4 border-2 border-[#76582712] bg-[#f8efe8] rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <img src="cookies.png" alt="cookies" className="max-w-[70px] max-h-[70px] -mt-14 rotate-[5deg]" />

        <div className="flex flex-col items-start gap-2">
          <p className="w-full text-[#76453B]/90 text-center font-medium">Poate nu știai, dar folosim Cookie-uri</p>
          <span className="text-[13px] text-[#87451a]/70 indent-3">
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
  );
};

export default Cookies;
