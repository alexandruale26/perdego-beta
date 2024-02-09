import { useEffect } from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toastNotification from "../shared/Toasts";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";
import { NO_INTERNET_ERROR_MESSAGE } from "../services/apiHelpers/apiErrorMessages";
import { BARS_HEIGHT } from "../utils/sharedData";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    const handleOffline = () => {
      toastNotification(NO_INTERNET_ERROR_MESSAGE);
    };

    window.addEventListener("offline", handleOffline);

    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  const isOnLoginOrCreate = pathname.includes("/login") || pathname.includes("/signup");
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isOnLoginOrCreate && (
        <main className={`w-full h-full min-h-screen`}>{isLoading ? <Spinner /> : <Outlet />}</main>
      )}

      {isOnLoginOrCreate === false && (
        <>
          <Navbar />
          <main
            style={{ minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }}
            className={`w-full h-full bg-grey-100`}
          >
            {isLoading ? <Spinner /> : <Outlet />}
          </main>
          <footer className="w-full bg-black h-[80px] text-white text-center">Footer</footer>
        </>
      )}
      <Toaster gutter={10} toastOptions={{ duration: 5000, style: { borderRadius: "6px", marginBottom: 10 } }} />
    </>
  );
};

export default AppLayout;
