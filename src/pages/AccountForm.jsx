import React from "react";
import { generateErrorMessage } from "../utils/helpers";

const lengths = {
  email: {
    min: 3,
    max: 25,
  },
  name: {
    min: 3,
    max: 25,
  },
};

const schema = {
  email: {
    minLength: {
      value: lengths.name.min,
      errorMessage: generateErrorMessage("Emailul", lengths.name.min),
    },
    maxLength: {
      value: lengths.name.max,
      errorMessage: generateErrorMessage("Emailul", null, lengths.name.max),
    },
    regex: {
      pattern: /^\s*\S.{1,}\S\s*$/,
      errorMessage: "Introdu un nume valid",
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

const AccountForm = () => {
  return <div>AccountForm</div>;
};

export default AccountForm;
