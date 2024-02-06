import { useState } from "react";
import { Form } from "../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../formComponents/form";
import ValidationInput from "../../formComponents/ValidationInput";
import SubmitButton from "../../shared/SubmitButton";
import { schema } from "../account/createAccountData";
import ComboBox from "../../formComponents/ComboBox";
import { COUNTIES } from "../../utils/sharedData";
import { filterData } from "../../utils/helpers";
import ConfirmationBox from "../../shared/ConfirmationBox";

const ProfileEditForm = ({ profile }) => {
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

  const handleModifyProfile = () => {
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

  const defaultValues = { ...profile };
  const formData = { schema, defaultValues };

  return (
    <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-5">
      <FormField
        name="name"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>Nume</FormLabel>
            <ValidationInput {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="location"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>Locație</FormLabel>
            <ComboBox
              placeholder="Cautǎ dupǎ județ sau sector"
              defaultValue={defaultValues.location}
              filter={filterData}
              data={COUNTIES}
              render={(item) => <p className="text-left">{item}</p>}
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="phone"
        render={(field) => (
          <FormItem className="max-w-full">
            <FormLabel>Telefon</FormLabel>
            <ValidationInput placeholder="07xxxxxxxx" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="w-full pt-6">
        <SubmitButton className="h-12 w-full">Modificǎ profilul</SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleModifyProfile}>
          <div className="h-full min-h-[60px] xxs:min-h-[80px] flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base text-grey-800 text-center">
              Ești sigur cǎ dorești sǎ modifici datele profilulului tǎu?
            </p>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default ProfileEditForm;
