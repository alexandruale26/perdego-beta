import { twMerge } from "tailwind-merge";

const Section = ({ className, children, gridMode = false }) => {
  return !gridMode ? (
    <section className={twMerge("w-full flex gap-4 bg-white p-4 rounded-md shadow-sm", className)}>{children}</section>
  ) : (
    <section className={twMerge("w-full grid grid-cols-1 xs:grid-cols-2 xmd:grid-cols-3 gap-4", className)}>
      {children}
    </section>
  );
};

export default Section;
