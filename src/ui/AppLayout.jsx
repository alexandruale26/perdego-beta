import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full h-full py-10 px-4 bg-stone-100">
        <Outlet />
      </main>
      <div className="w-full bg-black h-[80px] text-white text-center">Footer</div>
    </>
  );
};

export default AppLayout;
