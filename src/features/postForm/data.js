import { POSTTYPE } from "../../sharedData";

const lengths = {
  title: {
    min: 10,
    max: 50,
  },
  name: {
    min: 3,
    max: 25,
  },
  description: {
    min: 20,
    max: 450,
  },
};

const generateErrorMessage = (inputName, minLength, maxLength) => {
  const messageBase = `${inputName} trebuie sǎ conținǎ`;

  if (minLength) return `${messageBase} minim ${minLength}${minLength >= 20 ? " de" : ""} caractere`;
  if (maxLength) return `${messageBase} maxim ${maxLength}${maxLength >= 20 ? " de" : ""} caractere`;
};

const schema = {
  title: {
    minLength: {
      value: lengths.title.min,
      errorMessage: generateErrorMessage("Titlul", lengths.title.min),
    },
    maxLength: {
      value: lengths.title.max,
      errorMessage: generateErrorMessage("Titlul", null, lengths.title.max),
    },
    regex: {
      pattern: /^\s*\S.{8,}\S\s*$/,
      errorMessage: "Introdu un text valid",
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
  location: {
    required: {
      errorMessage: "Alege o locație",
    },
  },
  category: {
    required: {
      errorMessage: "Alege o categorie",
    },
  },
  description: {
    minLength: {
      value: lengths.description.min,
      errorMessage: generateErrorMessage("Descrierea", lengths.description.min),
    },
    maxLength: {
      value: lengths.description.max,
      errorMessage: generateErrorMessage("Descrierea", null, lengths.description.max),
    },
  },
  phone: {
    regex: {
      pattern: /^07\d{8}$/,
      errorMessage: "Numǎrul nu este valid",
    },
  },
};

const defaultValues = {
  title: "",
  name: "",
  phone: "",
  category: "",
  postType: POSTTYPE[0],
  location: "",
};

export { schema, defaultValues };
