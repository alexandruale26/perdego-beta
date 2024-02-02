import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

function Modal({ children, className, style }) {
  const [pageContainerDimensions, setPageContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");

      if (pageContainer) {
        const { width, height } = pageContainer.getBoundingClientRect();
        setPageContainerDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return createPortal(
    <div
      style={{ width: pageContainerDimensions.width, height: pageContainerDimensions.height, ...style }}
      className={twMerge("absolute flex items-center justify-center p-4 backdrop-blur-sm top-0 right-0", className)}
    >
      {children}
    </div>,
    document.getElementById("page-container")
  );
}

export default Modal;
