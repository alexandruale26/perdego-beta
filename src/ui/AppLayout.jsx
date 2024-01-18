import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";
import ScrollToTop from "../shared/ScrollToTop";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const bgColor = "bg-grey-100";
  const isUserLoggedIn = true;

  // TODO: calc navbar and footer heights programatically here. now they are hardcoded
  // TODO: disable nav and footer by seeing if user i logged out and by url path name
  // TODO: if user is logged and wants to login show message to logout, same if wants to create new account while logged in

  return (
    //TODO: !IMPORTANT the lines below are just to correctly test the design. Should be nodified. Everyone is allowed to acess the app. Don't show nav and footer only when creating account or logging in.

    <>
      {isUserLoggedIn === false && (
        <>
          <ScrollToTop />
          {/* JUST TO TEST LOGIN AND CREATE USER PAGES - so i deleted max-h */}
          <main className={`w-full h-full min-h-screen ${bgColor}`}>
            {isLoading ? <Spinner className="min-h-[calc(100vh-150px)]" /> : <Outlet />}
          </main>
        </>
      )}

      {isUserLoggedIn && (
        <>
          <Navbar />
          <ScrollToTop />
          <main className={`w-full h-full ${"min-h-[calc(100vh-150px)]"} ${bgColor}`}>
            {isLoading ? <Spinner className="min-h-[calc(100vh-150px)]" /> : <Outlet />}
          </main>
          <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>
        </>
      )}
      <Toaster gutter={20} toastOptions={{ duration: 5000, style: { borderRadius: "6px" } }} />
    </>
  );
};

export default AppLayout;
