import { useState, useEffect, useRef } from "react";
import Hero from "../features/account/Hero";
import HalfWidthDiv from "../features/account/shared/HalfWidthDiv";
import AccountPageContainer from "../features/account/shared/AccountPageContainer";
import FormTitle from "../features/account/shared/FormTitle";
import FormContainer from "../features/account/shared/FormContainer";
import Spinner from "../shared/Spinner";
import Confirmation from "../shared/Confirmation";
import signupFormProcess from "../features/account/signupForm/signupFormProcess";
import { handleApiAction } from "../services/apiHelpers/helpers";
import SignupFormContent from "../features/account/signupForm/signupFormContent";

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
    handleApiAction(() => signupFormProcess(values, setIsLoading, setIsAccountCreated));
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
              message="Contul tǎu a fost creat cu succes."
              buttonTitle="Du-mǎ pe pagina principalǎ"
              className="py-10 sm:py-0"
            />
          )}

          {isAccountCreated === false && (
            <>
              <FormTitle>Bun venit în comunitate</FormTitle>
              <SignupFormContent handleOnSubmit={handleOnSubmit} />
            </>
          )}
        </FormContainer>
      </HalfWidthDiv>
    </AccountPageContainer>
  );
};

export default SignupForm;
