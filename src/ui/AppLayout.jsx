import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";
import ScrollToTop from "../shared/ScrollToTop";
import { BARS_HEIGHT } from "../utils/sharedData";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  const isOnLoginOrCreate = pathname.includes("/account/login") || pathname.includes("/account/create");
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isOnLoginOrCreate && (
        <>
          <ScrollToTop />
          <main className={`w-full h-full min-h-screen`}>{isLoading ? <Spinner /> : <Outlet />}</main>
        </>
      )}

      {isOnLoginOrCreate === false && (
        <>
          <Navbar />
          <ScrollToTop />
          <main
            style={{ minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }}
            className={`w-full h-full bg-grey-100`}
          >
            {isLoading ? <Spinner /> : <Outlet />}
          </main>
          <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>
        </>
      )}
      <Toaster gutter={20} toastOptions={{ duration: 5000, style: { borderRadius: "6px" } }} />
    </>
  );
};

export default AppLayout;
