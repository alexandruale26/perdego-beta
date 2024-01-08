import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../shared/button";
import { TokensIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const iconStyle = "w-6 h-6 xs:w-7 xs:h-7 hover:text-emerald-400";
const buttonStyle =
  "hover:text-white transition-colors border-2 border-transparent p-1 rounded-md focus-visible:border-2 focus-visible:border-stone-700";

const setIconColor = (isGrid) => {
  return isGrid ? "text-emerald-500" : "text-stone-700";
};

const LayoutSwitcher = ({ className, onSelect }) => {
  const [isGrid, setIsGrid] = useState(false);

  const setLayout = (e) => {
    e.preventDefault();

    const isGridSelected = e.currentTarget.name === "grid";
    setIsGrid(isGridSelected ? true : false);
    onSelect(isGridSelected);
  };

  return (
    <div className={twMerge("flex items-center justify-center gap-1", className)}>
      <Button name="list" onClick={setLayout} className={buttonStyle}>
        <HamburgerMenuIcon className={`${iconStyle} ${setIconColor(!isGrid)}`} />
      </Button>
      <Button name="grid" onClick={setLayout} className={buttonStyle}>
        <TokensIcon className={`${iconStyle} ${setIconColor(isGrid)}`} />
      </Button>
    </div>
  );
};

export default LayoutSwitcher;
