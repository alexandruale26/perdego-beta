import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../utils/sharedData";

const PageContainer = ({ className, children, style }) => {
  const styleToApply = style ? style : { minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` };

  return (
    <div
      id="page-container"
      style={styleToApply}
      className={twMerge("relative w-full h-full py-10 px-4 pb-12 bg-white", className)}
    >
      {children}
    </div>
  );
};

export default PageContainer;
