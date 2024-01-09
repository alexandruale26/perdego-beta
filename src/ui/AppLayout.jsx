import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";
import ScrollToTop from "../shared/ScrollToTop";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const bgColor = "[rgb(242_242_242)]";

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className={`w-full h-full py-10 px-4 bg-${bgColor}`}>
        {isLoading ? <Spinner className="min-h-screen" /> : <Outlet />}
      </main>
      <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>
    </>
  );
};

export default AppLayout;
