import { generateErrorMessage } from "../../utils/helpers";
import { EMAIL_AND_PASSWORD_LENGTHS } from "./helpers";

const lengths = {
  email: EMAIL_AND_PASSWORD_LENGTHS.email,
  password: EMAIL_AND_PASSWORD_LENGTHS.password,
  name: {
    min: 3,
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
      errorMessage: generateErrorMessage("Parola", null, lengths.password.max),
    },
    regex: {
      pattern:
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_+={[}\]|;:'",<.>/?\\`~])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_+={[}\]|;:'",<.>/?\\`~]+$/,
      errorMessage:
        "Cel puțin un caracter special (@, #, -, &, !, etc.). Minim o cifrǎ (0-9). Cel puțin o literǎ mare (A-Z). Nu sunt permise caracterele albe (spații).",
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
      pattern: /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*[ -]?/,
      errorMessage: "Introdu un nume valid.",
    },
  },
  phone: {
    regex: {
      pattern: /^07\d{8}$/,
      errorMessage: "Numǎrul de telefon nu este valid.",
    },
  },
  // location: {
  //   required: {
  //     errorMessage: "Alege o locație.",
  //   },
  // },
};

export { schema, lengths };
