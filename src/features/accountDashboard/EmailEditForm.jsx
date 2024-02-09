import { useState } from "react";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../formComponents/form";
import ValidationInput from "../../formComponents/ValidationInput";
import SubmitButton from "../../shared/SubmitButton";
import { schema } from "../account/createAccountData";
import ConfirmationBox from "../../shared/ConfirmationBox";
import Spinner from "../../shared/Spinner";
import { updateEmail } from "../../services/userApi";
import toastNotification from "../../shared/Toasts";

const EmailEditForm = ({ email }) => {
  const [newEmail, setNewEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  const handleOnSubmit = (values) => {
    const curatedEmail = values.email.toLowerCase();
    if (email === curatedEmail) return toastNotification("Introdu o nouǎ adresǎ de e-mail.");

    setModalIsOpen(true);
    setNewEmail(curatedEmail);
  };

  const handleEmailUpdate = () => {
    const process = async () => {
      setModalIsOpen(false);
      setIsLoading(true);

      const response = await updateEmail(newEmail);

      if (response.status !== "ok") {
        toastNotification(response.message);
      } else {
        toastNotification(response.message, true);
      }

      setIsLoading(false);
    };

    process();
  };

  const defaultValues = { email };
  const formData = { schema, defaultValues };

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="w-full">
      <FormField
        name="email"
        render={(field) => (
          <FormItem className="max-w-full">
            <ValidationInput placeholder="nume@exemplu.com" className="lowercase" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full pt-6">
        <SubmitButton className="h-12 w-full overflow-hidden bg-grey-800" disabled={isLoading}>
          {isLoading ? <Spinner fullHeight={false} className="w-9 h-9" /> : <span>Salveazǎ e-mailul</span>}
        </SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleEmailUpdate}>
          <div className="h-full min-h-[50px] flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base text-grey-800 text-center">
              Ești sigur cǎ dorești sǎ modifici e-mailul?
            </p>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default EmailEditForm;
