import { forwardRef, useState, useEffect, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { setDefaultValue } from "../utils/helpers";

const Option = ({ item, className, onSelectedClick }) => {
  return (
    <li
      onClick={(e) => onSelectedClick(e, item)}
      className={twMerge(
        "flex items-center justify-center flex-1 text-sm text-stone-900 font-light hover:bg-emerald-400 hover:text-white select-none transition-all",
        className
      )}
    >
      {item}
    </li>
  );
};

const Selector = forwardRef(({ className, values, defaultValue, onChange, exportValue, ...props }, ref) => {
  const [selected, setSelected] = useState(setDefaultValue(defaultValue));

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const onSelectedClick = (e, newValue) => {
    e.preventDefault();
    setSelected(newValue);

    ref.current.value = newValue;
    onChange(e);

    if (exportValue) exportValue(newValue);
  };

  return (
    <button
      type="button"
      className={twMerge(
        "h-9 w-full bg-white border border-stone-300 rounded-md overflow-hidden focus-visible:outline-none focus-visible:border-2 focus-visible:border-stone-700",
        className
      )}
    >
      <input hidden readOnly value={selected} ref={ref} {...props} />
      <ul className="flex w-full h-full">
        {values.map((item, index) => (
          <Fragment key={item}>
            <Option
              onSelectedClick={onSelectedClick}
              item={item}
              className={selected === item ? "bg-black text-white hover:bg-black" : ""}
            />
            {index + 1 < values.length && !selected && <div className="h-full w-[1px] bg-stone-300"></div>}
          </Fragment>
        ))}
      </ul>
    </button>
  );
});
Selector.displayName = "Selector";

export default Selector;
