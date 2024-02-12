import { Form } from "../../../formBase/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../../../formComponents/form";
import ValidationInput from "../../../formComponents/ValidationInput";
import ComboBox from "../../../formComponents/ComboBox";
import SubmitButton from "../../../shared/SubmitButton";
import { COUNTIES } from "../../../utils/sharedData";
import { filterData } from "../../../utils/helpers";
import { schema, lengths } from "../../userFormData";
const defaultValues = {};
const formData = { schema, defaultValues };

const SignupFormContent = ({ handleOnSubmit }) => {
  return (
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
              aria-label="select location"
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
        <SubmitButton aria-label="submit signup values" className="h-12 w-full">
          Creeazǎ contul
        </SubmitButton>
      </div>
    </Form>
  );
};

export default SignupFormContent;
