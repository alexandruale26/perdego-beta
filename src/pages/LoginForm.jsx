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

const styles = {
  hero: {
    large: {
      parentDiv: "w-1/2 h-full min-h-screen py-10 px-6 xlg:px-10",
      heroTitle: "text-4xl xlg:text-5xl",
      childDiv: "gap-2 xlg:gap-4 text-lg xlg:text-xl mb-10",
    },
    small: {
      parentDiv: "",
      heroTitle: "",
      childDiv: "",
    },
  },
  form: {
    large: {
      parentDiv: "w-1/2 h-full min-h-screen",
    },
  },
};

const LoginForm = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      // Update the state with the current window width
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  return (
    <Form {...formData} className="flex w-full min-h-screen items-start justify-center bg-white">
      <LoginDiv className="bg-black">
        <div className="flex flex-col items-start justify-start w-full max-w-lg min-h-[450px] p-6">
          <h1>
            <Logo className="text-4xl lg:text-5xl" />
          </h1>
          <h3 className="text-lg lg:text-xl text-white font-light pt-10">
            <LeftArrow className="text-lg lg:text-xl" /> Recupereazǎ-ți obiectele pierdute sau ajutǎ pe alți utilizatori
            să-și găsească bunurile <RightArrow className="text-lg lg:text-xl" />
          </h3>
        </div>
      </LoginDiv>

      <LoginDiv>
        <div className="w-full min-h-[450px] max-w-lg space-y-10 p-6">
          <h3 className="text-2xl lg:text-3xl font-medium text-start">Acceseazǎ contul tǎu</h3>
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
