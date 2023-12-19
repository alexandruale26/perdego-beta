import { forwardRef, useState, Fragment } from "react";
import { twMerge } from "tailwind-merge";

const Option = ({ item, className, onSelectedClick }) => {
  return (
    <li
      onClick={(e) => onSelectedClick(e, item[0])}
      className={twMerge(
        "flex items-center justify-center flex-1 text-sm text-stone-900 font-medium hover:bg-emerald-300 select-none transition-all",
        className
      )}
    >
      {item[1]}
    </li>
  );
};

const Selector = forwardRef(({ className, values, defaultValue, onChange, ...props }, ref) => {
  const [selected, setSelected] = useState(defaultValue);

  const onSelectedClick = (e, newValue) => {
    e.preventDefault();
    setSelected(newValue);

    ref.current.value = newValue;
    onChange(e);
  };

  return (
    <button
      type="button"
      className={twMerge(
        "h-9 w-full max-w-xs bg-white border border-stone-300 rounded-md overflow-hidden focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700",
        className
      )}
    >
      <input hidden value={selected} onChange={() => console.log("none")} ref={ref} {...props} />
      <ul className="flex w-full h-full">
        {values.map((item, index) => (
          <Fragment key={item[0]}>
            <Option
              onSelectedClick={onSelectedClick}
              item={item}
              className={selected === item[0] ? "bg-black text-emerald-300 hover:bg-black hover:text-emerald-300" : ""}
            />
            {index + 1 < values.length && !selected && <div className="h-full w-[1px] border-stone-800"></div>}
          </Fragment>
        ))}
      </ul>
    </button>
  );
});
Selector.displayName = "Selector";

export default Selector;
