import { twMerge } from "tailwind-merge";
import Section from "../../shared/Section";

const DashboardSection = ({ title, children, className }) => {
  return (
    <Section className={twMerge("flex-col items-start justify-center gap-2", className)}>
      <h3 className="text-lg font-semibold text-grey-800">{title}</h3>
      <div className="w-full flex flex-col gap-4 pt-4">{children}</div>
    </Section>
  );
};

export default DashboardSection;
