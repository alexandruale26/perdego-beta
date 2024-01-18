import { twMerge } from "tailwind-merge";
import { BARS_HEIGHT } from "../sharedData";

const Spinner = ({ className, fullHeight = true }) => {
  const containerHeight = fullHeight ? { minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` } : {};

  return (
    <div style={containerHeight} className={twMerge("h-full flex items-center justify-center", className)}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-spin">
        <circle cx="12" cy="12" r="10" className="stroke-grey-200" strokeWidth="4" />
        <path
          d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
          className="stroke-primary"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default Spinner;
