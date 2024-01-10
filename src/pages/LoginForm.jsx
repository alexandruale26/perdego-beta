import { useEffect, useState } from "react";
import { Form } from "../formBase/FormContext";
import ValidationInput from "../formComponents/ValidationInput";
import { generateErrorMessage } from "../utils/helpers";
import { FormField, FormItem, FormLabel, FormMessage } from "../formComponents/form";
import SubmitButton from "../shared/SubmitButton";
import LinkButton from "../shared/LinkButton";

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
    <Form
      {...formData}
      className="flex flex-col sm:flex-row w-full min-h-screen items-start justify-start md:justify-center bg-white"
    >
      <div name="hero" className="w-full p-6 pb-10 gap-4 flex flex-col items-start justify-between bg-black">
        <h1 className="text-4xl select-none text-emerald-400">&lt;&gt; perdego</h1>

        <div className="gap-2 xlg:gap-4 text-lg xlg:text-xl flex flex-col font-light text-white max-w-[510px]">
          <h2 className="text-xl xlg:text-2xl font-medium">
            Bun venit în comunitatea{" "}
            <span className="text-2xl xlg:text-3xl font-normal text-emerald-400 whitespace-pre select-none">
              {" "}
              &lt;&gt; perdego
            </span>
          </h2>
          Prin platforma noastrǎ îți oferim oportunitatea de a-ți recupera obiectele pierdute sau de a ajuta alți
          utilizatori să-și găsească bunurile
        </div>
      </div>

      <div name="form" className="w-1/2 h-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm space-y-8 p-4">
          <h3 className="text-2xl font-medium text-start">Acceseazǎ contul tǎu</h3>
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
      </div>
    </Form>
  );
};

export default LoginForm;
