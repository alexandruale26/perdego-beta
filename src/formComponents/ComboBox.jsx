import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import { MagnifyingGlassIcon, CaretSortIcon } from "@radix-ui/react-icons";
import Separator from "./Separator";
import { useController } from "../formBase/ControllerContext";

const textStyle = "text-sm font-light";
const iconStyle = "w-5 h-5 text-grey-500";

const Option = ({ item, onClick, children }) => {
  return (
    <li
      onClick={onClick}
      data-item={item}
      className={`${textStyle} px-2 py-2 text-grey-800 hover:bg-primary hover:text-white rounded-md`}
    >
      {children}
    </li>
  );
};

const ComboBox = forwardRef(({ placeholder, filter, data, render, onChange, onBlur, ...props }, ref) => {
  const [filtered, setFiltered] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const input = useController();

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const stateValue = input.fieldState.value;
    const value = stateValue === null ? "" : stateValue;

    setSelected(value);
    ref.current.value = value;
  }, [input.fieldState.value, ref]);

  useEffect(() => {
    if (visible && inputRef) inputRef.current.focus();

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [visible]);

  const resetSearchAndFiltered = () => {
    setTimeout(() => {
      setInputValue("");
      setFiltered(data);
    }, 300);
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    setFiltered(filter(data, e.target.value));
    setInputValue(e.target.value);
  };

  const handleSelectClick = (e) => {
    e.preventDefault();

    const value = e.currentTarget.dataset.item;

    resetSearchAndFiltered();
    setSelected(value);
    ref.current.value = value;
    onChange();
  };

  const handleInputFocus = (e) => {
    e.preventDefault();
    setInputFocus(true);
  };

  const handleInputBlur = (e) => {
    e.preventDefault();

    resetSearchAndFiltered();
    setInputFocus(false);
    onBlur();
  };

  const onComboBoxClick = (e) => {
    e.preventDefault();

    if (inputFocus) return;
    setVisible(!visible);
  };

  const available = filtered.length > 0;
  const titlePlaceholder = selected || placeholder;

  return (
    <button
      type="button"
      onClick={onComboBoxClick}
      ref={modalRef}
      className="bg-white relative w-full h-9 space-y-1 rounded-md border border-grey-300 focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700"
    >
      <input hidden readOnly ref={ref} {...props} />
      <div className="flex justify-between items-center w-full px-3 py-1 bg-inherit rounded-md transition-colors select-none">
        <p className="text-sm font-light">{titlePlaceholder}</p>
        <CaretSortIcon className={iconStyle} />
      </div>

      {visible && (
        <div className="absolute z-10 w-full max-h-72 border bg-inherit border-grey-300 rounded-md overflow-scroll animate-in zoom-in-50 ease-out shadow-lg">
          <div className="flex justify-center items-center gap-2 px-3 py-2">
            <MagnifyingGlassIcon className={iconStyle} />
            <input
              value={inputValue}
              ref={inputRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              placeholder={placeholder}
              type="text"
              className={`${textStyle} w-full bg-inherit placeholder:text-sm placeholder:font-light placeholder:text-grey-500 focus:outline-none`}
            />
          </div>

          <Separator />

          {available && (
            <ul className="p-1">
              {filtered.map((item) => (
                <Fragment key={item}>
                  <Option item={item} onClick={handleSelectClick}>
                    {render(item)}
                  </Option>
                </Fragment>
              ))}
            </ul>
          )}

          {!available && <p className={`py-6 text-center ${textStyle}`}>Niciun rezultat</p>}
        </div>
      )}
    </button>
  );
});

export default ComboBox;
