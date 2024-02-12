import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Spinner from "../shared/Spinner";
import { schema, lengths } from "../features/account/loginData";
import { loginUser } from "../services/userApi";
import toastNotification from "../shared/Toasts";
import { handleApiAction } from "../services/apiHelpers/helpers";

const defaultValues = {};
const formData = {
  schema,
  defaultValues,
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    const process = async () => {
      setIsLoading(true);
      const curatedValues = { ...values, email: values.email.toLowerCase() };
      const response = await loginUser(curatedValues);

      if (response.status !== "ok") {
        setIsLoading(false);
        return toastNotification(response.message);
      }

      navigate("/");
    };

    handleApiAction(process);
  };

  return (
    <AccountPageContainer>
      {isLoading && (
        <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
      )}

      <Hero />

      <HalfWidthDiv className="bg-white">
        <FormContainer>
          <FormTitle>Acceseazǎ contul tǎu</FormTitle>
          <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-5">
            <FormField
              name="email"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>E-mail</FormLabel>
                  <ValidationInput className="lowercase" {...field} />
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
              <SubmitButton aria-label="submit login values" className="h-12 w-full">
                Conecteazǎ-te
              </SubmitButton>
              <LinkButton
                aria-label="redirect to signup"
                to="/signup"
                className="h-12 w-full border border-black rounded-md focus-visible:text-lg hover:scale-105 transition-transform"
              >
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
