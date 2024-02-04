import { twMerge } from "tailwind-merge";
import Section from "../../shared/Section";
import Separator from "../../formComponents/Separator";

const DashboardSection = ({ title, subtitle, children, className }) => {
  return (
    <Section className={twMerge("flex-col items-start justify-center gap-2", className)}>
      <h3 className="xs:text-lg font-medium text-grey-900">{title}</h3>
      <Separator />
      <div className="w-full flex flex-col gap-4 pt-4">
        <p className="text-xs text-grey-700">{subtitle}</p>
        {children}
      </div>
    </Section>
  );
};

export default DashboardSection;
