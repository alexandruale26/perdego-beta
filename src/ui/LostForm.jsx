import { CheckmarkInput, ImageInput } from "../components/input";
import { CheckmarkTextarea } from "../components/textarea";
import { Form } from "../reactForm/FormContext";
import { FormField, FormItem, FormMessage, FormLabel } from "../components/form";
import ComboBox from "../components/combobox";
import { COUNTIES } from "../reactForm/constants";
import { removeDiacritics } from "../utils/helpers";

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
  description: {
    minLength: {
      value: 20,
      errorMessage: "Descrierea trebuie sa aiba minim 20 caractere",
    },
    maxLength: {
      value: 200,
      errorMessage: "Descrierea trebuie sa aiba maxim 200 caractere",
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
  // county: "Galati",
};

const formData = {
  schema,
  defaultValues,
  delayError: 500,
};

const filterData = (data, search) => {
  return data.filter((value) => {
    const noDiacriticsSearch = removeDiacritics(value);
    const noDiacriticsTarget = removeDiacritics(search);
    return noDiacriticsSearch.toLowerCase().includes(noDiacriticsTarget.toLowerCase());
  });
};

const FormNew = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...formData} onSubmit={onSubmit}>
      <div className="space-y-8 w-full max-w-4xl p-4 border border-stone-300 rounded-xl">
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
          name="description"
          render={(field) => (
            <FormItem>
              <FormLabel>Descriere</FormLabel>
              <CheckmarkTextarea placeholder="Adauga descriere" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
          render={(field) => (
            <FormItem>
              <FormLabel>Alege imaginea</FormLabel>
              <ImageInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          render={(field) => (
            <FormItem>
              <FormLabel>Județ | Sector</FormLabel>
              <ComboBox
                placeholder="Cauta dupa județ sau sector"
                defaultValue={defaultValues.county}
                filter={filterData}
                data={COUNTIES}
                render={(item) => <p className="text-left">{item}</p>}
                {...field}
              />
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
