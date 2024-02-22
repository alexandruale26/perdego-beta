import { forwardRef, useState, useEffect, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { useController } from "../formBase/ControllerContext";

const Option = ({ item, className, onSelectedClick }) => {
  return (
    <li
      onClick={(e) => onSelectedClick(e, item)}
      className={twMerge(
        "flex items-center justify-center flex-1 text-sm text-grey-900 font-light hover:bg-primary hover:text-white select-none transition-all",
        className
      )}
    >
      {item}
    </li>
  );
};

const Selector = forwardRef(({ className, values, onChange, ...props }, ref) => {
  const [selected, setSelected] = useState("");
  const input = useController();

  useEffect(() => {
    const stateValue = input.fieldState.value;
    const value = stateValue === null ? "" : stateValue;

    setSelected(value);
    ref.current.value = value;
  }, [input.fieldState.value, ref]);

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
        "h-9 w-full bg-white border border-grey-300 rounded-md overflow-hidden focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700",
        className
      )}
    >
      <input hidden readOnly type="text" value={selected} ref={ref} {...props} />
      <ul className="flex w-full h-full">
        {values.map((item, index) => (
          <Fragment key={item}>
            <Option
              onSelectedClick={onSelectedClick}
              item={item}
              className={selected === item ? "bg-grey-900 text-white hover:bg-grey-900" : ""}
            />
            {index + 1 < values.length && !selected && <div className="h-full w-[1px] bg-grey-300"></div>}
          </Fragment>
        ))}
      </ul>
    </button>
  );
});
Selector.displayName = "Selector";

export default Selector;
