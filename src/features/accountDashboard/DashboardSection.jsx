import { twMerge } from "tailwind-merge";
import Section from "../../shared/Section";

const DashboardSection = ({ title, subtitle, children, className }) => {
  return (
    <Section className={twMerge("flex-col items-start justify-center gap-0", className)}>
      <h3 className="text-lg xs:text-xl font-semibold text-primary-400">{title}</h3>
      <div className="w-full flex flex-col gap-4 pt-4">
        <p className="text-xs text-grey-700 -mb-2">{subtitle}</p>
        {children}
      </div>
    </Section>
  );
};

export default DashboardSection;
