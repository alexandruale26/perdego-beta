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
import Spinner from "../../shared/Spinner";
import toastNotification from "../../shared/Toasts";
import { updateProfile } from "../../services/profileApi";
import { capitalizeEachWordFromString } from "../../utils/helpers";

const ProfileEditForm = ({ profile, changeUserProfile }) => {
  const [newProfile, setNewProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  const handleOnSubmit = (values) => {
    setModalIsOpen(true);

    // input has capitalize style, but the values can still have uppercase letters
    const name = capitalizeEachWordFromString(values.name);
    const curatedValues = { ...values, name };
    setNewProfile(curatedValues);
  };

  const handleProfileUpdate = () => {
    const process = async () => {
      setModalIsOpen(false);
      setIsLoading(true);

      const response = await updateProfile(profile.id, newProfile);

      if (response.status !== "ok") {
        toastNotification(response.message);
      } else {
        changeUserProfile(newProfile);
        toastNotification(response.message, true);
      }

      setIsLoading(false);
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
            <ValidationInput className="capitalize" {...field} />
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

      <div className="w-full pt-2">
        <SubmitButton className="h-12 w-full overflow-hidden bg-grey-800" disabled={isLoading}>
          {isLoading ? <Spinner fullHeight={false} className="w-9 h-9" /> : <span>Modificǎ profilul</span>}
        </SubmitButton>
      </div>

      {modalIsOpen && (
        <ConfirmationBox handleOnDeny={handleModal} handleOnConfirm={handleProfileUpdate}>
          <div className="h-full min-h-[60px] xxs:min-h-[80px] flex flex-col items-center justify-between gap-8">
            <p className="px-0 text-sm xxs:text-base text-grey-800 text-center">
              Ești sigur cǎ dorești sǎ modifici datele profilulului?
            </p>
          </div>
        </ConfirmationBox>
      )}
    </Form>
  );
};

export default ProfileEditForm;
