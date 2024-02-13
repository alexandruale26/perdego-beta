import { useState } from "react";
import PageContainer from "../shared/PageContainer";
import Button from "../shared/button";
import { useUserSessionContext } from "../ui/UserSession";
import { deleteUserAccount, logoutUser } from "../services/userApi";
import ProfileEditForm from "../features/accountDashboard/ProfileEditForm";
import PasswordEditForm from "../features/accountDashboard/PasswordEditForm";
import DashboardSection from "../features/accountDashboard/DashboardSection";
import EmailEditForm from "../features/accountDashboard/EmailEditForm";
import Info from "../shared/Info";
import toastNotification from "../shared/Toasts";
import ConfirmationBox from "../shared/ConfirmationBox";
import Spinner from "../shared/Spinner";
import { handleApiAction } from "../services/apiHelpers/helpers";

const UserDashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, changeUserProfile } = useUserSessionContext();

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  const handleAccountDeletion = () => {
    const process = async () => {
      setModalIsOpen(false);
      setIsLoading(true);

      const deleteResponse = await deleteUserAccount(user.id);
      if (deleteResponse.status !== "ok") {
        setIsLoading(false);
        return toastNotification(deleteResponse.message);
      }

      const logoutResponse = await logoutUser(true);
      if (logoutResponse.status !== "ok") {
        setIsLoading(false);
        return toastNotification(logoutResponse.message);
      }

      setIsLoading(false);
    };
    handleApiAction(process, () => setModalIsOpen(false));
  };

  const profile = { name: user.name, location: user.location, phone: user.phone, id: user.id };

  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-2xl font-medium text-grey-800 leading-none">Contul tǎu</h1>
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

            <DashboardSection title="Eliminǎ contul" titleStyle="text-rose-500">
              <Button
                aria-label="delete account"
                onClick={handleModal}
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center bg-grey-800 hover:bg-rose-500 text-white rounded-md focus-visible:text-lg disabled:hover:bg-grey-800"
              >
                {isLoading ? <Spinner fullHeight={false} className="w-9 h-9" /> : <span>Șterge contul</span>}
              </Button>
            </DashboardSection>
          </div>
        </div>
        {modalIsOpen && (
          <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleAccountDeletion}>
            <div className="w-full h-full min-h-[50px] flex flex-col items-center justify-between gap-8">
              <p className="px-0 text-sm xxs:text-base font-light text-grey-700 text-center">
                Ești sigur cǎ dorești sǎ ștergi contul?
              </p>
              <span className="text-xs text-grey-500 font-light mr-auto">
                Contul si anunțurile tale vor fi șterse definitiv
              </span>
            </div>
          </ConfirmationBox>
        )}
      </div>
    </PageContainer>
  );
};

export default UserDashboard;
