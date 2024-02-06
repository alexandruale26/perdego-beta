import { twMerge } from "tailwind-merge";
import Section from "../../shared/Section";

const DashboardSection = ({ title, children, className }) => {
  return (
    <Section className={twMerge("flex-col items-start justify-center gap-0", className)}>
      <h3 className="text-lg xs:text-xl font-medium text-primary-500">{title}</h3>
      <div className="w-full flex flex-col gap-4 pt-4">{children}</div>
    </Section>
  );
};

export default DashboardSection;
