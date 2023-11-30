import { twMerge } from "tailwind-merge";

const ScrollArea = ({ className, children, ...props }) => {
  return (
    <div className={twMerge("w-full h-44 bg-transparent overflow-scroll", className)} {...props}>
      {children}
    </div>
  );
};

export default ScrollArea;
