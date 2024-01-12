import { Form } from "../formBase/FormContext";
import ValidationInput from "../formComponents/ValidationInput";
import { FormField, FormItem, FormLabel, FormMessage } from "../formComponents/form";
import SubmitButton from "../shared/SubmitButton";
import LinkButton from "../shared/LinkButton";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import Hero from "../features/account/Hero";
import { schema, defaultValues, lengths } from "../features/account/loginFormData";

const formData = {
  schema,
  defaultValues,
};

//TODO: curated and lowercase password for databaase
//TODO: implement logic for login to supa

const LoginForm = () => {
  const handleOnSubmit = (values) => {
    console.log(values);
  };

  // notita min-h-0

  return (
    <div className="flex w-full flex-col sm:flex-row min-h-screen items-start justify-start sm:justify-center gap-2 sm:gap-0 bg-white">
      <Hero />

      <HalfWidthDiv>
        <div className="space-y-8 sm:space-y-10 w-full max-w-lg sm:min-h-[450px] p-6">
          <h3 className="text-[22px] xs:text-2xl lg:text-3xl font-medium text-start text-stone-800">
            Acceseazǎ contul tǎu
          </h3>
          <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-4">
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
              <SubmitButton className="h-10 w-full">Conecteazǎ-te</SubmitButton>
              <LinkButton className="h-10 w-full border border-black rounded-md focus-visible:text-lg hover:scale-105 transition-transform">
                Creeazǎ cont
              </LinkButton>
            </div>
          </Form>
        </div>
      </HalfWidthDiv>
    </div>
  );
};

export default LoginForm;
