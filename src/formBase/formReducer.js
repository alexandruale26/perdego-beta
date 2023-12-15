import * as actions from "./constants";

const addFieldRef = (refs, newRef) => {
  if (refs.find((el) => el.name === newRef.name)) return refs;
  return [...refs, newRef];
};

const validateFieldAtRegistering = (name, state) => {
  const input = state.refs.find((el) => el.name === name);
  const rules = state.schema[name];
  const defaultValidation = { isValid: false, errorMessage: null };

  //TODO validate without empty spaces

  if (!rules) return defaultValidation;

  if (rules.minLength && input.value.length <= rules.minLength.value - 1) {
    return defaultValidation;
  } else if (rules.maxLength && input.value.length > rules.maxLength.value) {
    return defaultValidation;
  } else if (rules.regex && !rules.regex.pattern.test(input.value)) {
    return defaultValidation;
  } else if (rules.required && input.value.length === 0) {
    return defaultValidation;
  } else {
    return { isValid: true, errorMessage: null };
  }
};

const formReducer = (state, { action, payload }) => {
  switch (action) {
    case actions.FORM_REGISTER_DATA:
      return { ...state, schema: payload.schema, defaultValues: payload.defaultValues };

    case actions.FIELD_REGISTER:
      const fieldRef = payload.ref;
      const fieldName = fieldRef.name;

      fieldRef.value = state.defaultValues[fieldName] ? state.defaultValues[fieldName] : "";
      const fieldValidation = validateFieldAtRegistering(fieldName, state);

      return {
        ...state,
        refs: [...addFieldRef(state.refs, fieldRef)],
        fieldsState: {
          ...state.fieldsState,
          [fieldName]: { isValid: fieldValidation.isValid, errorMessage: fieldValidation.errorMessage },
        },
      };

    case actions.FIELD_REGISTER_ERROR:
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: false, errorMessage: payload.message },
        },
      };

    case actions.FIELD_SET_VALIDITY:
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

export default formReducer;
