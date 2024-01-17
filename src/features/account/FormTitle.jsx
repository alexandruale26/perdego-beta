import { twMerge } from "tailwind-merge";

const FormTitle = ({ className, children }) => {
  return (
    <h2 className={twMerge("text-[22px] xs:text-2xl lg:text-3xl font-medium text-start text-stone-800", className)}>
      {children}
    </h2>
  );
};

export default FormTitle;
