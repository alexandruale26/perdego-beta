import { twMerge } from "tailwind-merge";

const TnCLink = ({ href, children, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={twMerge(
        "font-medium text-primary-500 text-sm underline focus-visible:outline-none focus-visible:text-grey-600",
        className
      )}
    >
      {children}
    </a>
  );
};

export default TnCLink;
