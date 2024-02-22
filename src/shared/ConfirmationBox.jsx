import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "./Modal";
import Button from "./button";
import { BARS_HEIGHT } from "../utils/sharedData";

const buttonsStyle = "w-full text-sm xxs:text-base p-2 text-white rounded-md";

const ConfirmationBox = ({
  children,
  className,
  denyButtonTitle,
  confirmButtonTitle,
  handleOnDeny,
  handleOnConfirm,
}) => {
  const boxRef = useRef(null);

  const confirmButtonText = confirmButtonTitle ? confirmButtonTitle : "Sunt sigur";
  const denyButtonText = denyButtonTitle ? denyButtonTitle : "Anuleazǎ";

  useEffect(() => {
    const offsetElement = () => {
      // some random values to look good
      const scrollOffset = window.innerHeight < 550 ? 100 : window.scrollY + 150;

      const topPosition = scrollOffset + BARS_HEIGHT.nav;
      boxRef.current.style.marginTop = topPosition + "px";
    };

    offsetElement();
    window.addEventListener("scroll", offsetElement);
    window.addEventListener("resize", offsetElement);

    return () => {
      window.removeEventListener("scroll", offsetElement);
      window.removeEventListener("resize", offsetElement);
    };
  }, []);

  return (
    <Modal className="items-start">
      <div
        ref={boxRef}
        className={twMerge(
          "flex items-start justify-center bg-white w-full max-w-sm rounded-md shadow-large animate-in zoom-in-50 ease-out select-none",
          className
        )}
      >
        <div className="w-full h-full flex flex-col items-center justify-between p-4 gap-3">
          {children}

          <div className="w-full flex items-center justify-between gap-4 py-2">
            <Button onClick={handleOnDeny} className={`bg-grey-900 hover:bg-primary-400 ${buttonsStyle}`}>
              {denyButtonText}
            </Button>
            <Button onClick={handleOnConfirm} className={`bg-rose-600 hover:bg-rose-500 ${buttonsStyle}`}>
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationBox;
