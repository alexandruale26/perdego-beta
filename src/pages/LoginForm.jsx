import { useEffect, useState } from "react";
import { Form } from "../formBase/FormContext";
import ValidationInput from "../formComponents/ValidationInput";
import { generateErrorMessage } from "../utils/helpers";
import { FormField, FormItem, FormLabel, FormMessage } from "../formComponents/form";
import SubmitButton from "../shared/SubmitButton";
import LinkButton from "../shared/LinkButton";
import LoginDiv from "../features/loginForm/LoginDiv";
import { LeftArrow, RightArrow } from "../shared/LogoArrows";
import Logo from "../shared/Logo";

const lengths = {
  email: {
    min: 3,
    max: 25,
  },
  password: {
    min: 3,
    max: 25,
  },
};

const schema = {
  email: {
    minLength: {
      value: lengths.email.min,
      errorMessage: generateErrorMessage("E-mailul", lengths.email.min),
    },
    maxLength: {
      value: lengths.email.max,
      errorMessage: generateErrorMessage("E-mailul", null, lengths.email.max),
    },
    regex: {
      pattern: /^\s*\S.{1,}\S\s*$/,
      errorMessage: "Introdu un nume valid",
    },
  },
  password: {
    minLength: {
      value: lengths.password.min,
      errorMessage: generateErrorMessage("Parola", lengths.password.min),
    },
    maxLength: {
      value: lengths.password.max,
      errorMessage: generateErrorMessage("Parola", null, lengths.password.max),
    },
    // regex: {
    //   pattern: /^\s*\S.{1,}\S\s*$/,
    //   errorMessage: "Introdu un nume valid",
    // },
  },
};

const formData = {
  schema,
  defaultValues: {},
};

//TODO: password visibility feature

const LoginForm = () => {
  return (
    <Form
      {...formData}
      className="flex w-full flex-col sm:flex-row min-h-screen items-start justify-start sm:justify-center gap-2 sm:gap-0 bg-white"
    >
      <LoginDiv className="bg-black min-h-0">
        <div className="flex flex-col items-start justify-start w-full max-w-lg sm:min-h-[450px] p-6">
          <h1>
            <Logo className="text-3xl xs:text-4xl lg:text-5xl" />
          </h1>
          <h3 className="xs:text-lg lg:text-xl text-white font-light py-6 xs:py-10">
            <LeftArrow className="text-lg lg:text-xl" /> Recupereazǎ-ți obiectele pierdute sau ajutǎ pe alți utilizatori
            să-și găsească bunurile <RightArrow className="text-lg lg:text-xl" />
          </h3>
        </div>
      </LoginDiv>

      <LoginDiv className="min-h-0">
        <div className="space-y-8 sm:space-y-10 w-full max-w-lg sm:min-h-[450px] p-6">
          <h3 className="text-[22px] xs:text-2xl lg:text-3xl font-medium text-start">Acceseazǎ contul tǎu</h3>
          <div className="w-full space-y-4">
            <FormField
              name="email"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Adresa ta de e-mail</FormLabel>
                  <ValidationInput placeholder="nume@exemplu.com" {...field} maxLength={60} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Parola</FormLabel>
                  <ValidationInput placeholder="**********" {...field} maxLength={60} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full pt-4 space-y-4">
              <SubmitButton className="h-10 w-full">Conecteazǎ-te</SubmitButton>
              <LinkButton className="h-10 w-full border border-black rounded-md focus-visible:text-lg hover:scale-105 transition-transform">
                Creeazǎ cont
              </LinkButton>
            </div>
          </div>
        </div>
      </LoginDiv>
    </Form>
  );
};

export default LoginForm;

/*        
  <div className="w-full flex flex-wrap">
    <h2 className="text-2xl font-medium whitespace-pre">Bun venit în comunitatea </h2>
      <Logo className="text-3xl" />
  </div> 
*/
