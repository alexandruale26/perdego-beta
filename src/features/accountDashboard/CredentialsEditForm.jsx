import { useState } from "react";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../formComponents/form";
import ValidationInput from "../../formComponents/ValidationInput";
import SubmitButton from "../../shared/SubmitButton";
import { schema, lengths } from "../account/createAccountData";
import ConfirmationBox from "../../shared/ConfirmationBox";

const CredentialsEditForm = ({ email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };

  const handleOnSubmit = (values) => {
    console.log(values);
    setModalIsOpen(!modalIsOpen);
    // setIsLoading(true);
  };

  const handleDeletePost = () => {
    const process = async () => {
      console.log("Profile modified");
      setModalIsOpen(!modalIsOpen);

      // const postResponse = await deletePost(post.id);

      // if (postResponse.status !== "ok") {
      //   closeMenuAndModal();
      //   return errorToast(postResponse.message);
      // }

      // window.location.reload();
    };

    process();
  };

  const defaultValues = { email };
  const formData = { schema, defaultValues };

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-5">
      <FormField
        name="email"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>E-mail</FormLabel>
            <ValidationInput placeholder="nume@exemplu.com" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="passwordNew"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>Parola actualǎ</FormLabel>
            <ValidationInput type="password" {...field} maxLength={lengths.password.max} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="password"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>Parola nouǎ</FormLabel>
            <ValidationInput type="password" {...field} maxLength={lengths.password.max} />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full pt-6">
        <SubmitButton className="h-12 w-full">Salveazǎ datele</SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleDeletePost}>
          <div className="h-full min-h-[60px] xxs:min-h-[80px] flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base text-grey-800 text-center">
              Ești sigur cǎ dorești sǎ modifici datele tale de conectare?
            </p>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default CredentialsEditForm;
