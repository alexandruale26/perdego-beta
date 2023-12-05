import { useEffect, createContext, useContext, useRef } from "react";
import { useFormContext } from "./FormContext";

const ControllerContext = createContext({});

const Controller = ({ name, render }) => {
  const ref = useRef(null);

  const { registerField, validateField, getFieldState, getFieldSchema } = useFormContext();

  useEffect(() => {
    registerField(ref.current);
  }, [name, ref, registerField]);

  const onChange = (e) => {
    e.preventDefault();
    validateField(name);
  };

  const onBlur = (e) => {
    onChange(e);
  };

  // here i could add all kind of input events: onFocus, etc

  const fieldState = getFieldState(name);
  const fieldSchema = getFieldSchema(name);
  const field = { id: name, name, onChange, onBlur, ref };

  return (
    <ControllerContext.Provider value={{ name, fieldState, fieldSchema }}>{render(field)}</ControllerContext.Provider>
  );
};

const useController = () => {
  const controller = useContext(ControllerContext);

  if (!controller) throw new Error("useController should be used within <Controller>");
  return controller;
};

export { Controller, useController };
