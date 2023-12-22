import { twMerge } from "tailwind-merge";

const Section = ({ className, children }) => {
  return (
    <section className={twMerge("w-full flex gap-4 bg-white p-4 rounded-md border", className)}>{children}</section>
  );
};

export default Section;
