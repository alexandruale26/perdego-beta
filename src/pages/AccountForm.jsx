import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ValidationInput from "../formComponents/ValidationInput";
import SubmitButton from "../shared/SubmitButton";
import Hero from "../features/account/Hero";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import AccountPageContainer from "../features/account/AccountPageContainer";
import FormTitle from "../features/account/FormTitle";
import FormContainer from "../features/account/FormContainer";
import { schema, lengths } from "../features/account/accountFormData";
import { randomBgColor } from "../features/account/helpers";

// TODO: curate email, random profile color

const defaultValues = {};
const formData = { schema, defaultValues };

const AccountForm = () => {
  const handleOnSubmit = (values) => {
    console.log(values);
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
