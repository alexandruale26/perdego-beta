import { Form } from "../../../formBase/FormContext";
import { generateErrorMessage } from "../../../utils/helpers";
import { FormField, FormItem, FormMessage, FormLabel } from "../../../formComponents/form";
import ValidationInput from "../../../formComponents/ValidationInput";
import SubmitButton from "../../../shared/SubmitButton";
import Logo from "../../../shared/Logo";

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

const formData = { schema, defaultValues: {} };

const AccountForm = () => {
  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="w-full flex flex-wrap">
        <h1 className="text-2xl font-medium whitespace-pre">Bun venit în comunitatea </h1>
        <Logo className="text-2xl" />
      </div>
      <Form
        {...formData}
        onSubmit={handleOnSubmit}
        className="space-y-6 w-full bg-white p-4 sm:p-8 rounded-md shadow-sm"
      >
        <FormField
          name="name"
          render={(field) => (
            <FormItem>
              <FormLabel>Numele tǎu</FormLabel>
              <ValidationInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={(field) => (
            <FormItem>
              <FormLabel>Adresa ta de e-mail</FormLabel>
              <ValidationInput placeholder="nume@exemplu.com" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={(field) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <ValidationInput placeholder="ex.: 07xxxxxxxx" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full max-w-xs">
          <SubmitButton className="h-14 w-full mt-10">Publicǎ anunțul</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default AccountForm;
