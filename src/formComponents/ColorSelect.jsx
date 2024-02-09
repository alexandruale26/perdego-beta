import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@radix-ui/react-icons";

// IMPORTANT  import colors list
// IMPORTANT - not important. maybe should let users change profile color from account settings
const bgColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

const ColorCheckmark = () => (
  <div className="absolute w-6 h-6 bg-white border rounded-full border-black -right-2 -top-1">
    <CheckIcon className="w-full h-full" />
  </div>
);

// IMPORTANT  color by name not index
const Color = ({ bgColor, exportIndex, index }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    exportIndex(index);
  };

  return (
    <button
      key={bgColor}
      onClick={handleOnClick}
      className={`w-full h-full border-2 border-transparent rounded-full focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 resize-none ${bgColor}`}
    ></button>
  );
};

// IMPORTANT  check whats up: onBlur, defaultValue, etc
const ColorSelect = forwardRef(({ className, defaultValue, colors, colorSize = 8, onBlur, ...props }, ref) => {
  const [selected, setSelected] = useState(0);

  const setSelectedIndex = (index) => {
    setSelected(index);
  };

  return (
    <div className={twMerge("w-full", className)}>
      <input hidden readOnly value={selected} ref={ref} {...props} />
      <ul className="grid grid-cols-4 gap-2">
        {bgColors.map((bgColor, index) => (
          <li key={bgColor} className={`relative w-${colorSize} h-${colorSize} transition-all hover:scale-[1.15]`}>
            {selected === index && <ColorCheckmark />}
            <Color bgColor={bgColor} index={index} exportIndex={setSelectedIndex} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ColorSelect;
