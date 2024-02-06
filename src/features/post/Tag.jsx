import { twMerge } from "tailwind-merge";

const Tag = ({ title, description, className }) => {
  return (
    <div
      className={twMerge(
        "p-2 text-xs xs:text-[13px] font-light rounded-md border text-grey-700 border-grey-300 select-none",
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
