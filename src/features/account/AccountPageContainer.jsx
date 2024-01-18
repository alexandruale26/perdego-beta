import { twMerge } from "tailwind-merge";

const AccountPageContainer = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "flex h-full w-full min-h-screen flex-col py-10 px-4 sm:flex-row items-start justify-start sm:justify-center gap-2 sm:gap-0 p-0 bg-white sm:bg-black",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AccountPageContainer;
