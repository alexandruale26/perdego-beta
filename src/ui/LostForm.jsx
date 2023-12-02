import { CheckmarkInput } from "../components/input";
import { Form } from "../reactForm/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../components/form";
import ComboBox from "../components/combobox";

const schema = {
  title: {
    minLength: {
      value: 5,
      errorMessage: "Titlul trebuie sa aiba minim 5 caractere",
    },
    maxLength: {
      value: 50,
      errorMessage: "Titlul trebuie sa aiba maxim 50 caractere",
    },
  },
  name: {
    minLength: {
      value: 5,
      errorMessage: "Numele trebuie sa aiba minim 5 caractere",
    },
    maxLength: {
      value: 10,
      errorMessage: "Numele trebuie sa aiba maxim 10 caractere",
    },
  },
  location: {
    required: {
      errorMessage: "Locatie invalida",
    },
  },
  phone: {
    regex: {
      pattern: /^\d+$/,
      errorMessage: "Numarul nu este valid",
    },
  },
};

const defaultValues = {
  title: "",
  name: "Alexa",
  phone: "",
  location: "",
};

const formData = {
  schema,
  defaultValues,
  delayError: 500,
};

const FormNew = () => {
  const onSubmit = (values) => {
    console.log("yeeey...", values);
  };

  return (
    <Form {...formData} onSubmit={onSubmit}>
      <div className="space-y-8 w-full max-w-4xl p-4 pb-56 border border-stone-300 rounded-xl">
        <FormField
          name="title"
          render={(field) => (
            <FormItem>
              <FormLabel>Titlu</FormLabel>
              <CheckmarkInput placeholder="Titlu" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          render={(field) => (
            <FormItem>
              <FormLabel>Nume</FormLabel>
              <CheckmarkInput placeholder="Nume" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          render={(field) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <CheckmarkInput placeholder="Telefon" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          render={(field) => (
            <FormItem>
              <FormLabel>Locatie</FormLabel>
              <ComboBox placeholder="Cauta dupa localitate" comboTitle="Alege localitatea" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <button className="bg-teal-500 p-4 rounded-full text-teal-50" type="submit">
          Publica anuntul
        </button>
      </div>
    </Form>
  );
};

export default FormNew;
