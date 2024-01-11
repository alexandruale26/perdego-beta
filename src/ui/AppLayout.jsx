import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";
import ScrollToTop from "../shared/ScrollToTop";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const bgColor = "bg-[rgb(242_242_242)]";
  const isUserLoggedIn = false;

  // TODO: calc navbar and footer heights programatically here. now they are hardcoded
  // TODO: disable

  return (
    <>
      {isUserLoggedIn && <Navbar />}
      <ScrollToTop />
      {/* <main className={`w-full py-10 px-4 ${"min-h-[calc(100vh-160px)]"} bg-${bgColor}`}> */}
      {/* JUST TO TEST LOGIN AND CREATE USER PAGES - so i deleted max-h */}
      <main className={`w-full h-full ${!isUserLoggedIn ? "" : "py-10 px-4"} min-h-screen ${bgColor}`}>
        {isLoading ? <Spinner className="min-h-[calc(100vh-160px)]" /> : <Outlet />}
      </main>
      {isUserLoggedIn && <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>}
    </>
  );
};

export default AppLayout;
