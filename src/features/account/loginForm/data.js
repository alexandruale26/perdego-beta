import { generateErrorMessage } from "../../../utils/helpers";

const lengths = {
  email: {
    max: 100,
  },
  password: {
    min: 8,
    max: 30,
  },
};

const schema = {
  email: {
    maxLength: {
      value: lengths.email.max,
      errorMessage: generateErrorMessage("E-mailul", null, lengths.email.max),
    },
    regex: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/,
      errorMessage: "Introdu o adresǎ de e-mail validǎ",
    },
  },
  password: {
    minLength: {
      value: lengths.password.min,
      errorMessage: generateErrorMessage("Parola", lengths.password.min),
    },
  },
};

const defaultValues = {};

export { schema, defaultValues, lengths };
