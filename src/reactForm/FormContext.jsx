import { useEffect, useReducer, createContext, useContext, useCallback } from "react";
import postReducer from "./postReducer";
import INITIAL_STATE, * as consts from "./constants";

const FormContext = createContext({});

const Form = ({ children, schema, defaultValues, onSubmit }) => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const registerError = (name, message) => {
    dispatch({ action: consts.FIELD_REGISTER_ERROR, payload: { name, message } });
  };

  const setValidation = (name) => {
    dispatch({ action: consts.FIELD_SET_VALIDITY, payload: { name } });
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

  const validateField = (name) => {
    const input = state.refs.find((el) => el.name === name);
    const rules = state.schema[name];

    if (!rules) return setValidation(name);

    if (rules.minLength && input.value.length <= rules.minLength.value - 1) {
      registerError(name, rules.minLength.errorMessage);
    } else if (rules.maxLength && input.value.length > rules.maxLength.value) {
      registerError(name, rules.maxLength.errorMessage);
    } else if (rules.regex && !rules.regex.pattern.test(input.value)) {
      registerError(name, rules.regex.errorMessage);
    } else if (rules.required && input.value.length === 0) {
      registerError(name, rules.required.errorMessage);
    } else {
      setValidation(name);
    }
  };

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

  const registerField = useCallback(function registerField(ref) {
    dispatch({ action: consts.FIELD_REGISTER, payload: { ref } });
  }, []);

  const getFieldState = (fieldName) => {
    return state.fieldsState[fieldName];
  };

  const getFieldSchema = (fieldName) => {
    return state.schema[fieldName];
  };

  useEffect(() => {
    dispatch({ action: consts.FORM_REGISTER_DATA, payload: { schema, defaultValues } });
  }, [schema, defaultValues, state.refs]);

  return (
    <FormContext.Provider value={{ registerField, getFieldState, validateField, getFieldSchema }}>
      <form
        className="space-y-8 w-full max-w-xl p-4 border border-stone-300 rounded-md mx-auto"
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) throw new Error("context should be used inside <Form>");
  return context;
};

export { Form, useFormContext };
