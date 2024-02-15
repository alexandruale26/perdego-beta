import { useEffect, createContext, useContext, useRef } from "react";
import { useFormContext } from "./FormContext";

const ControllerContext = createContext({});

const Controller = ({ name, render }) => {
  const ref = useRef(null);

  const { registerField, validateField, getFieldState, setAsInvalid } = useFormContext();

  useEffect(() => {
    registerField(ref.current);
  }, [name, ref, registerField]);

  const onChange = () => {
    validateField(name);
  };

  const onBlur = () => {
    onChange();
  };

  // here i could add all kind of input events: onFocus, etc
  const fieldState = getFieldState(name);
  const setFieldAsInvalid = (message) => setAsInvalid(name, message);
  const field = { id: name, name, onChange, onBlur, ref };

  return (
    <ControllerContext.Provider value={{ name, fieldState, setFieldAsInvalid }}>
      {render(field)}
    </ControllerContext.Provider>
  );
};

const useController = () => {
  const controller = useContext(ControllerContext);

  if (!controller) throw new Error("useController should be used within <Controller>");
  return controller;
};

export { Controller, useController };
