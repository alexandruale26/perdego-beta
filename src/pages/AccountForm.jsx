import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ValidationInput from "../formComponents/ValidationInput";
import SubmitButton from "../shared/SubmitButton";
import Hero from "../features/account/Hero";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import AccountPageContainer from "../features/account/AccountPageContainer";
import FormTitle from "../features/account/FormTitle";
import FormContainer from "../features/account/FormContainer";
import { schema, lengths } from "../features/account/createAccountData";
import { randomAvatarColor } from "../features/account/helpers";
import { capitalizeEachWordFromString } from "../utils/helpers";
import { signUpUser, createProfile, deleteUserAtSignupError } from "../services/userApi";
import { warningToast } from "../shared/Toasts";

const defaultValues = {};
const formData = { schema, defaultValues };

const AccountForm = () => {
  const handleOnSubmit = (values) => {
    const process = async () => {
      const email = values.email.toLowerCase();
      const avatarColor = randomAvatarColor();
      const name = capitalizeEachWordFromString(values.name);

      const signUpResponse = await signUpUser({ email, password: values.password });

      if (signUpResponse.status !== "ok") return warningToast(signUpResponse.message);
      console.log(signUpResponse.data);

      const userId = signUpResponse.data;
      const newProfile = { name, email, avatarColor, id: userId, phone: values.phone };

      const profileResponse = await createProfile(newProfile);
      console.log(profileResponse);

      if (profileResponse.status !== "ok") {
        await deleteUserAtSignupError(userId); // no need to use response.status
        return warningToast(profileResponse.message);
      }
    };

    process();
  };

  return (
    <AccountPageContainer>
      <Hero />

      <HalfWidthDiv className="bg-white">
        <FormContainer>
          <FormTitle>Bun venit în comunitate</FormTitle>
          <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-5">
            <FormField
              name="email"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Adresa ta de e-mail</FormLabel>
                  <ValidationInput placeholder="nume@exemplu.com" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Introdu o parolǎ sigurǎ</FormLabel>
                  <ValidationInput {...field} maxLength={lengths.password.max} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Numele tǎu</FormLabel>
                  <ValidationInput {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="location"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Locația ta</FormLabel>
                  <ComboBox
                    placeholder="Cautǎ dupǎ județ sau sector"
                    filter={filterData}
                    data={COUNTIES}
                    render={(item) => <p className="text-left">{item}</p>}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
              <SubmitButton className="h-12 w-full">Creeazǎ contul</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </HalfWidthDiv>
    </AccountPageContainer>
  );
};

export default AccountForm;
