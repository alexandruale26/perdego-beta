import { useNavigate } from "react-router-dom";
import PageContainer from "../shared/PageContainer";
import Button from "../shared/button";
import { useUserSessionContext } from "../ui/UserSession";
import { deleteUserAccount } from "../services/userApi";

const UserAccountDashboard = () => {
  const { user } = useUserSessionContext();
  const navigate = useNavigate();

  const handleAccountDeletion = () => {
    const process = async () => {
      const response = await deleteUserAccount(user.id);

      // navigate("/", { replace: true });

      // if (response.status !== "ok") {
      //   closeMenuAndModal();
      //   return errorToast(response.message);
      // }

      // window.location.reload();
    };

    process();
  };

  return (
    <PageContainer>
      <div className="w-full max-w-4xl h-full mx-auto text-center space-y-8 xs:space-y-10">
        <Button onClick={handleAccountDeletion} className="bg-rose-500 text-white p-4 rounded-md">
          Sterge cont
        </Button>
      </div>
    </PageContainer>
  );
};

export default UserAccountDashboard;
