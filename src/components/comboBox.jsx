import { useEffect, useState, useRef, forwardRef, Fragment } from "react";
import { MagnifyingGlassIcon, CaretSortIcon } from "@radix-ui/react-icons";
import Separator from "./separator";
import React from "react";

const textStyle = "text-sm font-light";
const iconStyle = "w-5 h-5 text-stone-500";

const Option = ({ item, onClick, children }) => {
  return (
    <li
      onClick={onClick}
      data-item={item}
      className={`${textStyle} px-2 py-2 text-stone-800 hover:bg-stone-100 rounded-md`}
    >
      {children}
    </li>
  );
};

const ComboBox = forwardRef(({ placeholder, defaultValue, filter, data, render, onChange, onBlur, ...props }, ref) => {
  const [filtered, setFiltered] = useState(data);
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [selected, setSelected] = useState(defaultValue || "");
  const [visible, setVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible && inputRef) inputRef.current.focus();
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [visible]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setFiltered(filter(data, e.target.value));

    setInputValue(e.target.value);
  };

  const handleSelectClick = (e) => {
    e.preventDefault();
    const value = e.currentTarget.dataset.item;
    setSelected(value);
    setInputValue(value);

    //error message if ref is ull
    ref.current.value = value;
    onChange(e);
  };

  const handleInputFocus = (e) => {
    e.preventDefault();
    setInputFocus(true);
  };

  const handleInputBlur = (e) => {
    e.preventDefault();
    setInputFocus(false);
    onBlur(e);
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
      onClick={onComboBoxClick}
      ref={modalRef}
      className="bg-white relative w-full max-w-xs h-full space-y-1 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
    >
      <input hidden onChange={() => console.log("none")} value={selected} ref={ref} {...props} />
      <div className="flex justify-between items-center w-full px-4 py-2 border bg-inherit rounded-md border-stone-300 hover:bg-stone-100 transition-colors select-none">
        <p className="text-sm font-normal">{titlePlaceholder}</p>
        <CaretSortIcon className={iconStyle} />
      </div>

      {visible && (
        <div className="absolute z-10 w-full max-h-72 border bg-inherit border-stone-300 rounded-md overflow-scroll animate-in zoom-in-50 ease-out shadow-lg">
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
              className={`${textStyle} w-full bg-inherit placeholder:text-sm placeholder:font-light placeholder:text-stone-500 focus:outline-none focus:ring-0`}
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