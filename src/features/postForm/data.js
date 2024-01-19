import { generateErrorMessage } from "../../utils/helpers";

const imageExtension = "jpeg";

const lengths = {
  title: {
    min: 10,
    max: 50,
  },
  description: {
    min: 20,
    max: 450,
  },
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
  postType: {
    required: {
      errorMessage: "Alege tipul de anunț",
    },
  },
};

export { schema, imageExtension };
