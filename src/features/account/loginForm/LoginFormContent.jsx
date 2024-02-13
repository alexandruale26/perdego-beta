import { Form } from "../../../formBase/FormContext";
import { FormField, FormLabel, FormItem, FormMessage } from "../../../formComponents/form";
import ValidationInput from "../../../formComponents/ValidationInput";
import SubmitButton from "../../../shared/SubmitButton";
import LinkButton from "../../../shared/LinkButton";
import { schema, lengths } from "../loginData";

const defaultValues = {};
const formData = {
  schema,
  defaultValues,
};

const LoginFormContent = ({ handleOnSubmit }) => {
  return (
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
          to="/creeaza-cont"
          className="h-12 w-full border border-black rounded-md focus-visible:text-lg hover:scale-105 transition-transform"
        >
          Creeazǎ cont
        </LinkButton>
      </div>
    </Form>
  );
};

export default LoginFormContent;
