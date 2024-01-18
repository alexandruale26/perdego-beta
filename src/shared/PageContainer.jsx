import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../sharedData";

const PageContainer = ({ className, children }) => {
  return (
    <div
      style={{ minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }}
      className={twMerge("w-full h-full py-10 px-4 bg-white", className)}
    >
      {children}
    </div>
  );
};

export default PageContainer;
