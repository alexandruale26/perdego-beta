import { twMerge } from "tailwind-merge";

const PageContainer = ({ className, children }) => {
  return <div className={twMerge("w-full h-full py-10 px-4 bg-white", className)}>{children}</div>;
};

export default PageContainer;
