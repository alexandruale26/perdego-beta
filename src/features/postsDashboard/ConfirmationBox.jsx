import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "../../shared/Modal";
import Button from "../../shared/button";

const buttonsStyle = "w-full text-sm xxs:text-base p-2 text-white rounded-md";

const ConfirmationBox = ({
  children,
  className,
  denyButtonTitle,
  confirmButtonTitle,
  handleOnDeny,
  handleOnConfirma,
}) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const centerElement = () => {
      var element = boxRef.current;
      var windowHeight = window.innerHeight;

      var elementHeight = element.offsetHeight;
      var topPosition = (windowHeight - elementHeight) / 2;

      element.style.marginTop = topPosition + "px";
    };

    centerElement();
    window.addEventListener("resize", centerElement);

    return () => {
      window.removeEventListener("resize", centerElement);
    };
  }, []);

  return (
    <Modal className="fixed items-start">
      <div
        ref={boxRef}
        className={twMerge(
          "flex items-start justify-center bg-white w-full max-w-sm rounded-md shadow-large",
          className
        )}
      >
        <div className="w-full h-full flex flex-col items-center justify-between p-4 gap-3">
          {children}

          <div className="w-full flex items-center justify-between gap-4 py-2">
            <Button onClick={handleOnDeny} className={`bg-black hover:bg-primary-400 ${buttonsStyle}`}>
              {denyButtonTitle}
            </Button>
            <Button onClick={handleOnConfirma} className={`bg-rose-600 hover:bg-rose-500 ${buttonsStyle}`}>
              {confirmButtonTitle}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationBox;
