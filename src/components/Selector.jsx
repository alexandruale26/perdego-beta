import { forwardRef, useState, Fragment } from "react";
import { twMerge } from "tailwind-merge";

const Option = ({ item, className, onSelectedClick }) => {
  return (
    <li
      onClick={(e) => onSelectedClick(e, item[0])}
      className={twMerge(
        "flex items-center justify-center flex-1 text-sm text-slate-900 font-normal hover:bg-emerald-200 select-none transition-all",
        className
      )}
    >
      {item[1]}
    </li>
  );
};

const Selector = forwardRef(({ className, values, onChange, ...props }, ref) => {
  const [selected, setSelected] = useState("");

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
        "h-9 w-full max-w-xs border border-slate-700 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950",
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
            {index + 1 < values.length && !selected && <div className="h-full w-[1px] bg-slate-700"></div>}
          </Fragment>
        ))}
      </ul>
    </button>
  );
});
Selector.displayName = "Selector";

export default Selector;
