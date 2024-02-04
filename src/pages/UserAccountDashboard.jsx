import { useNavigate } from "react-router-dom";
import PageContainer from "../shared/PageContainer";
import Separator from "../formComponents/Separator";
import Button from "../shared/button";
import UserProfile from "../shared/UserProfile";
import Section from "../shared/Section";
import { useUserSessionContext } from "../ui/UserSession";
import { deleteUserAccount } from "../services/userApi";
import ProfileEditForm from "../features/accountDashboard/ProfileEditForm";
import CredentialsEditForm from "../features/accountDashboard/CredentialsEditForm";

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
  // console.log(user);

  const profile = { name: user.name, location: user.location, phone: user.phone };

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-2xl h-full mx-auto space-y-6">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-start text-xl xs:text-2xl font-medium">Contul tǎu</h1>
          <div className="w-full flex flex-col items-start justify-center gap-6">
            <Section className="flex flex-col items-start justify-center">
              <h3 className="text-lg font-medium text-grey-900">Profilul tǎu</h3>
              <Separator />
              <div className="w-full  flex flex-col gap-6">
                <p className="text-sm text-grey-700">Modificǎ informațiile de bazǎ</p>
                <ProfileEditForm profile={profile} />
              </div>
            </Section>

            <Section className="flex flex-col items-start justify-center">
              <h3 className="text-lg">Date de conectare</h3>
              <Separator />
              <div className="w-full  flex flex-col gap-6">
                <p className="text-sm text-grey-700">Modificǎ informațiile de conectare</p>
                <CredentialsEditForm profile={profile} />
              </div>
            </Section>

            <Section className="flex flex-col items-start justify-center">
              <h3 className="text-lg">Șterge contul</h3>
              <Separator />
              <div className="w-full flex flex-col gap-6">
                <p className="text-sm text-grey-700">Datele și postǎrile tale vor fi șterse definitiv</p>
                <Button
                  onClick={handleAccountDeletion}
                  className="w-full h-12 flex items-center justify-center mt-4 bg-rose-600 hover:bg-rose-500 text-white rounded-md focus-visible:text-lg"
                >
                  Șterge contul
                </Button>{" "}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserAccountDashboard;
