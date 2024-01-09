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

const LoginForm = () => {
  return (
    <Form {...formData} className="flex w-full min-h-screen items-start justify-center bg-white">
      <div className="w-1/2 h-full min-h-screen flex flex-col items-start justify-between p-10 bg-black">
        <h1 className="text-5xl select-none text-emerald-400">&lt;&gt; perdego</h1>

        <div className="flex flex-col gap-4 text-white font-light text-xl mb-10 max-w-[510px]">
          <h2 className="text-2xl font-medium">
            Bun venit în comunitatea{" "}
            <span className="text-3xl font-normal text-emerald-400 whitespace-pre select-none"> &lt;&gt; perdego</span>
          </h2>
          Prin platforma noastrǎ îți oferim oportunitatea de a-ți recupera obiectele pierdute sau de a ajuta alți
          utilizatori să-și găsească bunurile
        </div>
      </div>

      <div className="w-1/2 h-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm space-y-8">
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
              {/* <LinkButton className="w-full max-w-max mr-auto text-xl border-b-2 border-transparent focus-visible:border-emerald-400 hover:border-emerald-400">
                Devino membru &nbsp;&nbsp;<span className="select-none text-emerald-400">&lt;&gt; perdego</span>
              </LinkButton> */}

              <LinkButton className="h-10 w-full border border-black rounded-md">
                Devino membru &nbsp;&nbsp;<span className="select-none text-emerald-400">&lt;&gt; perdego</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
