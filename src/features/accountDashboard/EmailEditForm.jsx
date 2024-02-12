import { useState } from "react";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage } from "../../formComponents/form";
import ValidationInput from "../../formComponents/ValidationInput";
import SubmitButton from "../../shared/SubmitButton";
import { schema } from "../userFormData";
import ConfirmationBox from "../../shared/ConfirmationBox";
import Spinner from "../../shared/Spinner";
import { updateEmail } from "../../services/userApi";
import toastNotification from "../../shared/Toasts";
import Info from "../../shared/Info";
import { NEW_EMAIL_ERROR_MESSAGE } from "../../services/apiHelpers/apiErrorMessages";
import { handleApiAction } from "../../services/apiHelpers/helpers";

const toConfirmMessage = "Confirmǎ modificǎrile pe noua adresǎ de e-mail";

const EmailEditForm = ({ email }) => {
  const [newEmail, setNewEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOnSubmit = (values) => {
    const curatedEmail = values.email.toLowerCase();
    if (email === curatedEmail) return toastNotification(NEW_EMAIL_ERROR_MESSAGE);

    setModalIsOpen(true);
    setNewEmail(curatedEmail);
  };

  const handleEmailUpdate = () => {
    const process = async () => {
      setModalIsOpen(false);
      setIsLoading(true);

      const response = await updateEmail(newEmail);

      if (response.status !== "ok") {
        setIsEmailConfirmed(true);
        toastNotification(response.message);
      } else {
        setIsEmailConfirmed(false);
        toastNotification(response.message, true);
      }

      setIsLoading(false);
    };

    handleApiAction(process, closeModal);
  };

  const defaultValues = { email };
  const formData = { schema, defaultValues };

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-3">
      {isEmailConfirmed === false && (
        <Info iconStyle="w-4 h-4" className="justify-start text-start text-xs text-grey-600 font-light">
          {toConfirmMessage}
        </Info>
      )}
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
        <SubmitButton
          aria-label="submit email change"
          className="h-12 w-full overflow-hidden bg-grey-800"
          disabled={isLoading}
        >
          {isLoading ? <Spinner fullHeight={false} className="w-9 h-9" /> : <span>Modificǎ e-mailul</span>}
        </SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={closeModal} handleOnConfirm={handleEmailUpdate}>
          <div className="h-full min-h-[50px] flex flex-col items-start justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base font-light text-grey-700 text-center">
              Ești sigur cǎ dorești sǎ schimbi actuala adresǎ de e-mail{" "}
              <span className="text-grey-700 font-semibold">{email}</span>?
            </p>
            <Info iconStyle="w-4 h-4" className="justify-start gap-1 text-start text-xs text-grey-600 font-light">
              {toConfirmMessage}
            </Info>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default EmailEditForm;
