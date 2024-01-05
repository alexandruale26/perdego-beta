import { twMerge } from "tailwind-merge";

const Section = ({ className, children }) => {
  return (
    <section className={twMerge("w-full flex gap-4 bg-white p-4 rounded-md shadow-sm", className)}>{children}</section>
  );
};

export default Section;
