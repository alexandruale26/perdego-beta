import { generateErrorMessage } from "../../utils/helpers";

const lengths = {
  email: {
    max: 100,
  },
  password: {
    min: 8,
    max: 30,
  },
  name: {
    min: 3,
    max: 25,
  },
};

// TODO: test everything for blanc spaces

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
      pattern: /^\s*\S.{1,}\S\s*$/,
      errorMessage: "Introdu un nume valid",
    },
  },
  phone: {
    regex: {
      pattern: /^07\d{8}$/,
      errorMessage: "Numǎrul nu este valid",
    },
  },
};

export { schema, lengths };
