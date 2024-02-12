import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HalfWidthDiv from "../features/account/shared/HalfWidthDiv";
import Hero from "../features/account/Hero";
import AccountPageContainer from "../features/account/shared/AccountPageContainer";
import FormTitle from "../features/account/shared/FormTitle";
import FormContainer from "../features/account/shared/FormContainer";
import Spinner from "../shared/Spinner";
import { loginUser } from "../services/userApi";
import toastNotification from "../shared/Toasts";
import { handleApiAction } from "../services/apiHelpers/helpers";
import LoginFormContent from "../features/account/loginForm/LoginFormContent";

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
          <LoginFormContent handleOnSubmit={handleOnSubmit} />
        </FormContainer>
      </HalfWidthDiv>
    </AccountPageContainer>
  );
};

export default LoginForm;
