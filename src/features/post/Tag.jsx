import { twMerge } from "tailwind-merge";

const Tag = ({ title, description, className }) => {
  return (
    <div
      className={twMerge(
        "px-4 py-2 text-[12px] xs:text-sm font-light rounded-md border text-grey-800 border-grey-400 select-none",
        className
      )}
    >
      <p>
        {title} <span className="font-medium">{description}</span>
      </p>
    </div>
  );
};

export default Tag;
