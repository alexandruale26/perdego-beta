import { Form } from "../formBase/FormContext";
import { generateErrorMessage } from "../utils/helpers";
import { FormField, FormItem, FormMessage, FormLabel } from "../formComponents/form";
import ValidationInput from "../formComponents/ValidationInput";
import SubmitButton from "../shared/SubmitButton";
import Hero from "../features/account/Hero";
import HalfWidthDiv from "../features/account/HalfWidthDiv";
import { randomColor } from "../features/account/helpers";

const lengths = {
  email: {
    min: 3,
    max: 25,
  },
  name: {
    min: 3,
    max: 25,
  },
};

const schema = {
  email: {
    minLength: {
      value: lengths.name.min,
      errorMessage: generateErrorMessage("Emailul", lengths.name.min),
    },
    maxLength: {
      value: lengths.name.max,
      errorMessage: generateErrorMessage("Emailul", null, lengths.name.max),
    },
    regex: {
      pattern: /^\s*\S.{1,}\S\s*$/,
      errorMessage: "Introdu un nume valid",
    },
  },
  name: {
    minLength: {
      value: lengths.name.min,
      errorMessage: generateErrorMessage("Numele", lengths.name.min),
    },
    maxLength: {
      value: lengths.name.max,
      errorMessage: generateErrorMessage("Numele", null, lengths.name.max),
    },
    regex: {
      pattern: /^\s*\S.{1,}\S\s*$/,
      errorMessage: "Introdu un nume valid",
    },
  },
  password: {
    // TODO: change name to password below
    minLength: {
      value: lengths.name.min,
      errorMessage: generateErrorMessage("Numele", lengths.name.min),
    },
    maxLength: {
      value: lengths.name.max,
      errorMessage: generateErrorMessage("Numele", null, lengths.name.max),
    },
    regex: {
      pattern:
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_+={[}\]|;:'",<.>/?\\`~])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_+={[}\]|;:'",<.>/?\\`~]+$/,
      errorMessage: "Introdu o parolǎ validǎ",
    },
  },
  phone: {
    regex: {
      pattern: /^07\d{8}$/,
      errorMessage: "Numǎrul nu este valid",
    },
  },
};

// TODO: maxpassword length must be shared
// TODO: curate email, random profile color

const formData = { schema, defaultValues: {} };
// notita min-h-0

const contentMaxHeight = "sm:min-h-[0px]";

const AccountForm = () => {
  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex w-full flex-col sm:flex-row min-h-screen items-start justify-start sm:justify-center gap-2 sm:gap-0 bg-white">
      <Hero className={contentMaxHeight} />

      <HalfWidthDiv>
        <div className={`space-y-8 sm:space-y-10 w-full max-w-lg p-6 ${contentMaxHeight}`}>
          <h3 className="text-[22px] xs:text-2xl lg:text-3xl font-medium text-start text-stone-800">
            Bun venit în comunitate
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
                  <FormLabel>Introdu o parolǎ sigurǎ</FormLabel>
                  <ValidationInput {...field} maxLength={30} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              render={(field) => (
                <FormItem className="max-w-full">
                  <FormLabel>Numele tǎu</FormLabel>
                  <ValidationInput {...field} />
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
              <SubmitButton className="h-10 w-full">Creeazǎ contul</SubmitButton>
            </div>
          </Form>
        </div>
      </HalfWidthDiv>
    </div>
  );
};

export default AccountForm;
