import { useContext, createContext } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const FormContext = createContext();

const Form = ({ children, onSubmit }) => {
  const methods = useForm();
  const onSubmitting = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={{}}>
        <form onSubmit={methods.handleSubmit(onSubmitting)} className="space-y-2 w-full">
          {children}
          <button className="px-3 py-2 rounded-full bg-lime-200 hover:bg-lime-300">Press me</button>
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

const Section = ({ children, title = null }) => {
  if (!useContext(FormContext)) throw Error("ELEMENT not allowed outside FORM parent element");

  return (
    <div className="space-y-4 border border-stone-400 rounded-xl p-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      {children}
    </div>
  );
};

const LabeledInput = ({ type = "text", placeholder = null, nameId, label, wider }) => {
  if (!useContext(FormContext)) throw Error("ELEMENT not allowed outside FORM parent element");

  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={nameId} className="text-sm font-light">
        {label}
      </label>
      <input
        id={nameId}
        {...register(nameId, { required: true })}
        type={type}
        className={`p-3 bg-stone-100 rounded-lg placeholder:font-light text-slate-800 font-light placeholder:text-slate-500 ${
          wider ? "max-w-2xl" : "max-w-sm"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};

const LabeledTextarea = ({ label, nameId, wider }) => {
  if (!useContext(FormContext)) throw Error("ELEMENT not allowed outside FORM parent element");

  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={nameId} className="text-sm font-light">
        {label}
      </label>
      <textarea
        id={nameId}
        {...register(nameId)}
        rows={7}
        className={`resize-none p-3 bg-stone-100 text-slate-800 font-light max-w-sm rounded-lg placeholder:font-light placeholder:text-slate-500 ${
          wider ? "max-w-2xl" : "max-w-sm"
        }`}
      />
    </div>
  );
};

Form.Section = Section;
Form.LabeledInput = LabeledInput;
Form.LabeledTextarea = LabeledTextarea;

export default Form;
