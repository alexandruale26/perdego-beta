import { Form } from "../formBase/FormContext";
import ValidationInput from "../formComponents/ValidationInput";
import { FormField, FormItem, FormLabel, FormMessage } from "../formComponents/form";
import SubmitButton from "../shared/SubmitButton";
import LinkButton from "../shared/LinkButton";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import Hero from "../features/account/Hero";
import AccountPageContainer from "../features/account/AccountPageContainer";
import FormTitle from "../features/account/FormTitle";
import FormContainer from "../features/account/FormContainer";
import { schema, defaultValues, lengths } from "../features/account/loginFormData";

const formData = {
  schema,
  defaultValues,
};

//TODO: curated and lowercase password for database
//TODO: implement logic for login to supa

const LoginForm = () => {
  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <AccountPageContainer>
      <Hero />

      <HalfWidthDiv className="bg-white">
        <FormContainer>
          <FormTitle>Acceseazǎ contul tǎu</FormTitle>
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
                  <FormLabel>Parola</FormLabel>
                  <ValidationInput type="password" {...field} maxLength={lengths.password.max} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full pt-6 space-y-4">
              <SubmitButton className="h-12 w-full">Conecteazǎ-te</SubmitButton>
              <LinkButton className="h-12 w-full border border-black rounded-md focus-visible:text-lg hover:scale-105 transition-transform">
                Creeazǎ cont
              </LinkButton>
            </div>
          </Form>
        </FormContainer>
      </HalfWidthDiv>
    </AccountPageContainer>
  );
};

export default LoginForm;
