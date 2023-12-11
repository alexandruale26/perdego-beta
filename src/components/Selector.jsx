import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const Selector = forwardRef(({ className, values, ...props }, ref) => {
  const [selected, setSelected] = useState(values[0]);

  return (
    <ul
      className={twMerge("h-9 w-full max-w-xs p-1 space-x-0.5 bg-stone-100 rounded-lg flex overflow-hidden", className)}
    >
      <input hidden ref={ref} {...props} />
      <li className="flex items-center justify-center flex-1 text-sm font-normal bg-white rounded-md shadow-sm">
        Gǎsite
      </li>
      <li className="flex items-center justify-center flex-1 text-sm font-normal bg-white rounded-md shadow-sm">
        Pierdute
      </li>
      {/* <li className="flex items-center justify-center flex-1 bg-white rounded-sm">Vândute</li> */}
    </ul>
  );
});
Selector.displayName = "Selector";

export default Selector;
