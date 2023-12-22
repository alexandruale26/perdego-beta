import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "../shared/Spinner";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      <main className="w-full h-full py-10 px-4 bg-stone-100">{isLoading ? <Spinner /> : <Outlet />}</main>
      <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>
    </>
  );
};

export default AppLayout;
