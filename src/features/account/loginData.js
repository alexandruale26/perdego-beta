import { generateErrorMessage } from "../../utils/helpers";
import { EMAIL_AND_PASSWORD_LENGTHS } from "./helpers";

const lengths = { ...EMAIL_AND_PASSWORD_LENGTHS };

const schema = {
  email: {
    maxLength: {
      value: lengths.email.max,
      errorMessage: generateErrorMessage("E-mailul", null, lengths.email.max),
    },
    regex: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/,
      errorMessage: "Introdu o adresǎ de e-mail validǎ.",
    },
  },
  password: {
    minLength: {
      value: lengths.password.min,
      errorMessage: generateErrorMessage("Parola", lengths.password.min),
    },
    maxLength: {
      value: lengths.password.max,
      errorMessage: generateErrorMessage("Numele", null, lengths.password.max),
    },
  },
};

export { schema, lengths };
