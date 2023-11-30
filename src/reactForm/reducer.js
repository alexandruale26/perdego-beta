import * as consts from "./constants";

const addFieldRef = (refs, newRef) => {
  if (refs.find((el) => el.name === newRef.name)) return refs;
  return [...refs, newRef];
};

const validateFieldAtRegistering = (name, state) => {
  const input = state.refs.find((el) => el.name === name);
  const rules = state.schema[name];
  const defaultValidation = { isValid: false, errorMessage: null };

  if (!rules) return defaultValidation;

  if (rules.minLength && input.value.length <= rules.minLength.value - 1) {
    return defaultValidation;
  } else if (rules.maxLength && input.value.length > rules.maxLength.value - 1) {
    return defaultValidation;
  } else if (rules.regex && !rules.regex.pattern.test(input.value)) {
    return defaultValidation;
  } else {
    return { isValid: true, errorMessage: null };
  }
};

const reducer = (state, { action, payload }) => {
  switch (action) {
    case consts.FORM_REGISTER_DATA:
      return { ...state, schema: payload.schema, defaultValues: payload.defaultValues };

    case consts.FIELD_REGISTER:
      const fieldName = payload.ref.name;
      const fieldValidation = validateFieldAtRegistering(fieldName, state);

      return {
        ...state,
        refs: [...addFieldRef(state.refs, payload.ref)],
        fieldsState: {
          ...state.fieldsState,
          [fieldName]: { isValid: fieldValidation.isValid, errorMessage: fieldValidation.errorMessage },
        },
      };

    case consts.FIELD_REGISTER_ERROR:
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: false, errorMessage: payload.message },
        },
      };

    case consts.FIELD_SET_VALIDITY:
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: true, errorMessage: null },
        },
      };

    default:
      return state;
  }
};

export default reducer;
