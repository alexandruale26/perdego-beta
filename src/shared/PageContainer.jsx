import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../utils/sharedData";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/helpers";
import Cookies from "./Cookies";

const PageContainer = ({ className, children, style }) => {
  const styleToApply = style ? style : { minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` };

  return (
    <div
      id="page-container"
      style={styleToApply}
      className={twMerge("relative w-full h-full py-10 px-4 pb-12 bg-white", className)}
    >
      {children}

      <Cookies className="z-50" />
    </div>
  );
};

export default PageContainer;
