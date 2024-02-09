import { useNavigate } from "react-router-dom";
import PageContainer from "../shared/PageContainer";
import Button from "../shared/button";
import { useUserSessionContext } from "../ui/UserSession";
import { deleteUserAccount } from "../services/userApi";
import ProfileEditForm from "../features/accountDashboard/ProfileEditForm";
import PasswordEditForm from "../features/accountDashboard/PasswordEditForm";
import DashboardSection from "../features/accountDashboard/DashboardSection";
import EmailEditForm from "../features/accountDashboard/EmailEditForm";
import Info from "../shared/Info";

const UserAccountDashboard = () => {
  const { user, changeUserProfile } = useUserSessionContext();
  const navigate = useNavigate();

  const handleAccountDeletion = () => {
    const process = async () => {
      console.log("user deleted");
      // const response = await deleteUserAccount(user.id);

      // navigate("/", { replace: true });

      // if (response.status !== "ok") {
      //   closeMenuAndModal();
      //   return errorToast(response.message);
      // }

      // window.location.reload();
    };

    process();
  };
  // console.log(user);

  const profile = { name: user.name, location: user.location, phone: user.phone, id: user.id };

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-2xl font-medium text-grey-800">Contul tǎu</h1>
          <Info>
            <p className="text-start text-sm xs:text-base text-grey-600 font-light">Modificǎ informațiile contului</p>
          </Info>
          <div className="w-full flex flex-col items-start justify-center gap-8">
            <DashboardSection title="Profilul meu">
              <ProfileEditForm profile={profile} changeUserProfile={changeUserProfile} />
            </DashboardSection>

            <DashboardSection title="Adresa de e-mail">
              <EmailEditForm email={user.email} />
            </DashboardSection>

            <DashboardSection title="Parolǎ nouǎ">
              <PasswordEditForm />
            </DashboardSection>

            <DashboardSection title="Eliminǎ contul">
              <Button
                onClick={handleAccountDeletion}
                className="w-full h-12 flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white rounded-md focus-visible:text-lg"
              >
                Șterge contul
              </Button>
            </DashboardSection>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserAccountDashboard;
