import { useEffect, useReducer, createContext, useContext, useCallback } from "react";

const FormContext = createContext({});
const initialValues = {
  refs: [],
  schema: {},
  defaultValues: {},
  fieldsState: {},
  delayError: 0,
};

const addFieldRef = (refs, newRef) => {
  if (refs.find((el) => el.name === newRef.name)) return refs;
  return [...refs, newRef];
};

const reducer = (state, { action, payload }) => {
  switch (action) {
    case "schema/register":
      return { ...state, schema: payload.schema };

    case "form/registerDefault":
      return { ...state, defaultValues: payload.defaultValues };

    case "field/register":
      const fieldName = payload.ref.name;
      return {
        ...state,
        refs: [...addFieldRef(state.refs, payload.ref)],
        fieldsState: { ...state.fieldsState, [fieldName]: { isValid: false, errorMessage: null } },
      };

    case "field/registerError":
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: false, errorMessage: payload.message },
        },
      };

    case "field/setValid":
      return {
        ...state,
        fieldsState: {
          ...state.fieldsState,
          [payload.name]: { isValid: true, errorMessage: null },
        },
      };

    case "field/delayError":
      return { ...state, delayError: payload.delayError };

    default:
      return state;
  }
};

const Form = ({ children, schema, defaultValues, delayError, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const registerError = (name, message) => {
    dispatch({ action: "field/registerError", payload: { name, message } });
  };

  const setValidation = (name) => {
    dispatch({ action: "field/setValid", payload: { name } });
  };

  const allFieldsAreValid = () => {
    const fieldsNames = Object.keys(state.fieldsState);

    const fieldsAreValid = fieldsNames.every((field) => {
      const isValid = state.fieldsState[field].isValid;
      const input = state.refs.find((el) => el.name === field);

      if (!isValid) input.focus();
      return isValid;
    });
    return fieldsAreValid;
  };

  const validateField = useCallback(
    (name) => {
      const input = state.refs.find((el) => el.name === name);
      const rules = state.schema[name];

      if (!rules) return setValidation(name);

      if (rules.minLength && input.value.length <= rules.minLength.value - 1) {
        registerError(name, rules.minLength.errorMessage);
      } else if (rules.maxLength && input.value.length > rules.maxLength.value - 1) {
        registerError(name, rules.maxLength.errorMessage);
      } else if (rules.regex && !rules.regex.pattern.test(input.value)) {
        registerError(name, rules.regex.errorMessage);
      } else {
        setValidation(name);
      }
    },
    [state.refs, state.schema]
  );

  useEffect(() => {
    dispatch({ action: "schema/register", payload: { schema } });
    dispatch({ action: "form/registerDefault", payload: { defaultValues } });
    dispatch({ action: "field/delayError", payload: { delayError } });
  }, [schema, defaultValues, delayError, state.refs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allFieldsAreValid()) {
      const data = new FormData(e.target);
      const values = Object.fromEntries(data.entries());
      onSubmit(values);
    } else {
      state.refs.forEach((ref) => {
        const fieldName = ref.name;
        validateField(fieldName);
      });
      console.log("not all are valid");
    }
  };

  const handleOnBlur = (fieldName) => {
    validateField(fieldName);
  };

  const registerField = useCallback((ref) => {
    dispatch({ action: "field/register", payload: { ref } });
  }, []);

  const getFieldDefaults = useCallback(
    (fieldName) => {
      return state.defaultValues[fieldName] ? state.defaultValues[fieldName] : "";
    },
    [state.defaultValues]
  );

  const getFieldState = (fieldName) => {
    return state.fieldsState[fieldName];
  };

  const getFieldSchema = (fieldName) => {
    return state.schema[fieldName];
  };

  // console.log(state.fieldsState);

  return (
    <FormContext.Provider
      value={{ registerField, getFieldDefaults, getFieldState, validateField, getFieldSchema, handleOnBlur }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) throw new Error("context should be used inside <Form>");
  return context;
};

export { Form, useFormContext };
