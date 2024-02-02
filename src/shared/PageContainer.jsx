import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../utils/sharedData";

const PageContainer = ({ className, children }) => {
  return (
    <div
      id="page-container"
      style={{ minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }}
      className={twMerge("relative w-full h-full py-10 px-4 bg-white", className)}
    >
      {children}
    </div>
  );
};

export default PageContainer;
