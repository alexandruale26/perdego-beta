import { useState, useEffect, useRef } from "react";
import { Form } from "../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ValidationInput from "../formComponents/ValidationInput";
import SubmitButton from "../shared/SubmitButton";
import Hero from "../features/account/Hero";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import AccountPageContainer from "../features/account/AccountPageContainer";
import FormTitle from "../features/account/FormTitle";
import FormContainer from "../features/account/FormContainer";
import Spinner from "../shared/Spinner";
import Confirmation from "../shared/Confirmation";
import { schema, lengths } from "../features/account/createAccountData";
import ComboBox from "../formComponents/ComboBox";
import { COUNTIES } from "../utils/sharedData";
import { filterData } from "../utils/helpers";
import signupFormProcess from "../features/account/signupFormProcess";

const defaultValues = {};
const formData = { schema, defaultValues };
const smSize = 640; // from tailwindcss sizes

const SignupForm = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [formTopMargin, setFormTopMargin] = useState(0);
  const formContainerRef = useRef(null);

  // all below are necessary for ComboBox to correctly work
  // if ComboBox parent is forced to be screen centered, the error label will slightly push
  // the form above and the click will not be registered, resulting in showing error label
  // dynamic top margin and items-start will do the trick <HalfWidthDiv className="bg-white sm:items-start">

  useEffect(() => {
    const handleResize = () => {
      const formContainer = document.getElementById("page-container");

      if (formContainer && formContainerRef) {
        const { height, width } = formContainer.getBoundingClientRect();
        const formHeight = formContainerRef.current.getBoundingClientRect().height;

        setPageWidth(width);
        setFormTopMargin((height - formHeight) / 2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOnSubmit = (values) => {
    setIsLoading(true);
    signupFormProcess(values, setIsLoading, setIsAccountCreated);
  };

  const topMargin = pageWidth >= smSize ? formTopMargin : 0;

  return (
    <AccountPageContainer>
      {isLoading && (
        <Spinner className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-[4px]" />
      )}

      <Hero />

      <HalfWidthDiv className="bg-white sm:items-start">
        <FormContainer ref={formContainerRef} style={{ marginTop: topMargin }}>
          {isAccountCreated && (
            <Confirmation
              message="Felicitǎri! Contul tǎu a fost creat cu succes."
              buttonTitle="Du-mǎ pe pagina principalǎ"
              className="py-10 sm:py-0"
            />
          )}

          {isAccountCreated === false && (
            <>
              <FormTitle>Bun venit în comunitate</FormTitle>
              <Form {...formData} onSubmit={handleOnSubmit} className="w-full space-y-5">
                <FormField
                  name="email"
                  render={(field) => (
                    <FormItem className="max-w-full">
                      <FormLabel>Adresa ta de e-mail</FormLabel>
                      <ValidationInput placeholder="nume@exemplu.com" className="lowercase" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={(field) => (
                    <FormItem className="max-w-full">
                      <FormLabel>Introdu o parolǎ sigurǎ</FormLabel>
                      <ValidationInput type="password" {...field} maxLength={lengths.password.max} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="name"
                  render={(field) => (
                    <FormItem className="max-w-full">
                      <FormLabel>Numele tǎu</FormLabel>
                      <ValidationInput className="capitalize" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="location"
                  render={(field) => (
                    <FormItem className="max-w-full">
                      <FormLabel>Locația ta</FormLabel>
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
                  <SubmitButton className="h-12 w-full">Creeazǎ contul</SubmitButton>
                </div>
              </Form>
            </>
          )}
        </FormContainer>
      </HalfWidthDiv>
    </AccountPageContainer>
  );
};

export default SignupForm;
