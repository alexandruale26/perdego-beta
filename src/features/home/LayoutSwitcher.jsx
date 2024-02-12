import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../shared/button";
import { TokensIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const iconStyle = "w-6 h-6 xs:w-7 xs:h-7 hover:text-primary";
const buttonStyle =
  "hover:text-white transition-colors border-2 border-transparent p-1 rounded-md focus-visible:border-2 focus-visible:border-grey-700";

const setIconColor = (isGrid) => {
  return isGrid ? "text-primary-500" : "text-grey-700";
};

const LayoutSwitcher = ({ className, isGridSelected, onSelect }) => {
  const [isGrid, setIsGrid] = useState(isGridSelected);

  const setLayout = (e) => {
    e.preventDefault();

    const isGridSelected = e.currentTarget.name === "grid";
    setIsGrid(isGridSelected ? true : false);
    onSelect(isGridSelected);
  };

  return (
    <div className={twMerge("flex items-center justify-center gap-1", className)}>
      <Button name="list" aria-label="switch to list view" onClick={setLayout} className={buttonStyle}>
        <HamburgerMenuIcon className={`${iconStyle} ${setIconColor(!isGrid)}`} />
      </Button>
      <Button name="grid" aria-label="switch to grid view" onClick={setLayout} className={buttonStyle}>
        <TokensIcon className={`${iconStyle} ${setIconColor(isGrid)}`} />
      </Button>
    </div>
  );
};

export default LayoutSwitcher;
