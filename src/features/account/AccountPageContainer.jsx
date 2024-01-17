import { twMerge } from "tailwind-merge";
import PageContainer from "../../shared/PageContainer";

const AccountPageContainer = ({ className, children }) => {
  return (
    <PageContainer
      className={twMerge(
        "flex h-full min-h-screen flex-col sm:flex-row items-start justify-start sm:justify-center gap-2 sm:gap-0 p-0 bg-black",
        className
      )}
    >
      {children}
    </PageContainer>
  );
};

export default AccountPageContainer;
